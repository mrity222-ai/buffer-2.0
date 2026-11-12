import asyncio
from celery import Celery
from app.config import settings
from app.social.meta_client import MetaGraphClient

celery_app = Celery(
    "social_publisher",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_acks_late=True,
)

@celery_app.task(bind=True, max_retries=3, default_retry_delay=60)
def publish_target_task(self, target_id: int):
    """
    Celery background worker task to publish one target destination.
    """
    return asyncio.run(_async_publish_target(self, target_id))

async def _async_publish_target(task, target_id: int):
    from app.database import AsyncSessionLocal
    from app.models.post import PostTarget, Post
    from app.models.social_account import SocialAccount
    from app.models.publishing_job import PublishingJob
    from sqlalchemy.future import select
    from datetime import datetime

    async with AsyncSessionLocal() as db:
        result = await db.execute(select(PostTarget).where(PostTarget.id == target_id))
        target = result.scalar_one_or_none()
        if not target:
            return {"error": "Target not found"}

        post_res = await db.execute(select(Post).where(Post.id == target.post_id))
        post = post_res.scalar_one_or_none()

        acc_res = await db.execute(select(SocialAccount).where(SocialAccount.id == target.social_account_id))
        account = acc_res.scalar_one_or_none()

        if not post or not account:
            target.status = "failed"
            target.error_message = "Post or Account record missing."
            await db.commit()
            return {"error": target.error_message}

        target.status = "publishing"
        await db.commit()

        client = MetaGraphClient()
        media_url = post.media[0]["url"] if post.media and len(post.media) > 0 else None

        try:
            if account.platform == "facebook_page":
                resp = await client.publish_facebook_page_post(
                    page_id=account.platform_account_id,
                    page_access_token=account.access_token,
                    message=post.caption,
                    image_url=media_url
                )
                target.status = "published"
                target.platform_post_id = resp.get("id") or resp.get("post_id")
                target.platform_permalink = f"https://facebook.com/{target.platform_post_id}"
                target.published_at = datetime.utcnow()
                target.error_message = None

            elif account.platform == "instagram_business":
                if not media_url:
                    raise ValueError("Instagram requires an image or video to publish.")

                resp = await client.publish_instagram_post(
                    ig_user_id=account.platform_account_id,
                    access_token=account.access_token,
                    caption=post.caption,
                    image_url=media_url
                )
                target.status = "published"
                target.platform_post_id = resp.get("id")
                target.published_at = datetime.utcnow()
                target.error_message = None

            await db.commit()
            return {"status": "success", "platform_post_id": target.platform_post_id}

        except Exception as exc:
            target.status = "failed"
            target.error_message = str(exc)
            target.retry_count += 1
            await db.commit()
            raise task.retry(exc=exc)

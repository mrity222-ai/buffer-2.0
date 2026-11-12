from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List
from datetime import datetime

from app.database import get_db
from app.models.user import User
from app.models.post import Post, PostTarget
from app.models.social_account import SocialAccount
from app.schemas.post import PostCreate, PostResponse, PostTargetResponse
from app.auth.router import get_current_user
from app.publishing.worker import publish_target_task

router = APIRouter(prefix="/posts", tags=["Posts & Multi-Publishing"])

@router.post("", response_model=PostResponse)
async def create_and_publish_post(
    post_in: PostCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if not post_in.target_account_ids:
        raise HTTPException(status_code=400, detail="At least one target account must be selected.")

    # Validate accounts belong to user
    res = await db.execute(
        select(SocialAccount).where(
            SocialAccount.id.in_(post_in.target_account_ids),
            SocialAccount.user_id == current_user.id
        )
    )
    valid_accounts = res.scalars().all()
    if len(valid_accounts) != len(post_in.target_account_ids):
        raise HTTPException(status_code=400, detail="One or more selected accounts are invalid.")

    # Create master Post
    new_post = Post(
        user_id=current_user.id,
        caption=post_in.caption,
        media=[m.dict() for m in post_in.media],
        media_type=post_in.media_type,
        status="scheduled" if post_in.scheduled_at else "publishing",
        scheduled_at=post_in.scheduled_at
    )
    db.add(new_post)
    await db.flush()

    # Create PostTargets for each selected account
    targets = []
    for acc in valid_accounts:
        target = PostTarget(
            post_id=new_post.id,
            social_account_id=acc.id,
            status="pending"
        )
        db.add(target)
        targets.append(target)

    await db.commit()
    await db.refresh(new_post)

    # If immediate publish, dispatch background tasks to Celery
    if not post_in.scheduled_at:
        for tgt in targets:
            try:
                publish_target_task.delay(tgt.id)
            except Exception:
                # If Redis/Celery is not connected during local dev, task remains pending
                pass

    # Build response with target details
    return await _format_post_response(new_post.id, db)

@router.get("", response_model=List[PostResponse])
async def list_posts(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Post)
        .where(Post.user_id == current_user.id)
        .order_by(Post.created_at.desc())
    )
    posts = result.scalars().all()
    response = []
    for p in posts:
        resp = await _format_post_response(p.id, db)
        response.append(resp)
    return response

@router.post("/{post_id}/retry", response_model=PostResponse)
async def retry_failed_post_targets(
    post_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(PostTarget)
        .join(Post)
        .where(
            Post.id == post_id,
            Post.user_id == current_user.id,
            PostTarget.status == "failed"
        )
    )
    failed_targets = result.scalars().all()
    if not failed_targets:
        raise HTTPException(status_code=400, detail="No failed targets found for this post.")

    for tgt in failed_targets:
        tgt.status = "pending"
        tgt.error_message = None
        try:
            publish_target_task.delay(tgt.id)
        except Exception:
            pass

    await db.commit()
    return await _format_post_response(post_id, db)

async def _format_post_response(post_id: int, db: AsyncSession) -> PostResponse:
    res = await db.execute(
        select(Post).where(Post.id == post_id).options(selectinload(Post.targets))
    )
    post = res.scalar_one()

    target_responses = []
    for t in post.targets:
        acc_res = await db.execute(select(SocialAccount).where(SocialAccount.id == t.social_account_id))
        acc = acc_res.scalar_one_or_none()
        target_responses.append(
            PostTargetResponse(
                id=t.id,
                post_id=t.post_id,
                social_account_id=t.social_account_id,
                platform=acc.platform if acc else "unknown",
                account_name=acc.name if acc else "Unknown Channel",
                account_username=acc.username if acc else None,
                account_avatar=acc.profile_picture_url if acc else None,
                status=t.status,
                platform_post_id=t.platform_post_id,
                platform_permalink=t.platform_permalink,
                error_message=t.error_message,
                retry_count=t.retry_count,
                published_at=t.published_at
            )
        )

    return PostResponse(
        id=post.id,
        user_id=post.user_id,
        caption=post.caption,
        media=post.media or [],
        media_type=post.media_type,
        status=post.status,
        scheduled_at=post.scheduled_at,
        published_at=post.published_at,
        created_at=post.created_at,
        updated_at=post.updated_at,
        targets=target_responses
    )

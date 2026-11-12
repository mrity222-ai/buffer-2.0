import httpx
from typing import List, Dict, Any, Optional
from app.config import settings

class MetaGraphClient:
    BASE_URL = f"https://graph.facebook.com/{settings.META_GRAPH_VERSION}"

    def __init__(self, access_token: Optional[str] = None):
        self.access_token = access_token

    def get_login_url(self, state: str) -> str:
        """
        Generate Meta OAuth login URL with required permissions:
        pages_show_list, pages_read_engagement, pages_manage_posts,
        instagram_basic, instagram_content_publish
        """
        scopes = [
            "pages_show_list",
            "pages_read_engagement",
            "pages_manage_posts",
            "instagram_basic",
            "instagram_content_publish"
        ]
        scope_str = ",".join(scopes)
        return (
            f"https://www.facebook.com/{settings.META_GRAPH_VERSION}/dialog/oauth?"
            f"client_id={settings.META_APP_ID}&"
            f"redirect_uri={settings.META_REDIRECT_URI}&"
            f"state={state}&"
            f"scope={scope_str}&"
            f"response_type=code"
        )

    async def exchange_code_for_token(self, code: str) -> Dict[str, Any]:
        """Exchange OAuth authorization code for User Access Token"""
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{self.BASE_URL}/oauth/access_token",
                params={
                    "client_id": settings.META_APP_ID,
                    "client_secret": settings.META_APP_SECRET,
                    "redirect_uri": settings.META_REDIRECT_URI,
                    "code": code,
                }
            )
            resp.raise_for_status()
            return resp.json()

    async def get_user_pages(self, user_access_token: str) -> List[Dict[str, Any]]:
        """
        Fetch Facebook Pages managed by user, along with any linked Instagram Business Accounts
        """
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{self.BASE_URL}/me/accounts",
                params={
                    "access_token": user_access_token,
                    "fields": "id,name,category,access_token,picture{url},instagram_business_account{id,username,name,profile_picture_url}"
                }
            )
            resp.raise_for_status()
            data = resp.json()
            return data.get("data", [])

    async def publish_facebook_page_post(
        self,
        page_id: str,
        page_access_token: str,
        message: str,
        image_url: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Publish to Facebook Page:
        If image_url is provided, call /{page-id}/photos
        Otherwise call /{page-id}/feed
        """
        async with httpx.AsyncClient() as client:
            if image_url:
                resp = await client.post(
                    f"{self.BASE_URL}/{page_id}/photos",
                    data={
                        "caption": message,
                        "url": image_url,
                        "access_token": page_access_token,
                    }
                )
            else:
                resp = await client.post(
                    f"{self.BASE_URL}/{page_id}/feed",
                    data={
                        "message": message,
                        "access_token": page_access_token,
                    }
                )
            resp.raise_for_status()
            return resp.json()

    async def publish_instagram_post(
        self,
        ig_user_id: str,
        access_token: str,
        caption: str,
        image_url: str
    ) -> Dict[str, Any]:
        """
        Publish to Instagram Professional Account (2-step container workflow):
        Step 1: Create Media Container (POST /{ig-user-id}/media)
        Step 2: Publish Container (POST /{ig-user-id}/media_publish)
        """
        async with httpx.AsyncClient() as client:
            # Step 1: Create container
            create_resp = await client.post(
                f"{self.BASE_URL}/{ig_user_id}/media",
                data={
                    "image_url": image_url,
                    "caption": caption,
                    "access_token": access_token,
                }
            )
            create_resp.raise_for_status()
            creation_id = create_resp.json().get("id")

            # Step 2: Publish container
            pub_resp = await client.post(
                f"{self.BASE_URL}/{ig_user_id}/media_publish",
                data={
                    "creation_id": creation_id,
                    "access_token": access_token,
                }
            )
            pub_resp.raise_for_status()
            return pub_resp.json()

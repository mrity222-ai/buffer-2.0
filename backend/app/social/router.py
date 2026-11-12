from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.database import get_db
from app.models.user import User
from app.models.social_account import SocialAccount
from app.schemas.social import SocialAccountResponse, MetaConnectCallbackRequest
from app.auth.router import get_current_user
from app.social.meta_client import MetaGraphClient

router = APIRouter(prefix="/social", tags=["Social Accounts"])

@router.get("/connect/meta")
async def get_meta_connect_url(current_user: User = Depends(get_current_user)):
    client = MetaGraphClient()
    state = f"user_{current_user.id}"
    url = client.get_login_url(state=state)
    return {"url": url}

@router.post("/callback/meta", response_model=List[SocialAccountResponse])
async def meta_oauth_callback(
    payload: MetaConnectCallbackRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    client = MetaGraphClient()
    try:
        token_data = await client.exchange_code_for_token(payload.code)
        user_access_token = token_data.get("access_token")
        pages = await client.get_user_pages(user_access_token)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Meta OAuth error: {str(e)}"
        )

    connected_accounts = []
    for page in pages:
        page_id = page["id"]
        page_name = page["name"]
        page_token = page["access_token"]
        pic_url = page.get("picture", {}).get("data", {}).get("url")
        category = page.get("category")

        # Save or update Facebook Page
        result = await db.execute(
            select(SocialAccount).where(
                SocialAccount.user_id == current_user.id,
                SocialAccount.platform == "facebook_page",
                SocialAccount.platform_account_id == page_id
            )
        )
        fb_acc = result.scalar_one_or_none()
        if not fb_acc:
            fb_acc = SocialAccount(
                user_id=current_user.id,
                platform="facebook_page",
                platform_account_id=page_id,
                name=page_name,
                username=page_id,
                profile_picture_url=pic_url,
                access_token=page_token,
                category=category,
                is_active=True
            )
            db.add(fb_acc)
        else:
            fb_acc.access_token = page_token
            fb_acc.name = page_name
            fb_acc.profile_picture_url = pic_url
            fb_acc.is_active = True
        connected_accounts.append(fb_acc)

        # Check for linked Instagram Business Account
        ig_data = page.get("instagram_business_account")
        if ig_data:
            ig_id = ig_data["id"]
            ig_username = ig_data.get("username", page_name)
            ig_pic = ig_data.get("profile_picture_url")

            result_ig = await db.execute(
                select(SocialAccount).where(
                    SocialAccount.user_id == current_user.id,
                    SocialAccount.platform == "instagram_business",
                    SocialAccount.platform_account_id == ig_id
                )
            )
            ig_acc = result_ig.scalar_one_or_none()
            if not ig_acc:
                ig_acc = SocialAccount(
                    user_id=current_user.id,
                    platform="instagram_business",
                    platform_account_id=ig_id,
                    name=ig_username,
                    username=ig_username,
                    profile_picture_url=ig_pic,
                    access_token=page_token, # uses parent page token
                    parent_page_id=page_id,
                    category="Instagram Professional",
                    is_active=True
                )
                db.add(ig_acc)
            else:
                ig_acc.access_token = page_token
                ig_acc.profile_picture_url = ig_pic
                ig_acc.is_active = True
            connected_accounts.append(ig_acc)

    await db.commit()
    return connected_accounts

@router.get("/accounts", response_model=List[SocialAccountResponse])
async def list_connected_accounts(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(SocialAccount).where(
            SocialAccount.user_id == current_user.id,
            SocialAccount.is_active == True
        )
    )
    return result.scalars().all()

@router.delete("/accounts/{account_id}", status_code=status.HTTP_204_NO_CONTENT)
async def disconnect_account(
    account_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(SocialAccount).where(
            SocialAccount.id == account_id,
            SocialAccount.user_id == current_user.id
        )
    )
    account = result.scalar_one_or_none()
    if not account:
        raise HTTPException(status_code=404, detail="Social account not found.")

    await db.delete(account)
    await db.commit()
    return None

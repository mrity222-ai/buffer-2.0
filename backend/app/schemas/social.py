from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class SocialAccountBase(BaseModel):
    platform: str
    platform_account_id: str
    name: str
    username: Optional[str] = None
    profile_picture_url: Optional[str] = None
    category: Optional[str] = None

class SocialAccountCreate(SocialAccountBase):
    access_token: str
    parent_page_id: Optional[str] = None
    token_expires_at: Optional[datetime] = None

class SocialAccountResponse(SocialAccountBase):
    id: int
    user_id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class MetaConnectCallbackRequest(BaseModel):
    code: str
    state: Optional[str] = None

class MetaDiscoveredPage(BaseModel):
    id: str
    name: str
    category: Optional[str] = None
    access_token: str
    picture_url: Optional[str] = None
    instagram_business_account: Optional[dict] = None

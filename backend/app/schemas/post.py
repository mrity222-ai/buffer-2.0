from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime

class MediaItem(BaseModel):
    url: str
    type: str = "image" # "image" or "video"
    thumbnail: Optional[str] = None
    width: Optional[int] = None
    height: Optional[int] = None

class PostBase(BaseModel):
    caption: str
    media: List[MediaItem] = []
    media_type: str = "none" # "none", "image", "video", "carousel"
    scheduled_at: Optional[datetime] = None

class PostCreate(PostBase):
    target_account_ids: List[int] # List of SocialAccount.id to publish to

class PostUpdate(BaseModel):
    caption: Optional[str] = None
    media: Optional[List[MediaItem]] = None
    media_type: Optional[str] = None
    scheduled_at: Optional[datetime] = None

class PostTargetResponse(BaseModel):
    id: int
    post_id: int
    social_account_id: int
    platform: str
    account_name: str
    account_username: Optional[str] = None
    account_avatar: Optional[str] = None
    status: str # "pending", "publishing", "published", "failed"
    platform_post_id: Optional[str] = None
    platform_permalink: Optional[str] = None
    error_message: Optional[str] = None
    retry_count: int
    published_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class PostResponse(PostBase):
    id: int
    user_id: int
    status: str
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    targets: List[PostTargetResponse] = []

    class Config:
        from_attributes = True

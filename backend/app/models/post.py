from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    
    caption = Column(Text, nullable=False)
    # Media URLs list stored as JSON: [{"url": "...", "type": "image|video", "thumbnail": "..."}]
    media = Column(JSON, default=list)
    media_type = Column(String(50), default="none") # 'none', 'image', 'video', 'carousel'
    
    # Status: 'draft', 'scheduled', 'publishing', 'published', 'partially_published', 'failed'
    status = Column(String(50), default="draft", index=True)
    
    scheduled_at = Column(DateTime, nullable=True)
    published_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="posts")
    targets = relationship("PostTarget", back_populates="post", cascade="all, delete-orphan")


class PostTarget(Base):
    """
    Each destination (Facebook Page or Instagram Business Account) selected for a Post.
    One Post -> Many Targets
    """
    __tablename__ = "post_targets"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), nullable=False, index=True)
    social_account_id = Column(Integer, ForeignKey("social_accounts.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Status for this specific destination: 'pending', 'publishing', 'published', 'failed'
    status = Column(String(50), default="pending", index=True)
    
    # Remote Post ID returned by Meta Graph API (e.g., "102381293_120381923")
    platform_post_id = Column(String(255), nullable=True)
    # Direct link to the post on Facebook or Instagram
    platform_permalink = Column(String(1024), nullable=True)
    
    error_message = Column(Text, nullable=True)
    retry_count = Column(Integer, default=0)
    published_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    post = relationship("Post", back_populates="targets")
    social_account = relationship("SocialAccount", back_populates="targets")
    jobs = relationship("PublishingJob", back_populates="target", cascade="all, delete-orphan")

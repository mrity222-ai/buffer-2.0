from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class SocialAccount(Base):
    __tablename__ = "social_accounts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # 'facebook_page' or 'instagram_business'
    platform = Column(String(50), nullable=False)
    
    # Facebook Page ID or Instagram Account ID
    platform_account_id = Column(String(100), nullable=False)
    name = Column(String(255), nullable=False)
    username = Column(String(255), nullable=True)
    profile_picture_url = Column(String(1024), nullable=True)
    
    # Encrypted Page or Account Access Token
    access_token = Column(Text, nullable=False)
    token_expires_at = Column(DateTime, nullable=True)
    
    # Extra metadata (e.g. linked FB Page ID for Instagram accounts, category)
    parent_page_id = Column(String(100), nullable=True)
    category = Column(String(100), nullable=True)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="social_accounts")
    targets = relationship("PostTarget", back_populates="social_account", cascade="all, delete-orphan")

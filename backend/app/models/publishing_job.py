from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class PublishingJob(Base):
    __tablename__ = "publishing_jobs"

    id = Column(Integer, primary_key=True, index=True)
    post_target_id = Column(Integer, ForeignKey("post_targets.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Celery task ID or async job ID
    job_id = Column(String(100), unique=True, index=True, nullable=False)
    
    # 'queued', 'processing', 'completed', 'failed', 'retrying'
    status = Column(String(50), default="queued", index=True)
    
    attempts = Column(Integer, default=0)
    max_attempts = Column(Integer, default=3)
    
    api_response = Column(JSON, nullable=True)
    error_details = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    started_at = Column(DateTime, nullable=True)
    finished_at = Column(DateTime, nullable=True)

    target = relationship("PostTarget", back_populates="jobs")

import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Social Publisher API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"

    # Database & Redis
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql+asyncpg://publisher:publisher_secret@localhost:5432/social_publisher"
    )
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    CELERY_BROKER_URL: str = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/1")
    CELERY_RESULT_BACKEND: str = os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/1")

    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "temporary_dev_secret_key_change_in_prod_1234567890")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    # Meta Graph API
    META_APP_ID: str = os.getenv("META_APP_ID", "")
    META_APP_SECRET: str = os.getenv("META_APP_SECRET", "")
    META_GRAPH_VERSION: str = "v21.0"
    META_REDIRECT_URI: str = os.getenv("META_REDIRECT_URI", "http://localhost:8000/api/social/callback/meta")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

    # Storage
    STORAGE_PROVIDER: str = os.getenv("STORAGE_PROVIDER", "local")
    S3_ENDPOINT_URL: str = os.getenv("S3_ENDPOINT_URL", "")
    S3_ACCESS_KEY_ID: str = os.getenv("S3_ACCESS_KEY_ID", "")
    S3_SECRET_ACCESS_KEY: str = os.getenv("S3_SECRET_ACCESS_KEY", "")
    S3_BUCKET_NAME: str = os.getenv("S3_BUCKET_NAME", "social-publisher-media")

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()

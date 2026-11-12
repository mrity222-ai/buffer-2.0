from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import settings
from app.database import engine, Base
from app.auth.router import router as auth_router
from app.social.router import router as social_router
from app.posts.router import router as posts_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create database tables automatically if they don't exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Multi-Channel Social Publisher API for Facebook Pages & Instagram Business",
    lifespan=lifespan
)

# CORS Middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Sub-Routers
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(social_router, prefix=settings.API_V1_STR)
app.include_router(posts_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "online",
        "docs_url": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

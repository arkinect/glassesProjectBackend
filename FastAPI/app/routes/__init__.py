from fastapi import APIRouter
from .market import router as market_router
from .posts import router as posts_router
from .auth import router as login_router

# Create a main router to group all route files
router = APIRouter()

# Include all route files
router.include_router(market_router, prefix="/market", tags=["Market"])
router.include_router(posts_router, prefix="/posts", tags=["Posts"])
router.include_router(login_router, prefix="/auth", tags=["Auth"])
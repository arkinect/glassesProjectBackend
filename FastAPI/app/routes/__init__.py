from fastapi import APIRouter
from .users import router as usersRouter
from .market import router as marketRouter
from .posts import router as postsRouter

# Create a main router to group all route files
router = APIRouter()

# Include all route files
router.include_router(usersRouter, prefix="/users", tags=["Users"])
router.include_router(marketRouter, prefix="/market", tags=["Market"])
router.include_router(postsRouter, prefix="/posts", tags=["Posts"])
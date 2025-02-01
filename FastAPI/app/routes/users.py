# imports 
from fastapi import APIRouter, status
import models, schemas
from database import db_dependency

# router
router = APIRouter()

# Create a new user
@router.post("/new/", status_code=status.HTTP_201_CREATED)
async def create_user(user: schemas.User, db: db_dependency):
    db_user = models.User(**user.model_dump())
    db.add(db_user)
    db.commit()
    return {"message": "User created successfully"}
# imports 
from fastapi import APIRouter, status, HTTPException
from fastapi.security import HTTPBearer
import models, schemas
from database import db_dependency

# router
router = APIRouter()

#auth0 account handling
security = HTTPBearer()

# Create a new user
@router.post("/new/", status_code=status.HTTP_201_CREATED) # this should be renamed to login or smth, it's not just for new users. it just makes them if they dont exist
async def log_user(user: schemas.User, db: db_dependency):
    if db.query(models.User).filter(models.User.id == user.id).count() == 0:
        dbUser = models.User(**user.model_dump())
        db.add(dbUser)
        db.commit()
        return {"message": "User created successfully"}
    else:
        return {"message": "User logged in"}
    
# THIS NEEDS TO BE REMOVED
@router.get("/all/", status_code=status.HTTP_200_OK)
async def get_all_users(db: db_dependency):
    users = db.query(models.User).all()
    if users is None:
        raise HTTPException(status_code=404, detail="No Users")
    return users
# imports 
from fastapi import APIRouter, status, HTTPException
import models, schemas
from database import db_dependency

# router
router = APIRouter()

# Create a new user
@router.post("/new/", status_code=status.HTTP_201_CREATED)
async def createUser(user: schemas.User, db: db_dependency):
    if db.query(models.User).filter(models.User.id == user.id).count() == 0:
        dbUser = models.User(**user.model_dump())
        db.add(dbUser)
        db.commit()
        return {"message": "User created successfully"}
    else:
        return {"message": "User logged in"}
    
# THIS NEEDS TO BE REMOVED
@router.get("/all/", status_code=status.HTTP_200_OK)
async def getUsers(db: db_dependency):
    users = db.query(models.User).all()
    if users is None:
        raise HTTPException(status_code=404, detail="No Users")
    return users
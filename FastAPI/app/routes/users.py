# imports 
from fastapi import APIRouter, status, HTTPException
import models, schemas
from database import db_dependency

# router
router = APIRouter()

# Create a new user
@router.post("/new/", status_code=status.HTTP_201_CREATED)
async def createUser(user: schemas.User, db: db_dependency):
    dbUser = models.User(**user.model_dump())
    db.add(dbUser)
    db.commit()
    return {"message": "User created successfully"}

@router.get("/all/", status_code=status.HTTP_200_OK)
async def getUsers(db: db_dependency):
    users = db.query(models.User).all()
    if users is None:
        raise HTTPException(status_code=404, detail="No Users")
    return users
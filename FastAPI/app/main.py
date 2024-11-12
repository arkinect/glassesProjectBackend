from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import func
from typing import List, Annotated
from sqlalchemy.orm import Session
from database import engine,sessionLocal
from dotenv import load_dotenv
import schemas
import models
import os

load_dotenv()
IMAGE_STORAGE=os.getenv('UPLOAD_DIRECTORY')

### dependency for db session
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

### app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],# allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

# create a new user
@app.post("/users/", status_code=status.HTTP_201_CREATED)
async def create_user(user: schemas.User, db: db_dependency):
    db_user = models.User(**user.model_dump())
    db.add(db_user)
    db.commit()

# get all market data      
@app.get("/market/", status_code=status.HTTP_200_OK)
async def marketAll(db: db_dependency):
    posts = db.query(models.MarketCard).all()
    if posts is None:
        raise HTTPException(status_code=404, detail="No posts")
    return posts

# get filtered market data
@app.get("/market/{prescription}", status_code=status.HTTP_200_OK)
async def marketAll(prescription: int, db: db_dependency):
    posts = db.query(models.MarketCard).filter(models.MarketCard.sphere == prescription).all()
    if posts is None:
        raise HTTPException(status_code=404, detail="No posts of that prescription found")
    return posts

# create a new post from the glasses form
@app.post("/postCreate/", status_code=status.HTTP_201_CREATED)
async def createPost(post: schemas.NewPostForm, db: db_dependency, images: List[UploadFile] = File(...)):
    try:
        ### business logic

        # find a value for sphere (most important part of prescription) with prefrence on the actual prescription 
        try:
            recordedSphere = max(post.prescription.left_eye.sphere, post.prescription.right_eye.sphere)
        except:
            recordedSphere = post.pseudoPrescription

        # retrieve the most recent post number
        max_post_number = db.query(func.max(models.GlassesDetailed.postNumb)).scalar()
        postNumber = (max_post_number or 0) + 1

        # retrieve location from active profile
        # when we implement auth0 we'll figure out how to pass through a user object, or the location from the user object
        testCity = post.location
        testPhoneNumber = post.contact

        ### create models and post to db
        marketPostModel = models.MarketCard(
            location=testCity,
            sphere=recordedSphere, 
            flagged=False,
            postNumb=postNumber
        )
        db.add(marketPostModel)

        detailedPostModel = models.GlassesDetailed(
            # postNumb=postNumber,
            flagged=False,
            prescription=post.prescription,
            pseudoPrescription=post.pseudoPrescription,
            comment=post.comment,
            user=None, # will have to poll active user, update schema
            location=testCity,
            contact=testPhoneNumber,
            postNumb=postNumber
        )
        db.add(detailedPostModel)

        # Commit the transaction after both are added
        db.commit()

        # Refresh objects to reflect their database state
        db.refresh(marketPostModel)
        db.refresh(detailedPostModel)

        return JSONResponse(content={}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
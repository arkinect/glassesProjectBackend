from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
import json
from fastapi.responses import JSONResponse
from sqlalchemy import func
from typing import List, Dict, Annotated
from pydantic import BaseModel
from sqlalchemy.orm import Session

import models
from database import engine,sessionLocal

import schemas
import models

### Load test data
try:
    with open('../TestData/testData.json', 'r') as file:
        data = json.load(file)
        testData = data.get('testArray1', [])  # Get 'testArray1' from the loaded JSON
except FileNotFoundError:
    testData = []
    print("Warning: testData.json not found.")
except json.JSONDecodeError:
    testData = []
    print("Error: testData.json is not a valid JSON file.")
except Exception as e:
    testData = []
    print(f"Unexpected error: {e}")

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

# get test data for market page
@app.get('/api/market/', response_model=List[schemas.MarketPosting])
def get_glasses_market() -> List[schemas.MarketPosting]:
    print("Returning data")
    if not testData:
        raise HTTPException(status_code=500, detail="No data available.")
    return list(testData.values())


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
async def createPost(post: schemas.NewPostForm, db: db_dependency):
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
        testCity = "Alphaville"
        testPhoneNumber = "000-000-0000"

        ### create models and post to db
        marketPostModel = models.MarketCard(
            location=testCity,
            sphere=recordedSphere, 
            flagged=False
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
            contact=testPhoneNumber
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
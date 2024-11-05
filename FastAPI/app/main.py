from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import List, Dict, Annotated
from pydantic import BaseModel
from sqlalchemy.orm import Session

import models
from database import engine,sessionLocal

from glassesProjectBackend.FastAPI.app.schemas import Posting, PostBase, UserBase, Location

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

### dependencies
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

### app
app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:3000"],    
    allow_methods=["GET, POST"]
)


# get test data for market page
@app.get('/api/market/', response_model=List[Posting])
def get_glasses_market() -> List[Posting]:
    print("Returning data")
    if not testData:
        raise HTTPException(status_code=500, detail="No data available.")
    return list(testData.values())


# create a new user
@app.post("/users/", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: db_dependency):
    db_user = models.User(**user.model_dump())
    db.add(db_user)
    db.commit()

# get all market data      
@app.get("/market/", status_code=status.HTTP_200_OK)
async def marketAll(db: db_dependency):
    posts = db.query(models.PostMarket).all()
    if posts is None:
        raise HTTPException(status_code=404, detail="No posts")
    return posts

# get filtered market data
@app.get("/market/{prescription}", status_code=status.HTTP_200_OK)
async def marketAll(prescription: int, db: db_dependency):
    posts = db.query(models.PostMarket).filter(models.PostMarket.sphere == prescription).all()
    if posts is None:
        raise HTTPException(status_code=404, detail="No posts of that prescription found")
    return posts

# create a new post
@app.post("/newPost/", status_code=status.HTTP_201_CREATED)
async def createPost(post: PostBase, db: db_dependency):

    # determine value in PostMarket table
    # if post.prescription.



    db_marketPosts = models.PostMarket(location = post.location, sphere = post.pseudoPrescription, flagged = post.flagged)
    db.add(db_marketPosts)
    
    db_detailedPosts = models.PostDetailed(**post.model_dump())
    db.add(db_detailedPosts)
    db.commit()
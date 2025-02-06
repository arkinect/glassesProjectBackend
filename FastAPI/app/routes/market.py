# imports
from fastapi import APIRouter, status, HTTPException
from dotenv import load_dotenv
import os

from database import db_dependency
import models

# router
router = APIRouter()

# load from env
load_dotenv()
IMAGE_STORAGE=os.getenv('UPLOAD_DIRECTORY')

# get all market data      
@router.get("/all/", status_code=status.HTTP_200_OK)
async def marketAll(db: db_dependency):
    posts = db.query(models.MarketCard).all()
    if posts is None:
        raise HTTPException(status_code=404, detail="No posts")
    return posts

# get filtered market data
@router.get("/{prescription}", status_code=status.HTTP_200_OK)
async def marketAll(prescription: int, db: db_dependency):
    posts = db.query(models.MarketCard).filter(models.MarketCard.sphere == prescription).all()
    if posts is None:
        raise HTTPException(status_code=404, detail="No posts of that prescription found")
    return posts

# retrieve detailed information for listing page
@router.get("/listing/{postNumb}", status_code=status.HTTP_200_OK)
async def getDetail(postNumb: int, db:db_dependency):
    detail = db.query(models.GlassesDetailed).filter(models.GlassesDetailed.postNumb == postNumb).all()
    if detail is None:
        raise HTTPException(status_code=404, detail="Could not find detail for that listing")
    elif len(detail > 1):
        raise HTTPException(status_code=502, detail="Multiple sets of information were found for this listing" )
    return detail
# imports
from fastapi import APIRouter, status, HTTPException
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from pathlib import Path
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

# pass images to frontend
@router.get("/image/{imageName}", status_code=status.HTTP_200_OK)
async def getImages(imageName: str):
    directory = Path(__file__).resolve().parent.parent.parent.parent.parent / IMAGE_STORAGE / imageName
    print(directory)
    if not directory.exists():
        pass
        # raise HTTPException(status_code=404, detail="Image for this post could not be found")
    else:
        return FileResponse(directory)
# imports
from fastapi import APIRouter, Depends, status, HTTPException, Form, UploadFile, File
from fastapi.responses import JSONResponse
from typing import List
from sqlalchemy import func
from pathlib import Path
import json

from config import IMAGE_STORAGE
from verification import get_current_user
import schemas
import models
from database import db_dependency

# router
router = APIRouter()

# create a new post from the glasses form
@router.post("/new/", status_code=status.HTTP_201_CREATED)
async def create_post(db: db_dependency, post: str = Form(...), images: List[UploadFile] = File(...), current_user: str = Depends(get_current_user)):
    db_user = db.query(models.User).filter(models.User.id == current_user).first()
    if not db_user:
        raise HTTPException(status_code=404, detail=current_user)
    try:
        # unpack post json 
        post = schemas.NewPostForm(**json.loads(post))

        ### business logic
        # find a value for sphere (most important part of prescription) with prefrence on the actual prescription 
        try:
            recordedSphere = max(post.prescription.leftEye.sphere, post.prescription.rightEye.sphere)
        except:
            recordedSphere = post.pseudoPrescription

        # retrieve the most recent post number
        maxPostNumber = db.query(func.max(models.GlassesDetailed.postNumb)).scalar()
        postNumber = (maxPostNumber or 0) + 1

        # retrieve location from active profile
        # when we implement auth0 we'll figure out how to pass through a user object, or the location from the user object
        testCity = post.location
        testPhoneNumber = post.contact

        # 
        imagePaths = []
        countImages = 0
        directory = Path(__file__).resolve().parent.parent.parent.parent.parent / IMAGE_STORAGE
        for image in images:
            loggedFileName = f"{postNumber}_{countImages}_{image.filename}"
            filePath = directory / loggedFileName
            with open(filePath, "wb") as f:
                f.write(await image.read())
            imagePaths.append(str(loggedFileName))
            countImages += 1

        # create a dict from the presription data
        prescription_data = post.prescription.dict()


        ### create models and post to db
        marketPostModel = models.MarketCard(
            location=testCity,
            sphere=recordedSphere, 
            flagged=False,
            postNumb=postNumber,
            imageCard=imagePaths[0] if imagePaths else None
        )
        db.add(marketPostModel)

        detailedPostModel = models.GlassesDetailed(
            # postNumb=postNumber, # removed because it refs mkt table
            flagged=False,
            prescription=prescription_data,
            pseudoPrescription=post.pseudoPrescription,
            comment=post.comment,
            user=None, # will have to poll active user, update schema
            location=testCity,
            contact=testPhoneNumber,
            postNumb=postNumber
        )
        db.add(detailedPostModel)

        for imagePath in imagePaths:
            postImageModel = models.Images(
                postNumb=postNumber,
                imagePath=imagePath
            )
            db.add(postImageModel)

        # Commit the transaction after both are added
        db.commit()

        # Refresh objects to reflect their database state
        db.refresh(marketPostModel)
        db.refresh(detailedPostModel)

        return JSONResponse(content={}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
# retrieve list of links to images for image carousel    
@router.get("/getImages/{postNumb}", status_code=status.HTTP_200_OK)
async def get_images(postNumb: int, db:db_dependency):
    images = db.query(models.Images).filter(models.Images.postNumb == postNumb).all()
    # print(images, flush=True)
    if len(images) == 0:
        raise HTTPException(status_code=404, detail="Could not find images for that listing")
    return images
# imports
from fastapi import APIRouter, status, HTTPException, Form, UploadFile, File
from fastapi.responses import JSONResponse
from typing import List
from sqlalchemy import func
from pathlib import Path
from dotenv import load_dotenv
import json
import os

import schemas
import models
from database import db_dependency

# router
router = APIRouter()

# load from env
load_dotenv()
IMAGE_STORAGE=os.getenv('UPLOAD_DIRECTORY')


# create a new post from the glasses form
@router.post("/new/", status_code=status.HTTP_201_CREATED)
async def createPost(db: db_dependency, post: str = Form(...), images: List[UploadFile] = File(...)):
    try:
        # unpack post json 
        post = schemas.NewPostForm(**json.loads(post))

        ### business logic
        # find a value for sphere (most important part of prescription) with prefrence on the actual prescription 
        try:
            recordedSphere = max(post.prescription.left_eye.sphere, post.prescription.right_eye.sphere)
        except:
            recordedSphere = post.pseudoPrescription

        # retrieve the most recent post number
        maxPostNumber = db.query(func.max(models.GlassesDetailed.postNumb)).scalar()
        postNumber = (maxPostNumber or 0) + 1

        # retrieve location from active profile
        # when we implement auth0 we'll figure out how to pass through a user object, or the location from the user object
        testCity = post.location
        testPhoneNumber = post.contact

        imagePaths = []
        countImages = 0
        directory = Path(__file__).resolve().parent.parent.parent.parent.parent / IMAGE_STORAGE
        for image in images:
            filePath = directory / f"{postNumber}_{countImages}_{image.filename}"
            print(filePath)
            with open(filePath, "wb") as f:
                f.write(await image.read())
            imagePaths.append(str(filePath))
            countImages += 1

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
            prescription=post.prescription,
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
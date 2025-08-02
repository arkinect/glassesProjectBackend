# imports
from fastapi import APIRouter, Depends, status, HTTPException, Form, UploadFile, File
from fastapi.responses import JSONResponse
from typing import List
from sqlalchemy import func
from pathlib import Path
import json

from config import IMAGE_STORAGE
from schemas import NewPostForm, serialize_with_schemas, singleImage
from user_verification import get_current_user
import models
from database import db_dependency

# router
router = APIRouter()

# create a new post from the glasses form
@router.post("/new/", status_code=status.HTTP_201_CREATED)
async def create_post(db: db_dependency, post: str = Form(...), images: List[UploadFile] = File(...), current_user: str = Depends(get_current_user)):
    db_user = db.query(models.user).filter(models.user.id == current_user).first()
    if not db_user:
        raise HTTPException(status_code=401, detail=current_user)
    try:
        # unpack post json 
        post = NewPostForm(**json.loads(post))

        ### business logic
        # find a value for sphere (most important part of prescription) with prefrence on the actual prescription 
        try:
            recordedSphere = max(post.prescription.leftEye.sphere, post.prescription.rightEye.sphere)
        except:
            recordedSphere = post.pseudoPrescription

        # retrieve the most recent post number
        maxPostNumber = db.query(func.max(models.glasses_detailed.post_numb)).scalar()
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
        marketPostModel = models.market_card(
            location=testCity,
            sphere=recordedSphere, 
            flagged=False,
            post_numb=postNumber,
            image_card=imagePaths[0] if imagePaths else None
        )
        db.add(marketPostModel)

        detailed_post_model = models.glasses_detailed(
            # postNumb=postNumber, # removed because it refs mkt table
            flagged=False,
            prescription=prescription_data,
            pseudo_prescription=post.pseudoPrescription,
            comment=post.comment,
            user=None, # will have to poll active user, update schema
            location=testCity,
            contact=testPhoneNumber,
            post_numb=postNumber
        )
        db.add(detailed_post_model)

        for imagePath in imagePaths:
            post_image_model = models.images(
                post_numb=postNumber,
                image_path=imagePath
            )
            db.add(post_image_model)

        # Commit the transaction after both are added
        db.commit()

        # Refresh objects to reflect their database state
        db.refresh(marketPostModel)
        db.refresh(detailed_post_model)

        return JSONResponse(content={}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
# retrieve list of links to images for image carousel    
@router.get("/getImages/{postNumb}", status_code=status.HTTP_200_OK)
async def get_images(postNumb: int, db:db_dependency) -> List[dict]:
    images = db.query(models.images).filter(models.images.post_numb == postNumb).all()
    # print(images, flush=True)
    if len(images) == 0:
        raise HTTPException(status_code=404, detail="Could not find images for that listing")
    # return images
    return serialize_with_schemas([singleImage.model_validate(image) for image in images])
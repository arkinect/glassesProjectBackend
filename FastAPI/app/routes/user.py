# imports
from fastapi import APIRouter, Depends, status, HTTPException, Form
from fastapi.responses import JSONResponse
import json

from schemas import UserInfoForm, serialize_with_schemas
from user_verification import get_current_user
import models
from database import db_dependency

# router
router = APIRouter()

# register default information for user
@router.put("/info", status_code=status.HTTP_204_NO_CONTENT)
async def update_info(db: db_dependency, post: str = Form(...), current_user: str = Depends(get_current_user)):
    db_user = db.query(models.user).filter(models.user.id == current_user).first()
    if not db_user:
        raise HTTPException(status_code=404, detail=current_user)
    try:
        post = UserInfoForm(**json.loads(post))

        # create a dict from the presription data
        prescription_data = post.prescription.dict()

        db_user.default_contact = post.defaultContact
        db_user.default_location = post.defaultLocation
        db_user.prescription = prescription_data

        # Commit the transaction after both are added
        db.commit()

        # Refresh objects to reflect their database state
        db.refresh(db_user)

        return JSONResponse(content={}, status_code=status.HTTP_201_CREATED)

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
# retrieve default information for user
@router.get("/info", status_code=status.HTTP_200_OK)
async def retrieve_info(db: db_dependency, current_user: str = Depends(get_current_user)):
    db_user = db.query(models.user).filter(models.user.id == current_user).first()
    if not db_user:
        raise HTTPException(status_code=404, detail=current_user)
    return serialize_with_schemas(UserInfoForm.model_validate(db_user))
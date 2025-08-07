# imports
from typing import List
from fastapi import APIRouter, status, HTTPException

from database import db_dependency
import models
from schemas import DetailedPosting, Posting, serialize_with_schemas

# router
router = APIRouter()

# get all market data      
@router.get("/all/", status_code=status.HTTP_200_OK)
async def get_market_all(db: db_dependency) -> List[dict]:
    posts = db.query(models.market_card).all()
    if posts is None:
        raise HTTPException(status_code=404, detail="No posts")
    return serialize_with_schemas([Posting.model_validate(post) for post in posts])

# get filtered market data
@router.get("/{prescription}", status_code=status.HTTP_200_OK)
async def get_market(prescription: int, db: db_dependency) -> List[dict]:
    posts = db.query(models.market_card).filter(models.market_card.sphere == prescription).all()
    if len(posts) == 0:
        raise HTTPException(status_code=404, detail="No posts of that prescription found")
    return serialize_with_schemas([Posting.model_validate(post) for post in posts])

# retrieve detailed information for listing page
@router.get("/listing/{postNumb}", status_code=status.HTTP_200_OK)
async def get_detail(postNumb: int, db:db_dependency) -> dict:
    detail = db.query(models.glasses_detailed).filter(models.glasses_detailed.post_numb == postNumb).all()
    if len(detail) == 0:
        raise HTTPException(status_code=404, detail="Could not find detail for that listing")
    elif len(detail) > 1:
        raise HTTPException(status_code=502, detail="Multiple sets of information were found for this listing" )
    return serialize_with_schemas(DetailedPosting.model_validate(detail[0]))
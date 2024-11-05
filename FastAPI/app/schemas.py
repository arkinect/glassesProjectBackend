from pydantic import BaseModel
from typing import Optional

# this file holds pydantic schemas for data validation

### helper schemas
# model for one eye
class _EyePrescription(BaseModel):
    sphere: Optional[float] = None
    cylinder: Optional[float] = None
    axis: Optional[float] = None
    prism: Optional[float] = None
    base: Optional[str] = None  # regex could be added later, but we'll have to be careful
    add: Optional[float] = None

# model for whole prescription
class _Prescription(BaseModel):
    left_eye: _EyePrescription
    right_eye: _EyePrescription


### get schemas
class Location(BaseModel):
    city: str

class Posting(BaseModel):
    prescription: str
    owner_name: str
    contact: str    
    location: Location

###  post schemas
class UserBase(BaseModel):
    username: str
    defaultContact: str
    defaultLocation: str

class PostBase(BaseModel):
    flagged: bool
    prescription: _Prescription
    pseudoPrescription: float
    comment: str
    user: str
    location: str
    contact: str


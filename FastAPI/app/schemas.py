from pydantic import BaseModel
from typing import Optional

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
    leftEye: _EyePrescription
    rightEye: _EyePrescription

class _Location(BaseModel):
    city: str

### get schemas

class MarketPosting(BaseModel):
    prescription: str
    owner_name: str
    contact: str    
    location: _Location

### post schemas
class User(BaseModel):
    id: str

class NewPostForm(BaseModel):
    prescription: Optional[_Prescription] = None
    pseudoPrescription: Optional[float] = None
    comment: str
    location: str
    contact: str

class UserInfoForm(BaseModel):
    prescription: Optional[_Prescription] = None
    defaultLocation: Optional[_Prescription] = None
    defaultContact: Optional[_Prescription] = None

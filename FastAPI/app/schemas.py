from pydantic import BaseModel, ConfigDict, Field
from typing import List, Optional, TypeVar

# use pydantic serialization
T = TypeVar('T', bound=BaseModel)

def serialize_with_schemas(obj_or_list):
    if isinstance(obj_or_list, list):
        return [item.model_dump(by_alias=False) for item in obj_or_list]
    else:
        return obj_or_list.model_dump(by_alias=False)
    
# enable aliases (left should match interface, right should match model) 
class BaseSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
    )

# I've ordered the schemas to match interfaces.tsx
# schemas for prescription
class _EyePrescription(BaseSchema):
    sphere: Optional[float] = None
    cylinder: Optional[float] = None
    axis: Optional[float] = None
    prism: Optional[float] = None
    base: Optional[str] = None  # regex could be added later, but we'll have to be careful
    add: Optional[float] = None

class _Prescription(BaseSchema):
    leftEye: _EyePrescription
    rightEye: _EyePrescription

# schemas for different sets of post information
class _Image(BaseSchema):
    id: int
    imagePath: str = Field(..., alias="image_path")

class DetailedPosting(BaseSchema):
    comment: str
    contact: Optional[str] = None
    flagged: bool
    location: str
    pictures: Optional[List[_Image]] = None
    postNumb: int = Field(..., alias="post_numb")
    prescription: Optional[_Prescription] = None
    pseudoPrescription: Optional[float] = Field(None, alias="pseudo_prescription")
    user: Optional[str] = None

class Posting(BaseSchema):
    postNumb: int = Field(..., alias="post_numb")
    location: str
    sphere: float
    flagged: bool
    imageCard: str = Field(..., alias="image_card")

class NewPostForm(BaseSchema):
    prescription: Optional[_Prescription] = None
    pseudoPrescription: Optional[float] = Field(None, alias="pseudo_prescription")
    comment: str
    location: str
    contact: str

# schema for returning images
class singleImage(BaseSchema):
    id: int
    postNumb: int = Field(..., alias="post_numb")
    imagePath: str = Field(..., alias="image_path")

# schema to define shape of user info update
class UserInfoForm(BaseSchema):
    prescription: Optional[_Prescription] = None
    defaultLocation: Optional[str] = Field(None, alias="default_location")
    defaultContact: Optional[str] = Field(None, alias="default_contact")

# schema used to help define auth context
class User(BaseSchema):
    user: Optional[str]

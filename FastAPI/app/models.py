from sqlalchemy import Boolean, Column, Integer, String, Float, JSON
from database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True)
    flags = Column(Integer) # count flagged posts
    defaultContact = Column(String(50), nullable=True) # (416) 000-1234
    defaultLocation = Column(String(50)) # Etobicoe - Toronto ON

class PostMarket(Base):
    __tablename__ = 'marketInfo'

    postNumb = Column(Integer, primary_key=True)
    location = Column(String(50)) # Etobicoe - Toronto ON
    sphere = Column(Float, index=True) # most important part prescription. Use Right eye if theyre different
    flagged = Column(Boolean)
    
class PostDetailed(Base):
    __tablename__ = 'detailedInfo' 

    # meta data about the post
    postNumb = Column(Integer, primary_key=True, index=True) # lookup for finding post when clicked
    flagged = Column(Boolean) # whether or not the post has been flagged by the community

    # about the posted item
    prescription = Column(JSON, nullable=True) # to hold all prescription data
    pseudoPrescription = Column(Float, nullable=True) # in case they dont know their prescription
    comment = Column(String(100), nullable=True) # these were my son's glasses

    # about the poster
    user = Column(String(50)) # username associated with this post
    location = Column(String(50)) # Etobicoe - Toronto ON
    contact = Column(String(50), nullable=True) # (416) 000-1234

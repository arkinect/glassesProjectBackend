from sqlalchemy import Boolean, Column, Integer, String, Float
from database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True)
    flags = Column(Integer) # count flagged posts
    defaultContact = Column(String(50)) # (416) 000-1234
    defaultLocation = Column(String(50)) # Etobicoe - Toronto ON

class PostMarket(Base):
    __tablename__ = 'marketInfo'

    postNumb = Column(Integer, primary_key=True)
    location = Column(String(50)) # Etobicoe - Toronto ON
    sphere = Column(Float, index=True) # overall prescription
    
class PostDetailed(Base):
    __tablename__ = 'detailedInfo' 

    # meta data on the post
    postNumb = Column(Integer, primary_key=True, index=True) # lookup for finding post when clicked
    flagged = Column(Boolean) # whether or not the post has been flagged by the community

    # on the posted item
    sphere = Column(Float) # overall prescription
    cylinder = Column(Float) # correction for astygmatism
    axis = Column(Float) # correction for astygmatism
    prism = Column(Float) # correction for crossed eyes
    comment = Column(String(100)) # these were my son's glasses

    # on the poster
    user = Column(String(50)) # username associated with this post
    location = Column(String(50)) # Etobicoe - Toronto ON
    contact = Column(String(50)) # (416) 000-1234

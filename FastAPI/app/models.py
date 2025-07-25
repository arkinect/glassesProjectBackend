from sqlalchemy import Boolean, Column, Integer, String, Float, JSON, ForeignKey
from database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = 'users'

    id = Column(String(50), primary_key=True, index=True)
    flags = Column(Integer, default=0)  # count flagged posts
    defaultContact = Column(String(50), nullable=True)  # (416) 000-1234
    defaultLocation = Column(String(50), nullable=True)  # Etobicoke - Toronto ON


class MarketCard(Base):
    __tablename__ = 'marketInfo'

    postNumb = Column(Integer, primary_key=True)
    location = Column(String(50))  # Etobicoke - Toronto ON
    sphere = Column(Float, index=True)  # most important part prescription. Use Right eye if they're different
    flagged = Column(Boolean, default=False)
    imageCard = Column(String(225))  # path to image on market

    detailedInfo = relationship("GlassesDetailed", back_populates="marketCard", uselist=False)


class GlassesDetailed(Base):
    __tablename__ = 'detailedInfo'

    # Meta data about the post
    postNumb = Column(Integer, ForeignKey('marketInfo.postNumb'), primary_key=True, index=True)  # Foreign key to MarketCard
    flagged = Column(Boolean, default=False)  # whether or not the post has been flagged by the community

    # About the posted item
    prescription = Column(JSON, nullable=True)  # to hold all prescription data
    pseudoPrescription = Column(Float, nullable=True)  # in case they don't know their prescription
    comment = Column(String(100), nullable=True)  # "These were my son's glasses"

    # About the poster
    user = Column(String(50))  # username associated with this post
    location = Column(String(50))  # Etobicoke - Toronto ON
    contact = Column(String(50), nullable=True)  # (416) 000-1234

    # relationships
    marketCard = relationship("MarketCard", back_populates="detailedInfo")
    # This is the key change: images now reference `GlassesDetailed.postNumb`
    pictures = relationship("Images", back_populates="glassesDetailed")


class Images(Base):
    __tablename__ = 'images'

    id = Column(Integer, primary_key=True)
    # link images to GlassesDetailed directly, not MarketCard
    postNumb = Column(Integer, ForeignKey('detailedInfo.postNumb'))  # Foreign key to GlassesDetailed
    imagePath = Column(String(225))

    # Define the relationship back to GlassesDetailed
    glassesDetailed = relationship("GlassesDetailed", back_populates="pictures")

from sqlalchemy import Boolean, Column, Integer, String, Float, JSON, ForeignKey
from database import Base
from sqlalchemy.orm import relationship


class user(Base):
    __tablename__ = 'users'

    id = Column(String(50), primary_key=True, index=True)
    flags = Column(Integer, default=0)  # count flagged posts
    default_contact = Column(String(50), nullable=True)  # (416) 000-1234
    default_location = Column(String(50), nullable=True)  # Etobicoke - Toronto ON
    prescription = Column(JSON, nullable=True)  # to hold all prescription data


class market_card(Base):
    __tablename__ = 'market_info'

    post_numb = Column(Integer, primary_key=True)
    location = Column(String(50))  # Etobicoke - Toronto ON
    sphere = Column(Float, index=True)  # most important part prescription. Use Right eye if they're different
    flagged = Column(Boolean, default=False)
    image_card = Column(String(225))  # path to image on market

    detailed_info = relationship("glasses_detailed", back_populates="market_card", uselist=False)


class glasses_detailed(Base):
    __tablename__ = 'detailed_info'

    # Meta data about the post
    post_numb = Column(Integer, ForeignKey('market_info.post_numb'), primary_key=True, index=True)  # Foreign key to MarketCard
    flagged = Column(Boolean, default=False)  # whether or not the post has been flagged by the community

    # About the posted item
    prescription = Column(JSON, nullable=True)  # to hold all prescription data
    pseudo_prescription = Column(Float, nullable=True)  # in case they don't know their prescription
    comment = Column(String(100), nullable=True)  # "These were my son's glasses"

    # About the poster
    user = Column(String(50))  # username associated with this post
    location = Column(String(50))  # Etobicoke - Toronto ON
    contact = Column(String(50), nullable=True)  # (416) 000-1234

    # relationships
    market_card = relationship("market_card", back_populates="detailed_info")
    # This is the key change: images now reference `GlassesDetailed.postNumb`
    pictures = relationship("images", back_populates="glasses_detailed")


class images(Base):
    __tablename__ = 'images'

    id = Column(Integer, primary_key=True)
    # link images to GlassesDetailed directly, not MarketCard
    post_numb = Column(Integer, ForeignKey('detailed_info.post_numb'))  # Foreign key to GlassesDetailed
    image_path = Column(String(225))

    # Define the relationship back to GlassesDetailed
    glasses_detailed = relationship("glasses_detailed", back_populates="pictures")

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends

from config import URL_DATABASE

engine = create_engine(URL_DATABASE)

session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# dependency for db session
def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
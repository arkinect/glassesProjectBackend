from fastapi import FastAPI, HTTPException, status
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from dotenv import load_dotenv
import os

from database import engine
import models
from routes import router

### retrieve from .env
load_dotenv()
IMAGE_STORAGE=os.getenv('UPLOAD_DIRECTORY')

### app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],# allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

app.include_router(router)

# pass images to frontend
@app.get("/image/{imageName}", status_code=status.HTTP_200_OK)
async def getImages(imageName: str):
    directory = Path(__file__).resolve().parent.parent.parent.parent / IMAGE_STORAGE / imageName
    print(directory)
    if not directory.exists():
        pass
        raise HTTPException(status_code=404, detail="Image could not be found")
    else:
        return FileResponse(directory)
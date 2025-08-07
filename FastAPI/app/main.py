from fastapi import FastAPI, HTTPException, status
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

from config import IMAGE_STORAGE
from database import engine
import models
from routes import router

### app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

app.include_router(router)

# pass images to frontend
@app.get("/image/{image_name}", status_code=status.HTTP_200_OK)
async def get_images(image_name: str):

    if ".." in image_name or image_name.startswith("/"):
        raise HTTPException(status_code=400, detail="Invalid image name")

    directory = Path(__file__).resolve().parent.parent.parent.parent / IMAGE_STORAGE / image_name
    if not directory.exists():
        pass
        raise HTTPException(status_code=404, detail="Image could not be found")
    else:
        return FileResponse(directory)
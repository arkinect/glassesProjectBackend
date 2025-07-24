import os
from dotenv import load_dotenv

load_dotenv()
AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
CLIENT_ID = os.getenv("AUTH0_CLIENT_ID")
CLIENT_SECRET = os.getenv("AUTH0_CLIENT_SECRET")
API_AUDIENCE = os.getenv("AUTH0_API_AUDIENCE")
IMAGE_STORAGE=os.getenv('UPLOAD_DIRECTORY')
URL_DATABASE = os.getenv('MYSQL_URL')

LOGIN_REDIRECT_URI = "http://localhost:8000/auth/token"
GENERIC_REDIRECT_URI = "http://localhost:3000/market"
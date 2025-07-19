import os
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt 
import requests
from dotenv import load_dotenv




load_dotenv()

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
API_AUDIENCE = os.getenv("AUTH0_API_AUDIENCE")
ALGORITHMS = ["RS256"]
JWKS_URL = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"

security = HTTPBearer()

# caching
jwks_cache = None

def get_jwks():
    global jwks_cache
    if jwks_cache is None:
        response = requests.get(JWKS_URL)
        response.raise_for_status()
        jwks_cache = response.json()
    return jwks_cache

def get_public_key(token):
    unverified_header = jwt.get_unverified_header(token)
    jwks = get_jwks()["keys"]
    for key in jwks:
        if key["kid"] == unverified_header["kid"]:
            return jwt.algorithms.RSAAlgorithm.from_jwk(key)
    raise Exception("Public key not found.")

def get_current_user(token: HTTPAuthorizationCredentials = Depends(security)):
    try:
        public_key = get_public_key(token.credentials)
        payload = jwt.decode(
            token.credentials,
            public_key,
            algorithms=ALGORITHMS,
            audience=API_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/"
        )
        return payload["sub"]
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

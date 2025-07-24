from fastapi import Cookie, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt 
import requests

from config import API_AUDIENCE, AUTH0_DOMAIN

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
            return key
    raise Exception("Public key not found.")

def get_current_user(access_token: str = Cookie(None)):
    if not access_token:
        raise HTTPException(401, "Missing access token")
    try:
        public_key = get_public_key(access_token)
        payload = jwt.decode(
            access_token,
            public_key,
            algorithms=ALGORITHMS,
            audience=API_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/"
        )
        return payload["sub"]
    except Exception as e:
        print(f"Token validation failed: {e}")
        raise HTTPException(401, "Invalid or expired token")

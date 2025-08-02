# imports
from typing import Optional
from fastapi import Cookie, APIRouter, HTTPException
from fastapi.responses import RedirectResponse, JSONResponse
import requests

import models
from database import db_dependency
import schemas
from user_verification import get_current_user
from config import AUTH0_DOMAIN, CLIENT_ID, CLIENT_SECRET, API_AUDIENCE, FRONTEND_URL, BACKEND_URL

# router
router = APIRouter()

@router.get("/login")
async def login():
    return RedirectResponse(
        f"https://{AUTH0_DOMAIN}/authorize"
        f"?response_type=code"
        f"&client_id={CLIENT_ID}"
        f"&redirect_uri={BACKEND_URL}/auth/token"
        f"&audience={API_AUDIENCE}"
        f"&scope=openid profile email"
    )

@router.get("/token")
def get_access_token(code: str, db:db_dependency):
    payload = {
        "grant_type": "authorization_code",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": code,
        "redirect_uri": f"{BACKEND_URL}/auth/token",
    }
    headers = {"content-type": "application/x-www-form-urlencoded"}
    response = requests.post(f"https://{AUTH0_DOMAIN}/oauth/token", data=payload, headers=headers)

    if response.status_code != 200:
        return JSONResponse(status_code=400, content={"error": response.text})

    token = response.json()
    access_token = token.get("access_token")

    # call create user
    create_user(db=db, access_token=access_token)

    # setup cookie
    response = RedirectResponse(url=f"{FRONTEND_URL}/market")
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="Lax",
        max_age=token.get("expires_in", 3600),
        path="/"
    )
    return response

@router.get("/logout")
async def logout():
    response = RedirectResponse(
        url=(
            f"https://{AUTH0_DOMAIN}/v2/logout"
            f"?client_id={CLIENT_ID}"
            f"&returnTo={FRONTEND_URL}/market"
        )
    )
    response.delete_cookie("access_token", path="/")
    return response

@router.get("/check", response_model=schemas.User)
def get_me(access_token: Optional[str] = Cookie(None)):
    if not access_token:
        return {"user": None}
    try:
        user = get_current_user(access_token)
        return {"user": user}
    except Exception:
        return {"user": None}

# handle user creation
def create_user(db: db_dependency, access_token: str):
    userinfo_response = requests.get(
        f"https://{AUTH0_DOMAIN}/userinfo",
        headers = {
            "Authorization" : f"Bearer {access_token}"
        }
    )

    if userinfo_response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid token or Auth0 error")

    userinfo = userinfo_response.json()
    auth0_id = userinfo["sub"]

    user = db.query(models.user).filter(models.user.id == auth0_id).first()
    if user:
        return {"message": "User already exists"}
    
    db_user = models.user(
        id=auth0_id,
        flags=0,
        contact=userinfo["email"],
        location=None,
    )
    db.add(db_user)
    db.commit()
    return {"message": "User created successfully"}
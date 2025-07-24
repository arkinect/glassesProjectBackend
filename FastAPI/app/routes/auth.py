# imports
from typing import Optional
from fastapi import Cookie, APIRouter
from fastapi.responses import RedirectResponse, JSONResponse
import requests

from verification import get_current_user
from config import AUTH0_DOMAIN, CLIENT_ID, CLIENT_SECRET, API_AUDIENCE, GENERIC_REDIRECT_URI, LOGIN_REDIRECT_URI

# router
router = APIRouter()

@router.get("/login")
async def login():
    return RedirectResponse(
        f"https://{AUTH0_DOMAIN}/authorize"
        f"?response_type=code"
        f"&client_id={CLIENT_ID}"
        f"&redirect_uri={LOGIN_REDIRECT_URI}"
        f"&audience={API_AUDIENCE}"
        f"&scope=openid profile email"
    )

@router.get("/token")
def get_access_token(code: str):
    payload = {
        "grant_type": "authorization_code",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": code,
        "redirect_uri": LOGIN_REDIRECT_URI,
    }
    headers = {"content-type": "application/x-www-form-urlencoded"}
    response = requests.post(f"https://{AUTH0_DOMAIN}/oauth/token", data=payload, headers=headers)

    if response.status_code != 200:
        return JSONResponse(status_code=400, content={"error": response.text})

    token = response.json()
    access_token = token.get("access_token")

    # setup cookie
    response = RedirectResponse(url=GENERIC_REDIRECT_URI)
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
            f"&returnTo={GENERIC_REDIRECT_URI}"
        )
    )
    response.delete_cookie("access_token", path="/")
    return response

@router.get("/check")
def get_me(access_token: Optional[str] = Cookie(None)):
    if not access_token:
        return {"user": None}
    try:
        user = get_current_user(access_token)
        return {"user": user}
    except Exception:
        return {"user": None}

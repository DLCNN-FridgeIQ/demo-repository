from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import JWTError
from app.models.schemas import LoginRequest, RegisterRequest, TokenResponse, VerifyResponse
from app.services.auth_service import authenticate_user, register_user
from app.core.security import decode_token
from app.database import get_db

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    token = authenticate_user(request.username, request.password)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"access_token": token, "token_type": "bearer"}


@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest, db: Session = Depends(get_db)):
    if len(request.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    token = register_user(db, request.username, request.password, request.name)
    if not token:
        raise HTTPException(status_code=409, detail="Username already taken")
    return {"access_token": token, "token_type": "bearer"}


@router.get("/verify", response_model=VerifyResponse)
async def verify(token: str):
    try:
        username = decode_token(token)
        return {"valid": True, "username": username}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

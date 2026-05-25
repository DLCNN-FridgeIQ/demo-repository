from pydantic import BaseModel
from typing import Dict, List, Any


class LoginRequest(BaseModel):
    username: str
    password: str


class RegisterRequest(BaseModel):
    name: str
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class VerifyResponse(BaseModel):
    valid: bool
    username: str


class DetectionResponse(BaseModel):
    predictions: List[Dict[str, Any]]
    counts: Dict[str, int]
    image: str

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.api.deps import get_current_user_id
from app.services import profile_service

router = APIRouter(prefix="/api/profile", tags=["profile"])


class ProfileUpdate(BaseModel):
    name: str | None = None
    email: str | None = None
    avatar_url: str | None = None


def _serialize(user) -> dict:
    return {
        "id": user.id,
        "username": user.username,
        "name": user.name,
        "email": user.email,
        "avatar_url": user.avatar_url,
        "created_at": user.created_at.isoformat() if user.created_at else None,
        "updated_at": user.updated_at.isoformat() if user.updated_at else None,
    }


@router.get("")
def get_profile(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    user = profile_service.get_profile(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return _serialize(user)


@router.put("")
def update_profile(
    payload: ProfileUpdate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    user = profile_service.update_profile(db, user_id, payload.name, payload.email, payload.avatar_url)
    return _serialize(user)


@router.get("/summary")
def get_summary(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    return profile_service.get_summary(db, user_id)

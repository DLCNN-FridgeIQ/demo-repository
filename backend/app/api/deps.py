from fastapi import Depends, HTTPException, Header
from sqlalchemy.orm import Session
from jose import JWTError
from app.core.security import decode_token
from app.database import get_db
from app.models.db_models import User


def get_current_user_id(
    authorization: str | None = Header(default=None),
    db: Session = Depends(get_db),
) -> int:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.removeprefix("Bearer ")
    try:
        username = decode_token(token)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user.id

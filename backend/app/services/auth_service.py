from sqlalchemy.orm import Session
from app.core.security import hash_password, verify_password, create_token
from app.models.db_models import User

USERS: dict[str, str] = {
    "admin": hash_password("admin123"),
}


def authenticate_user(username: str, password: str) -> str | None:
    hashed = USERS.get(username)
    if not hashed or not verify_password(password, hashed):
        return None
    return create_token(username)


def register_user(db: Session, username: str, password: str, name: str) -> str | None:
    """Add a new user and create their DB record. Returns JWT, or None if username taken."""
    if username in USERS:
        return None
    USERS[username] = hash_password(password)
    user = User(username=username, name=name, email="")
    db.add(user)
    db.commit()
    return create_token(username)

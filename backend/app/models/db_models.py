from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey, JSON
from app.database import Base


def _now():
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id         = Column(Integer, primary_key=True, index=True)
    username   = Column(String, unique=True, index=True, nullable=False)
    name       = Column(String, nullable=False)
    email      = Column(String, nullable=False)
    avatar_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=_now)
    updated_at = Column(DateTime, default=_now)


class FridgeScan(Base):
    __tablename__ = "fridge_scans"

    id                   = Column(Integer, primary_key=True, index=True)
    user_id              = Column(Integer, ForeignKey("users.id"), nullable=False)
    detected_items       = Column(JSON, nullable=False, default=list)
    total_items_detected = Column(Integer, default=0)
    average_confidence   = Column(Float, default=0.0)
    thumbnail            = Column(Text, nullable=True)
    created_at           = Column(DateTime, default=_now)


class GroceryList(Base):
    __tablename__ = "grocery_lists"

    id                   = Column(Integer, primary_key=True, index=True)
    user_id              = Column(Integer, ForeignKey("users.id"), nullable=False)
    title                = Column(String, nullable=False)
    items                = Column(JSON, nullable=False, default=list)
    estimated_total_cost = Column(Float, default=0.0)
    cheapest_store       = Column(String, nullable=True)
    status               = Column(String, default="Generated")
    created_at           = Column(DateTime, default=_now)
    updated_at           = Column(DateTime, default=_now)

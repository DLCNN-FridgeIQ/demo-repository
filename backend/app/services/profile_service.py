from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.db_models import User, FridgeScan, GroceryList


def get_or_create_default_user(db: Session) -> User:
    """Ensure the seeded admin user exists in the DB (called once at startup)."""
    user = db.query(User).filter(User.username == "admin").first()
    if not user:
        user = User(username="admin", name="Demo User", email="demo@fridgiq.ai")
        db.add(user)
        db.commit()
        db.refresh(user)
    return user


def get_profile(db: Session, user_id: int) -> User:
    return db.query(User).filter(User.id == user_id).first()


def update_profile(
    db: Session, user_id: int, name: str | None, email: str | None, avatar_url: str | None
) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if name is not None:
        user.name = name
    if email is not None:
        user.email = email
    if avatar_url is not None:
        user.avatar_url = avatar_url
    user.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(user)
    return user


def get_summary(db: Session, user_id: int) -> dict:
    user = db.query(User).filter(User.id == user_id).first()
    scans = db.query(FridgeScan).filter(FridgeScan.user_id == user_id).all()
    lists = db.query(GroceryList).filter(GroceryList.user_id == user_id).all()

    total_detected = sum(s.total_items_detected for s in scans)
    total_spend = sum(gl.estimated_total_cost for gl in lists)

    item_counts: dict[str, int] = {}
    for scan in scans:
        for item in scan.detected_items or []:
            name = item.get("name", "unknown")
            item_counts[name] = item_counts.get(name, 0) + 1
    most_common = sorted(item_counts.items(), key=lambda x: x[1], reverse=True)[:5]

    store_counts: dict[str, int] = {}
    for gl in lists:
        if gl.cheapest_store:
            store_counts[gl.cheapest_store] = store_counts.get(gl.cheapest_store, 0) + 1

    recent: list[dict] = []
    for s in sorted(scans, key=lambda x: x.created_at, reverse=True)[:3]:
        recent.append({"type": "scan", "date": s.created_at.isoformat(), "description": f"Fridge scan — {s.total_items_detected} items detected"})
    for gl in sorted(lists, key=lambda x: x.created_at, reverse=True)[:3]:
        recent.append({"type": "grocery_list", "date": gl.created_at.isoformat(), "description": f"Grocery list — {gl.title}"})
    recent.sort(key=lambda x: x["date"], reverse=True)

    return {
        "total_scans": len(scans),
        "total_grocery_lists": len(lists),
        "total_detected_items": total_detected,
        "estimated_total_spend": round(total_spend, 2),
        "most_common_items": [{"name": k, "count": v} for k, v in most_common],
        "cheapest_store_count": store_counts,
        "recent_activity": recent[:5],
        "member_since": user.created_at.isoformat() if user and user.created_at else None,
    }

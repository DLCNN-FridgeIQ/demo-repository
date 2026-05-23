from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.db_models import GroceryList


def save_grocery_list(
    db: Session,
    user_id: int,
    title: str,
    items: list,
    estimated_total_cost: float,
    cheapest_store: str | None = None,
) -> GroceryList:
    gl = GroceryList(
        user_id=user_id,
        title=title,
        items=items,
        estimated_total_cost=estimated_total_cost,
        cheapest_store=cheapest_store,
        status="Generated",
    )
    db.add(gl)
    db.commit()
    db.refresh(gl)
    return gl


def get_grocery_lists(db: Session, user_id: int) -> list[GroceryList]:
    return (
        db.query(GroceryList)
        .filter(GroceryList.user_id == user_id)
        .order_by(GroceryList.created_at.desc())
        .all()
    )


def get_grocery_list(db: Session, user_id: int, list_id: int) -> GroceryList | None:
    return db.query(GroceryList).filter(
        GroceryList.id == list_id,
        GroceryList.user_id == user_id,
    ).first()


def update_grocery_list(
    db: Session, user_id: int, list_id: int, title: str | None = None, status: str | None = None
) -> GroceryList | None:
    gl = get_grocery_list(db, user_id, list_id)
    if not gl:
        return None
    if title is not None:
        gl.title = title
    if status is not None:
        gl.status = status
    gl.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(gl)
    return gl


def delete_grocery_list(db: Session, user_id: int, list_id: int) -> bool:
    gl = get_grocery_list(db, user_id, list_id)
    if not gl:
        return False
    db.delete(gl)
    db.commit()
    return True

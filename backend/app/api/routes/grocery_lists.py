from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.api.deps import get_current_user_id
from app.services import grocery_service

router = APIRouter(prefix="/api/profile/grocery-lists", tags=["grocery-lists"])


class GroceryListCreate(BaseModel):
    title: str
    items: list
    estimated_total_cost: float
    cheapest_store: str | None = None


class GroceryListUpdate(BaseModel):
    title: str | None = None
    status: str | None = None


def _serialize(gl) -> dict:
    return {
        "id": gl.id,
        "title": gl.title,
        "items": gl.items,
        "estimated_total_cost": gl.estimated_total_cost,
        "cheapest_store": gl.cheapest_store,
        "status": gl.status,
        "created_at": gl.created_at.isoformat() if gl.created_at else None,
        "updated_at": gl.updated_at.isoformat() if gl.updated_at else None,
    }


@router.get("")
def list_grocery_lists(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    return [_serialize(gl) for gl in grocery_service.get_grocery_lists(db, user_id)]


@router.get("/{list_id}")
def get_grocery_list(
    list_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    gl = grocery_service.get_grocery_list(db, user_id, list_id)
    if not gl:
        raise HTTPException(status_code=404, detail="Grocery list not found")
    return _serialize(gl)


@router.post("", status_code=201)
def create_grocery_list(
    payload: GroceryListCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    gl = grocery_service.save_grocery_list(
        db,
        user_id=user_id,
        title=payload.title,
        items=payload.items,
        estimated_total_cost=payload.estimated_total_cost,
        cheapest_store=payload.cheapest_store,
    )
    return _serialize(gl)


@router.put("/{list_id}")
def update_grocery_list(
    list_id: int,
    payload: GroceryListUpdate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    gl = grocery_service.update_grocery_list(db, user_id, list_id, title=payload.title, status=payload.status)
    if not gl:
        raise HTTPException(status_code=404, detail="Grocery list not found")
    return _serialize(gl)


@router.delete("/{list_id}", status_code=204)
def delete_grocery_list(
    list_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    if not grocery_service.delete_grocery_list(db, user_id, list_id):
        raise HTTPException(status_code=404, detail="Grocery list not found")

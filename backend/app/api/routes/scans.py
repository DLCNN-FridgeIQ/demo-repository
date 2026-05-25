from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.api.deps import get_current_user_id
from app.services import scan_service

router = APIRouter(prefix="/api/profile/scans", tags=["scans"])


def _serialize(s) -> dict:
    return {
        "id": s.id,
        "detected_items": s.detected_items,
        "total_items_detected": s.total_items_detected,
        "average_confidence": s.average_confidence,
        "thumbnail": s.thumbnail,
        "created_at": s.created_at.isoformat() if s.created_at else None,
    }


@router.get("")
def list_scans(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    return [_serialize(s) for s in scan_service.get_scans(db, user_id)]


@router.get("/{scan_id}")
def get_scan(
    scan_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    scan = scan_service.get_scan(db, user_id, scan_id)
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    return _serialize(scan)


@router.delete("/{scan_id}", status_code=204)
def delete_scan(
    scan_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    if not scan_service.delete_scan(db, user_id, scan_id):
        raise HTTPException(status_code=404, detail="Scan not found")

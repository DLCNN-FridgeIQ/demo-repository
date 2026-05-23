from sqlalchemy.orm import Session
from app.models.db_models import FridgeScan


def save_scan(db: Session, user_id: int, detected_items: list, thumbnail: str | None = None) -> FridgeScan:
    confidences = [item.get("confidence", 0) for item in detected_items]
    avg_conf = round(sum(confidences) / len(confidences), 4) if confidences else 0.0

    scan = FridgeScan(
        user_id=user_id,
        detected_items=detected_items,
        total_items_detected=len(detected_items),
        average_confidence=avg_conf,
        thumbnail=thumbnail,
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)
    return scan


def get_scans(db: Session, user_id: int) -> list[FridgeScan]:
    return (
        db.query(FridgeScan)
        .filter(FridgeScan.user_id == user_id)
        .order_by(FridgeScan.created_at.desc())
        .all()
    )


def get_scan(db: Session, user_id: int, scan_id: int) -> FridgeScan | None:
    return db.query(FridgeScan).filter(
        FridgeScan.id == scan_id,
        FridgeScan.user_id == user_id,
    ).first()


def delete_scan(db: Session, user_id: int, scan_id: int) -> bool:
    scan = get_scan(db, user_id, scan_id)
    if not scan:
        return False
    db.delete(scan)
    db.commit()
    return True

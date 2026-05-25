import io
import json
import base64
import traceback
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from PIL import Image
from app.services.detection_service import run_detection, get_model
from app.services.scan_service import save_scan
from app.database import get_db
from app.api.deps import get_current_user_id

router = APIRouter(tags=["detection"])


def _make_thumbnail(image_bytes: bytes) -> str | None:
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        img.thumbnail((200, 200))
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=50)
        return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")
    except Exception:
        return None


@router.post("/detect")
def detect_objects(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    model, model_error = get_model()
    if model is None:
        detail = "YOLOv5 model was not loaded correctly on the server."
        if model_error:
            detail += f"\n\nStartup traceback:\n{model_error}"
        raise HTTPException(status_code=500, detail=detail)

    try:
        contents = file.file.read()
        result = run_detection(contents)

        safe_predictions = json.loads(json.dumps(result["predictions"], default=float))

        thumbnail = _make_thumbnail(contents)
        save_scan(db, user_id=user_id, detected_items=safe_predictions, thumbnail=thumbnail)

        return result
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")

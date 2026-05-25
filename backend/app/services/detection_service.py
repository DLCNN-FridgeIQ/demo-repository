import io
import base64
import traceback
import torch
from PIL import Image
from app.data.food_database import lookup_item

_model = None
_model_error: str | None = None


def load_model(path: str) -> None:
    global _model, _model_error
    try:
        print("Loading YOLOv5 custom model...")
        _model = torch.hub.load("ultralytics/yolov5", "custom", path=path, force_reload=False)
        print("Model loaded successfully!")
    except Exception:
        _model_error = traceback.format_exc()
        print("--- ERROR LOADING MODEL ---")
        print(_model_error)
        _model = None


def get_model():
    return _model, _model_error


def run_detection(image_bytes: bytes) -> dict:
    model, model_error = get_model()

    if model is None:
        raise RuntimeError(f"Model not loaded.\n{model_error or ''}")

    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    results = model(image)
    predictions = results.pandas().xyxy[0].to_dict(orient="records")
    results.render()

    if hasattr(results, "ims") and results.ims:
        annotated = results.ims[0]
    elif hasattr(results, "imgs") and results.imgs:
        annotated = results.imgs[0]
    else:
        raise AttributeError("No annotated image found in YOLOv5 results.")

    buffered = io.BytesIO()
    Image.fromarray(annotated).save(buffered, format="JPEG")
    img_b64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    counts: dict[str, int] = {}
    for pred in predictions:
        label = pred["name"]
        counts[label] = counts.get(label, 0) + 1

    prices: dict[str, dict] = {}
    for label in counts:
        item = lookup_item(label)
        if item:
            prices[label] = dict(item)
        else:
            prices[label] = {
                "id": None,
                "name": label,
                "category": "Other",
                "coles": None,
                "woolworths": None,
                "aldi": None,
            }

    return {
        "predictions": predictions,
        "counts": counts,
        "prices": prices,
        "image": f"data:image/jpeg;base64,{img_b64}",
    }

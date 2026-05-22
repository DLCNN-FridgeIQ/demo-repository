import io
import uvicorn
import base64
import torch
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

app = FastAPI()

# 1. Enable CORS so the React app (running on port 5173) can query this server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://172.16.139.213:5173", "http://172.16.139.217:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_error = None
try:
    print("Loading YOLOv5 custom model...")
    model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt', force_reload=False)
    print("Model loaded successfully!")
except Exception as e:
    import traceback
    model_error = traceback.format_exc()
    print("--- ERROR LOADING MODEL AT STARTUP ---")
    print(model_error)
    print("--------------------------------------")
    model = None

import traceback

@app.post("/detect")
async def detect_objects(file: UploadFile = File(...)):
    if model is None:
        err_msg = "YOLOv5 model was not loaded correctly on the server."
        if model_error:
            err_msg += f"\n\nStartup Exception Traceback:\n{model_error}"
        raise HTTPException(status_code=500, detail=err_msg)
        
    try:
        # Read the uploaded image bytes
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Run YOLOv5 Inference
        results = model(image)
        
        # Parse prediction values (coordinates, labels, confidence scores)
        predictions = results.pandas().xyxy[0].to_dict(orient="records")
        
        # Render bounding boxes onto the image in-place
        results.render()
        
        # Robustly handle results.ims vs results.imgs depending on YOLOv5 version installed
        if hasattr(results, 'ims') and results.ims is not None and len(results.ims) > 0:
            annotated_img_array = results.ims[0]
        elif hasattr(results, 'imgs') and results.imgs is not None and len(results.imgs) > 0:
            annotated_img_array = results.imgs[0]
        else:
            raise AttributeError("YOLOv5 detections object has neither a valid 'ims' nor 'imgs' attribute.")
            
        annotated_image = Image.fromarray(annotated_img_array)
        
        # Convert the annotated PIL image into a Base64 string to send to the browser
        buffered = io.BytesIO()
        annotated_image.save(buffered, format="JPEG")
        img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        # Calculate item frequencies (e.g. { "tomato": 3, "milk": 1 })
        counts = {}
        for pred in predictions:
            label = pred['name']
            counts[label] = counts.get(label, 0) + 1
            
        return {
            "predictions": predictions,
            "counts": counts,
            "image": f"data:image/jpeg;base64,{img_base64}"
        }
    except Exception as e:
        print("\n--- ERROR DURING INFERENCE ---")
        traceback.print_exc()
        print("------------------------------\n")
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

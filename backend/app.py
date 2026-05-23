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

# 2. Database of standard grocery items and supermarket price ranges
PRICING_DATABASE = {
    "apple": {"name": "apple (Loose Royal Gala, each)", "coles": "$1.26", "woolworths": "$1.26", "aldi": "$1.15"},
    "asparagus": {"name": "asparagus (Fresh bunch)", "coles": "$4.70", "woolworths": "$4.50", "aldi": "$3.99"},
    "avocado": {"name": "avocado (Hass, each)", "coles": "$2.20", "woolworths": "$2.20", "aldi": "$1.50"},
    "banana": {"name": "banana (Cavendish, each)", "coles": "$0.85", "woolworths": "$0.85", "aldi": "$0.72"},
    "bean": {"name": "bean (Green Beans, 250g bag)", "coles": "$2.20", "woolworths": "$2.10", "aldi": "$1.99"},
    "beans": {"name": "beans (Green Beans, 250g bag)", "coles": "$2.20", "woolworths": "$2.10", "aldi": "$1.99"},
    "beef": {"name": "beef (Regular Mince, 500g)", "coles": "$7.00", "woolworths": "$7.00", "aldi": "$6.49"},
    "bell pepper": {"name": "bell pepper (Red Capsicum, each)", "coles": "$1.74", "woolworths": "$1.70", "aldi": "$1.49"},
    "blueberries": {"name": "blueberries (125g punnet)", "coles": "$7.50", "woolworths": "$7.50", "aldi": "$6.99"},
    "bread": {"name": "bread (White Soft Toast, 700g)", "coles": "$2.40", "woolworths": "$2.40", "aldi": "$2.19"},
    "broccoli": {"name": "broccoli (Medium head, each)", "coles": "$1.70", "woolworths": "$1.65", "aldi": "$1.45"},
    "butter": {"name": "butter (Salted Block, 250g)", "coles": "$4.20", "woolworths": "$4.20", "aldi": "$3.89"},
    "cabbage": {"name": "cabbage (Green Half)", "coles": "$2.50", "woolworths": "$2.50", "aldi": "$2.19"},
    "carrot": {"name": "carrot (Loose, each)", "coles": "$0.35", "woolworths": "$0.35", "aldi": "$0.29"},
    "cauliflower": {"name": "cauliflower (Whole head)", "coles": "$4.50", "woolworths": "$4.50", "aldi": "$3.99"},
    "cheese": {"name": "cheese (Cheddar Block, 500g)", "coles": "$7.50", "woolworths": "$7.50", "aldi": "$6.49"},
    "chicken breast": {"name": "chicken breast (RSPCA Breast Fillet, 1kg)", "coles": "$13.50", "woolworths": "$13.50", "aldi": "$11.99"},
    "chicken": {"name": "chicken (RSPCA Breast Fillet, 1kg)", "coles": "$13.50", "woolworths": "$13.50", "aldi": "$11.99"},
    "chocolate": {"name": "chocolate (Dairy Milk Block, 180g)", "coles": "$6.00", "woolworths": "$6.00", "aldi": "$4.99"},
    "corn": {"name": "corn (Sweet Corn, each)", "coles": "$1.50", "woolworths": "$1.00", "aldi": "$0.90"},
    "cucumber": {"name": "cucumber (Continental, each)", "coles": "$1.80", "woolworths": "$1.80", "aldi": "$1.49"},
    "dill": {"name": "dill (Fresh bunch)", "coles": "$3.20", "woolworths": "$3.20", "aldi": "$2.69"},
    "egg": {"name": "egg (Free Range Large, 12-pack)", "coles": "$5.50", "woolworths": "$5.50", "aldi": "$4.99"},
    "eggplant": {"name": "eggplant (Each)", "coles": "$2.90", "woolworths": "$2.90", "aldi": "$2.49"},
    "fish": {"name": "fish (Frozen Basa Fillets, 1kg)", "coles": "$10.00", "woolworths": "$10.00", "aldi": "$8.99"},
    "flour": {"name": "flour (Plain White, 1kg)", "coles": "$1.50", "woolworths": "$1.50", "aldi": "$1.25"},
    "garlic": {"name": "garlic (Loose, approx 60g head)", "coles": "$2.10", "woolworths": "$2.10", "aldi": "$1.79"},
    "ginger": {"name": "ginger (Loose, approx 130g piece)", "coles": "$4.29", "woolworths": "$4.20", "aldi": "$3.50"},
    "grape": {"name": "grape (White Seedless, 500g pack)", "coles": "$4.50", "woolworths": "$4.50", "aldi": "$3.99"},
    "green bell pepper": {"name": "green bell pepper (Green Capsicum, each)", "coles": "$1.60", "woolworths": "$1.60", "aldi": "$1.39"},
    "green chilies": {"name": "green chilies (Fresh, per 100g)", "coles": "$2.50", "woolworths": "$2.50", "aldi": "$2.10"},
    "ham": {"name": "ham (Sliced Deli Leg Ham, 200g)", "coles": "$4.00", "woolworths": "$4.00", "aldi": "$3.29"},
    "jam": {"name": "jam (Strawberry, 500g)", "coles": "$2.80", "woolworths": "$2.80", "aldi": "$2.19"},
    "kiwi": {"name": "kiwi (Green Kiwifruit, each)", "coles": "$1.00", "woolworths": "$1.00", "aldi": "$0.85"},
    "leek": {"name": "leek (Each)", "coles": "$2.50", "woolworths": "$2.50", "aldi": "$1.99"},
    "lemon": {"name": "lemon (Each)", "coles": "$1.50", "woolworths": "$1.50", "aldi": "$1.10"},
    "lettuce": {"name": "lettuce (Iceberg, each)", "coles": "$2.90", "woolworths": "$2.90", "aldi": "$2.29"},
    "lime": {"name": "lime (Each)", "coles": "$1.20", "woolworths": "$1.20", "aldi": "$0.95"},
    "mango": {"name": "mango (Each)", "coles": "$3.50", "woolworths": "$3.50", "aldi": "$2.99"},
    "milk": {"name": "milk (Full Cream, 2L)", "coles": "$3.10", "woolworths": "$3.10", "aldi": "$2.99"},
    "mushrooms": {"name": "mushrooms (White Button, 200g punnet)", "coles": "$3.50", "woolworths": "$3.50", "aldi": "$2.99"},
    "olives": {"name": "olives (Pitted Green Jar, 300g)", "coles": "$3.00", "woolworths": "$3.00", "aldi": "$2.29"},
    "onion": {"name": "onion (Brown Loose, each)", "coles": "$0.45", "woolworths": "$0.45", "aldi": "$0.38"},
    "orange": {"name": "orange (Navel Loose, each)", "coles": "$0.95", "woolworths": "$0.95", "aldi": "$0.80"},
    "parsley": {"name": "parsley (Fresh bunch)", "coles": "$3.20", "woolworths": "$3.20", "aldi": "$2.69"},
    "pea": {"name": "pea (Frozen Green Peas, 1kg)", "coles": "$3.00", "woolworths": "$3.00", "aldi": "$2.59"},
    "peach": {"name": "peach (Loose, each)", "coles": "$1.50", "woolworths": "$1.50", "aldi": "$1.20"},
    "pear": {"name": "pear (Packham Loose, each)", "coles": "$1.02", "woolworths": "$1.02", "aldi": "$0.85"},
    "pineapple": {"name": "pineapple (Whole, each)", "coles": "$4.50", "woolworths": "$4.50", "aldi": "$3.99"},
    "potato": {"name": "potato (Brushed Loose, each)", "coles": "$0.75", "woolworths": "$0.75", "aldi": "$0.60"},
    "radish": {"name": "radish (Fresh bunch)", "coles": "$2.50", "woolworths": "$2.50", "aldi": "$1.99"},
    "red bell pepper": {"name": "red bell pepper (Red Capsicum, each)", "coles": "$1.74", "woolworths": "$1.70", "aldi": "$1.49"},
    "sausage": {"name": "sausage (Thin Beef, 500g pack)", "coles": "$5.50", "woolworths": "$5.50", "aldi": "$4.49"},
    "spinach": {"name": "spinach (Baby Spinach, 280g bag)", "coles": "$4.50", "woolworths": "$4.50", "aldi": "$3.79"},
    "strawberry": {"name": "strawberry (250g punnet)", "coles": "$3.50", "woolworths": "$3.50", "aldi": "$2.99"},
    "sweet potato": {"name": "sweet potato (Gold Loose, approx 500g)", "coles": "$2.55", "woolworths": "$2.50", "aldi": "$2.10"},
    "tomato": {"name": "tomato (Roma Loose, each)", "coles": "$0.90", "woolworths": "$0.90", "aldi": "$0.75"},
    "watermelon": {"name": "watermelon (Seedless Quarter, per kg price)", "coles": "$1.90", "woolworths": "$1.90", "aldi": "$1.50"},
    "yellow bell pepper": {"name": "yellow bell pepper (Yellow Capsicum, each)", "coles": "$1.85", "woolworths": "$1.80", "aldi": "$1.59"},
    "yogurt": {"name": "yogurt (Greek Style Plain, 1kg)", "coles": "$5.50", "woolworths": "$5.50", "aldi": "$4.69"},
    "zucchini": {"name": "zucchini (Green Loose, each)", "coles": "$1.38", "woolworths": "$1.35", "aldi": "$1.10"}
}

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
            
        # Match each detected item label to our 56 pricing database items
        detected_prices = {}
        for label in counts.keys():
            normalized = label.lower().strip()
            matched = False
            for db_key, price_info in PRICING_DATABASE.items():
                if db_key in normalized or normalized in db_key:
                    detected_prices[label] = price_info
                    matched = True
                    break
            if not matched:
                detected_prices[label] = {
                    "name": label,
                    "coles": "N/A",
                    "woolworths": "N/A",
                    "aldi": "N/A"
                }
            
        return {
            "predictions": predictions,
            "counts": counts,
            "prices": detected_prices,
            "image": f"data:image/jpeg;base64,{img_base64}"
        }
    except Exception as e:
        print("\n--- ERROR DURING INFERENCE ---")
        traceback.print_exc()
        print("------------------------------\n")
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

# FridgIQ - Smart Fridge & Supermarket Price Comparison

FridgIQ is a web application that uses a custom-trained YOLOv5 object detection model to identify food items in your fridge and compare prices across Coles, Woolworths, and Aldi.

## Prerequisites

Ensure you have the following installed:
- Python 3
- Node.js

---

## Setup and Run Instructions

### 1. Backend Setup

Open a terminal and navigate to the backend folder:
```bash
cd backend
```

Create and activate a Python virtual environment:
*   **macOS / Linux:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
*   **Windows:**
    ```bash
    python -m venv venv
    # Command Prompt
    venv\Scripts\activate.bat
    # PowerShell
    venv\Scripts\Activate.ps1
    ```

Install the dependencies:
```bash
pip install -r requirements.txt
```

Start the backend server:
```bash
python run.py
```

---

### 2. Frontend Setup

Open a new terminal window and navigate to the frontend folder:
```bash
cd frontend
```

Install the Node.js packages:
```bash
npm install
```

Start the local development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to use the application.

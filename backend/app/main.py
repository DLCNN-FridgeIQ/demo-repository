from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import auth, detection, profile, grocery_lists, scans
from app.services.detection_service import load_model
from app.database import init_db, SessionLocal
from app.services.profile_service import get_or_create_default_user


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    db = SessionLocal()
    try:
        get_or_create_default_user(db)
    finally:
        db.close()
    load_model(settings.MODEL_PATH)
    yield


app = FastAPI(title="FridgIQ API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(detection.router)
app.include_router(profile.router)
app.include_router(grocery_lists.router)
app.include_router(scans.router)


@app.get("/health", tags=["health"])
async def health():
    return {"status": "ok"}

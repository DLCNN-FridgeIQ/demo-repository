class Settings:
    SECRET_KEY: str = "fridgiq-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    TOKEN_EXPIRE_HOURS: int = 24
    MODEL_PATH: str = "best.pt"
    ALLOWED_ORIGINS: list = ["*"]
    DATABASE_URL: str = "sqlite:///./fridgiq.db"

settings = Settings()

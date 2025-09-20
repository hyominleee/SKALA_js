# app/main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app import models, schemas, crud
from app.database import engine, SessionLocal, Base

# --- DB 테이블 생성 ---
Base.metadata.create_all(bind=engine)

# --- FastAPI 앱 ---
app = FastAPI(title="shop_app_cart")

# --- CORS (Vite 프론트 허용) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],   # OPTIONS 포함 모든 메서드 허용
    allow_headers=["*"],
)

# --- DB 세션 의존성 ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ======================
# Users
# ======================
@app.get("/users", response_model=list[schemas.User])
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@app.post("/users", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)

# ======================
# Products
# ======================
@app.get("/products", response_model=list[schemas.Product])
def read_products(db: Session = Depends(get_db)):
    return crud.get_products(db)

@app.post("/products", response_model=schemas.Product, status_code=status.HTTP_201_CREATED)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db, product)

# ======================
# Cart
# ======================
@app.get("/cart/{user_id}", response_model=list[schemas.Cart])
def read_cart(user_id: str, db: Session = Depends(get_db)):
    return crud.get_cart_items(db, user_id)

@app.post("/cart", response_model=schemas.Cart, status_code=status.HTTP_201_CREATED)
def add_cart_item(cart_item: schemas.CartCreate, db: Session = Depends(get_db)):
    return crud.add_to_cart(db, cart_item)

# --- Health check ---
@app.get("/healthz")
def health():
    return {"status": "ok"}

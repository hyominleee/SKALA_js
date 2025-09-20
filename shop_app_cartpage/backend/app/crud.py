# app/crud.py
from sqlalchemy.orm import Session
import app.models as models
import app.schemas as schemas

# ------------------------
# Users
# ------------------------
def get_users(db: Session):
    return db.query(models.User).all()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# ------------------------
# Products
# ------------------------
def get_products(db: Session):
    return db.query(models.Product).all()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


# ------------------------
# Cart
# ------------------------
def get_cart_items(db: Session, user_id: str):
    return db.query(models.Cart).filter(models.Cart.user_id == user_id).all()

def add_to_cart(db: Session, cart_item: schemas.CartCreate):
    db_item = models.Cart(**cart_item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

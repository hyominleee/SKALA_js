from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# ------------------------
# User
# ------------------------
class UserBase(BaseModel):
    user_id: str
    name: str
    phone: str
    membership: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    created_at: Optional[datetime]

    class Config:
        from_attributes = True   


# ------------------------
# Product
# ------------------------
class ProductBase(BaseModel):
    name: str
    price: int
    image_url: Optional[str]
    stock: int
    

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    product_id: int
    created_at: Optional[datetime]   

    class Config:
        from_attributes = True  


# ------------------------
# Cart
# ------------------------
class CartBase(BaseModel):
    user_id: str
    product_id: int
    quantity: int

class CartCreate(CartBase):
    pass

class Cart(CartBase):
    cart_id: int
    added_at: Optional[datetime]

    class Config:
        from_attributes = True   

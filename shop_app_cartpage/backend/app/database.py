# app/database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite 데이터베이스 URL
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "shopping.db")

SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

# SQLite는 check_same_thread 옵션을 False로 해야 여러 스레드에서 안전하게 접근 가능
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# 세션 생성
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base 클래스 (모든 모델이 이걸 상속받음)
Base = declarative_base()

from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

DB_URL = os.getenv("AIVEN_SERVICE_URL")

engine = create_engine(
    DB_URL,
    connect_args={
        'ssl': {
            'sslmode': 'require'
        }
    }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)


class UserResponse(BaseModel):
    email: str
    username: str
    password: str

    class Config:
        from_attributes = True
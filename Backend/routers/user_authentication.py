from fastapi import APIRouter, Depends, HTTPException
from models.user_model import User, UserResponse, engine, SessionLocal, Base
from sqlalchemy.orm import Session

router = APIRouter()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get('/login/{username}', response_model=UserResponse)
def get_use(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post('/register')
def register_user(user: UserResponse, db: Session = Depends(get_db)):
    exisiting_user = db.query(User).filter(User.username == user.username).first()
    if exisiting_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    new_user = User(
        email=user.email,
        username=user.username,
        password=user.password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    db.close()
    return user
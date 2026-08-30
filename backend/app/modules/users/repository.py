import uuid

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.modules.users.model import User


def get_user_by_id(
    db: Session,
    user_id: uuid.UUID,
) -> User | None:
    return db.scalar(
        select(User).where(User.id == user_id)
    )


def get_user_by_email(
    db: Session,
    email: str,
) -> User | None:
    return db.scalar(
        select(User).where(User.email == email)
    )


def create_user(
    db: Session,
    email: str,
    password_hash: str,
) -> User:
    user = User(
        email=email,
        password_hash=password_hash,
    )

    db.add(user)
    db.flush()
    db.refresh(user)

    return user
from sqlalchemy.orm import Session

from app.core.security import hash_password, verify_password
from app.modules.users.repository import (
    create_user,
    get_user_by_email,
)


def register_user(
    db: Session,
    email: str,
    password: str,
):
    email = email.lower().strip()

    existing_user = get_user_by_email(db, email)

    if existing_user:
        raise ValueError("Email is already registered")

    password_hash = hash_password(password)

    return create_user(
        db,
        email,
        password_hash,
    )


def authenticate_user(
    db: Session,
    email: str,
    password: str,
):
    email = email.lower().strip()

    user = get_user_by_email(db, email)

    if not user:
        return None

    if not verify_password(password, user.password_hash):
        return None

    return user
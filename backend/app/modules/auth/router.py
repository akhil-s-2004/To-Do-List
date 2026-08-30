from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.security import create_access_token
from app.dependencies.auth import get_current_user
from app.modules.auth.schema import (
    AuthResponse,
    LoginRequest,
    RegisterRequest,
)
from app.modules.auth.service import (
    authenticate_user,
    register_user,
)
from app.modules.users.model import User
from app.modules.users.schema import UserResponse
from app.schemas.response import APIResponse


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=APIResponse[AuthResponse],
    status_code=status.HTTP_201_CREATED,
)
def register(
    data: RegisterRequest,
    response: Response,
    db: Session = Depends(get_db),
):
    try:
        user = register_user(
            db,
            data.email,
            data.password,
        )

        db.commit()

    except ValueError as exc:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        )

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already registered",
        )

    token = create_access_token(str(user.id))

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=settings.access_token_expire_minutes * 60,
    )

    return APIResponse(
        status_code=201,
        status_message="Created",
        error_message=None,
        response_data=AuthResponse(
            user=UserResponse.model_validate(user)
        ),
    )


@router.post(
    "/login",
    response_model=APIResponse[AuthResponse],
)
def login(
    data: LoginRequest,
    response: Response,
    db: Session = Depends(get_db),
):
    user = authenticate_user(
        db,
        data.email,
        data.password,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(str(user.id))

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=settings.access_token_expire_minutes * 60,
    )

    return APIResponse(
        status_code=200,
        status_message="Success",
        error_message=None,
        response_data=AuthResponse(
            user=UserResponse.model_validate(user)
        ),
    )


@router.post(
    "/logout",
    response_model=APIResponse[None],
)
def logout(response: Response):
    response.delete_cookie(
        key="access_token",
    )

    return APIResponse(
        status_code=200,
        status_message="Success",
        error_message=None,
        response_data=None,
    )


@router.get(
    "/me",
    response_model=APIResponse[UserResponse],
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return APIResponse(
        status_code=200,
        status_message="Success",
        error_message=None,
        response_data=UserResponse.model_validate(current_user),
    )
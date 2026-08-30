import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.modules.groups.schema import (
    CreateGroupRequest,
    GroupResponse,
    UpdateGroupRequest,
)
from app.modules.groups.service import (
    create_user_group,
    get_user_group,
    get_user_groups,
    remove_user_group,
    update_user_group,
)
from app.modules.users.model import User
from app.schemas.response import APIResponse


router = APIRouter(
    prefix="/groups",
    tags=["Groups"],
)


@router.post(
    "",
    response_model=APIResponse[GroupResponse],
    status_code=status.HTTP_201_CREATED,
)
def create_group(
    data: CreateGroupRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    group = create_user_group(
        db,
        current_user.id,
        data.name,
    )

    db.commit()

    return APIResponse(
        status_code=201,
        status_message="Created",
        error_message=None,
        response_data=GroupResponse.model_validate(group),
    )


@router.get(
    "",
    response_model=APIResponse[list[GroupResponse]],
)
def get_groups(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    groups = get_user_groups(
        db,
        current_user.id,
    )

    return APIResponse(
        status_code=200,
        status_message="Success",
        error_message=None,
        response_data=[
            GroupResponse.model_validate(group)
            for group in groups
        ],
    )


@router.patch(
    "/{group_id}",
    response_model=APIResponse[GroupResponse],
)
def update_group(
    group_id: uuid.UUID,
    data: UpdateGroupRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    group = get_user_group(
        db,
        current_user.id,
        group_id,
    )

    if not group:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Group not found",
        )

    group = update_user_group(
        db,
        group,
        data.name,
    )

    db.commit()

    return APIResponse(
        status_code=200,
        status_message="Success",
        error_message=None,
        response_data=GroupResponse.model_validate(group),
    )


@router.delete(
    "/{group_id}",
    response_model=APIResponse[None],
)
def delete_group(
    group_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    group = get_user_group(
        db,
        current_user.id,
        group_id,
    )

    if not group:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Group not found",
        )

    remove_user_group(db, group)

    db.commit()

    return APIResponse(
        status_code=200,
        status_message="Success",
        error_message=None,
        response_data=None,
    )
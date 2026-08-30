import uuid
from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.modules.tasks.schema import (
    CreateTaskRequest,
    TaskResponse,
    UpdateTaskRequest,
)
from app.modules.tasks.service import (
    create_user_task,
    get_user_task,
    get_user_tasks,
    remove_completed_tasks,
    remove_user_task,
    update_user_task,
)
from app.modules.users.model import User
from app.schemas.response import APIResponse


router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)


@router.post(
    "",
    response_model=APIResponse[TaskResponse],
    status_code=status.HTTP_201_CREATED,
)
def create_task(
    data: CreateTaskRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        task = create_user_task(
            db,
            current_user.id,
            data.title,
            data.due_date,
            data.group_id,
        )

        db.commit()

    except ValueError as exc:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    return APIResponse(
        status_code=201,
        status_message="Created",
        error_message=None,
        response_data=TaskResponse.model_validate(task),
    )


@router.get(
    "",
    response_model=APIResponse[list[TaskResponse]],
)
def get_tasks(
    status_filter: Literal[
        "all",
        "active",
        "completed",
    ] = Query(
        default="all",
        alias="status",
    ),
    group_id: uuid.UUID | None = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    tasks = get_user_tasks(
        db,
        current_user.id,
        status_filter,
        group_id,
    )

    return APIResponse(
        status_code=200,
        status_message="Success",
        error_message=None,
        response_data=[
            TaskResponse.model_validate(task)
            for task in tasks
        ],
    )


@router.delete(
    "/completed",
    response_model=APIResponse[None],
)
def clear_completed_tasks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    remove_completed_tasks(
        db,
        current_user.id,
    )

    db.commit()

    return APIResponse(
        status_code=200,
        status_message="Success",
        error_message=None,
        response_data=None,
    )


@router.get(
    "/{task_id}",
    response_model=APIResponse[TaskResponse],
)
def get_task(
    task_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = get_user_task(
        db,
        current_user.id,
        task_id,
    )

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found",
        )

    return APIResponse(
        status_code=200,
        status_message="Success",
        error_message=None,
        response_data=TaskResponse.model_validate(task),
    )


@router.patch(
    "/{task_id}",
    response_model=APIResponse[TaskResponse],
)
def update_task(
    task_id: uuid.UUID,
    data: UpdateTaskRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = get_user_task(
        db,
        current_user.id,
        task_id,
    )

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found",
        )

    try:
        task = update_user_task(
            db,
            task,
            data.title,
            data.due_date,
            data.group_id,
            data.completed,
            current_user.id,
        )

        db.commit()

    except ValueError as exc:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    return APIResponse(
        status_code=200,
        status_message="Success",
        error_message=None,
        response_data=TaskResponse.model_validate(task),
    )


@router.delete(
    "/{task_id}",
    response_model=APIResponse[None],
)
def delete_task(
    task_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = get_user_task(
        db,
        current_user.id,
        task_id,
    )

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found",
        )

    remove_user_task(db, task)

    db.commit()

    return APIResponse(
        status_code=200,
        status_message="Success",
        error_message=None,
        response_data=None,
    )
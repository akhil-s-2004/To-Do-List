import uuid

from sqlalchemy.orm import Session

from app.modules.groups.repository import get_group
from app.modules.tasks.model import Task
from app.modules.tasks.repository import (
    create_task,
    delete_completed_tasks,
    delete_task,
    get_task,
    get_tasks,
)


def create_user_task(
    db: Session,
    user_id: uuid.UUID,
    title: str,
    due_date,
    group_id: uuid.UUID | None,
) -> Task:

    if group_id is not None:
        group = get_group(
            db,
            user_id,
            group_id,
        )

        if not group:
            raise ValueError("Group not found")

    return create_task(
        db,
        user_id,
        title.strip(),
        due_date,
        group_id,
    )


def get_user_tasks(
    db: Session,
    user_id: uuid.UUID,
    status_filter: str,
    group_id: uuid.UUID | None,
):
    return get_tasks(
        db,
        user_id,
        status_filter,
        group_id,
    )


def get_user_task(
    db: Session,
    user_id: uuid.UUID,
    task_id: uuid.UUID,
):
    return get_task(
        db,
        user_id,
        task_id,
    )


def update_user_task(
    db: Session,
    task: Task,
    title,
    due_date,
    group_id,
    completed,
    user_id: uuid.UUID,
):

    if title is not None:
        task.title = title.strip()

    if due_date is not None:
        task.due_date = due_date

    if group_id is not None:
        group = get_group(
            db,
            user_id,
            group_id,
        )

        if not group:
            raise ValueError("Group not found")

        task.group_id = group_id

    if completed is not None:
        task.completed = completed

    db.flush()
    db.refresh(task)

    return task


def remove_user_task(
    db: Session,
    task: Task,
):
    delete_task(db, task)


def remove_completed_tasks(
    db: Session,
    user_id: uuid.UUID,
):
    delete_completed_tasks(
        db,
        user_id,
    )
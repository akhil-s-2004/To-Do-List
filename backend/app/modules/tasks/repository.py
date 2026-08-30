import uuid

from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app.modules.tasks.model import Task


def create_task(
    db: Session,
    user_id: uuid.UUID,
    title: str,
    due_date,
    group_id: uuid.UUID | None,
) -> Task:
    task = Task(
        user_id=user_id,
        title=title,
        due_date=due_date,
        group_id=group_id,
        completed=False,
    )

    db.add(task)
    db.flush()
    db.refresh(task)

    return task


def get_tasks(
    db: Session,
    user_id: uuid.UUID,
    status_filter: str,
    group_id: uuid.UUID | None,
) -> list[Task]:

    query = select(Task).where(
        Task.user_id == user_id
    )

    if status_filter == "active":
        query = query.where(Task.completed.is_(False))

    elif status_filter == "completed":
        query = query.where(Task.completed.is_(True))

    if group_id is not None:
        query = query.where(Task.group_id == group_id)

    query = query.order_by(Task.created_at.desc())

    return list(db.scalars(query))


def get_task(
    db: Session,
    user_id: uuid.UUID,
    task_id: uuid.UUID,
) -> Task | None:
    return db.scalar(
        select(Task).where(
            Task.id == task_id,
            Task.user_id == user_id,
        )
    )


def delete_task(
    db: Session,
    task: Task,
):
    db.delete(task)


def delete_completed_tasks(
    db: Session,
    user_id: uuid.UUID,
):
    db.execute(
        delete(Task).where(
            Task.user_id == user_id,
            Task.completed.is_(True),
        )
    )
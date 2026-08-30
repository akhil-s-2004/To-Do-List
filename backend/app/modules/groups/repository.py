import uuid

from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app.modules.groups.model import Group


def create_group(
    db: Session,
    user_id: uuid.UUID,
    name: str,
) -> Group:
    group = Group(
        user_id=user_id,
        name=name,
    )

    db.add(group)
    db.flush()
    db.refresh(group)

    return group


def get_groups(
    db: Session,
    user_id: uuid.UUID,
) -> list[Group]:
    return list(
        db.scalars(
            select(Group)
            .where(Group.user_id == user_id)
            .order_by(Group.created_at)
        )
    )


def get_group(
    db: Session,
    user_id: uuid.UUID,
    group_id: uuid.UUID,
) -> Group | None:
    return db.scalar(
        select(Group).where(
            Group.id == group_id,
            Group.user_id == user_id,
        )
    )


def delete_group(
    db: Session,
    group: Group,
) -> None:
    db.delete(group)
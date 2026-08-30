import uuid

from sqlalchemy.orm import Session

from app.modules.groups.model import Group
from app.modules.groups.repository import (
    create_group,
    delete_group,
    get_group,
    get_groups,
)


def create_user_group(
    db: Session,
    user_id: uuid.UUID,
    name: str,
) -> Group:
    return create_group(
        db,
        user_id,
        name.strip(),
    )


def get_user_groups(
    db: Session,
    user_id: uuid.UUID,
):
    return get_groups(db, user_id)


def get_user_group(
    db: Session,
    user_id: uuid.UUID,
    group_id: uuid.UUID,
):
    return get_group(
        db,
        user_id,
        group_id,
    )


def update_user_group(
    db: Session,
    group: Group,
    name: str,
):
    group.name = name.strip()

    db.flush()
    db.refresh(group)

    return group


def remove_user_group(
    db: Session,
    group: Group,
):
    delete_group(db, group)
import uuid
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field


class CreateTaskRequest(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    due_date: date | None = None
    group_id: uuid.UUID | None = None


class UpdateTaskRequest(BaseModel):
    title: str | None = Field(
        default=None,
        min_length=1,
        max_length=255,
    )
    due_date: date | None = None
    group_id: uuid.UUID | None = None
    completed: bool | None = None


class TaskResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    title: str
    due_date: date | None
    completed: bool
    group_id: uuid.UUID | None
    created_at: datetime
    updated_at: datetime
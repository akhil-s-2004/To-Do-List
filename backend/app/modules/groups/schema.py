import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CreateGroupRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)


class UpdateGroupRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)


class GroupResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    created_at: datetime
    updated_at: datetime
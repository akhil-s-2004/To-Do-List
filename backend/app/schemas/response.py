from typing import Generic, TypeVar

from pydantic import BaseModel


T = TypeVar("T")


class APIResponse(BaseModel, Generic[T]):
    status_code: int
    status_message: str
    error_message: str | None
    response_data: T | None
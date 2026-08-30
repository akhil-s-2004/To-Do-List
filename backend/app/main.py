from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.modules.auth.router import router as auth_router
from app.modules.groups.router import router as groups_router
from app.modules.tasks.router import router as tasks_router


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(HTTPException)
async def http_exception_handler(
    request: Request,
    exc: HTTPException,
):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status_code": exc.status_code,
            "status_message": "Error",
            "error_message": str(exc.detail),
            "response_data": None,
        },
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
):
    return JSONResponse(
        status_code=422,
        content={
            "status_code": 422,
            "status_message": "Validation Error",
            "error_message": "Invalid request data",
            "response_data": exc.errors(),
        },
    )


@app.get("/api/v1/health")
def health_check():
    return {
        "status_code": 200,
        "status_message": "Success",
        "error_message": None,
        "response_data": {
            "message": "API is running",
        },
    }


app.include_router(
    auth_router,
    prefix="/api/v1",
)

app.include_router(
    groups_router,
    prefix="/api/v1",
)

app.include_router(
    tasks_router,
    prefix="/api/v1",
)
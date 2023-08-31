from datetime import datetime

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.requests import Request

from routes import router
from db import db_session_gen
from models import Visit

app = FastAPI()

app.mount("/static", StaticFiles(directory="public/fe/static"), name="static")

app.include_router(router, prefix="")



@app.middleware("http")
async def log_visit(request: Request, call_next):
    ip = request.client.host
    path = request.url.path
    if path == '/':
        visit = Visit(ip=ip, datetime=datetime.now())
        db_gen = db_session_gen();
        db = next(db_gen)
        try:
            db.add(visit)
            db.commit()
        finally:
            db.close()

    response = await call_next(request)
    return response

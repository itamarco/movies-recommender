import logging
from datetime import datetime
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi import Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import HTMLResponse, FileResponse

from utils import load_movies_similarity_models, SimilarityRecommender, load_tvs_similarity_models
from db import db_session_gen
from models import Vote, Visit

app = FastAPI()

app.mount("/static", StaticFiles(directory="public/fe/static"), name="static")


def init_movies_recommender():
    matrix, id_to_idx = load_movies_similarity_models()
    return SimilarityRecommender(matrix, id_to_idx)


def init_tvs_recommender():
    matrix, id_to_idx = load_tvs_similarity_models()
    return SimilarityRecommender(matrix, id_to_idx)


similar_movies = init_movies_recommender()
similar_tvs = init_tvs_recommender()


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


@app.get("/")
def read_root():
    with open("public/fe/index.html") as f:
        html_content = f.read()
    return HTMLResponse(content=html_content)


@app.get("/movies-map")
def get_movies_map():
    file_path = Path("public/movies-map.json")
    return FileResponse(file_path)


@app.get("/tvs-map")
def get_movies_map():
    file_path = Path("public/tvs-map.json")
    return FileResponse(file_path)


@app.get("/recommendation/byUser/{user_id}")
def get_recommendation_by_user(user_id: str, db: Session = Depends(db_session_gen)):
    # Recommendation logic here
    pass


@app.get("/recommendation/byMovie/{movie_id}")
def get_recommendation_by_movie(movie_id: int, db: Session = Depends(db_session_gen)) -> list[int]:
    return similar_movies.get_recommendations_by_id(movie_id)


@app.get("/recommendation/byTv/{tv_id}")
def get_recommendation_by_movie(tv_id: int, db: Session = Depends(db_session_gen)) -> list[int]:
    return similar_tvs.get_recommendations_by_id(tv_id)


class VotePayload(BaseModel):
    vote: int


@app.post("/vote/{movieId}")
def post_vote(movieId: int, payload: VotePayload, db: Session = Depends(db_session_gen)):
    vote = Vote(
        user_id=1,
        movie_id=movieId,
        vote=payload.vote
    )

    merged_vote = db.merge(vote)  # upsert
    db.commit()
    db.refresh(merged_vote)
    return merged_vote


"""
A catch-all route in FastAPI to serve the index.html file for any other requests (supporting SPA routing)
"""


@app.get("/{path:path}")
def read_root(path: str):
    return FileResponse("public/fe/index.html")

from pathlib import Path

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette.responses import FileResponse, HTMLResponse

from db import db_session_gen
from models import Vote
from utils import load_movies_similarity_models, SimilarityRecommender, load_tvs_similarity_models

router = APIRouter()


def init_movies_recommender():
    matrix, id_to_idx = load_movies_similarity_models()
    return SimilarityRecommender(matrix, id_to_idx)


def init_tvs_recommender():
    matrix, id_to_idx = load_tvs_similarity_models()
    return SimilarityRecommender(matrix, id_to_idx)


similar_movies = init_movies_recommender()
similar_tvs = init_tvs_recommender()


@router.get("/")
def read_root():
    with open("public/fe/index.html") as f:
        html_content = f.read()
    return HTMLResponse(content=html_content)


@router.get("/movies-map")
def get_movies_map():
    file_path = Path("public/movies-map.json")
    return FileResponse(file_path)


@router.get("/tvs-map")
def get_movies_map():
    file_path = Path("public/tvs-map.json")
    return FileResponse(file_path)


@router.get("/recommendation/byUser/{user_id}")
def get_recommendation_by_user(user_id: str, db: Session = Depends(db_session_gen)):
    file_path = Path("public/recommended.json")
    return FileResponse(file_path)


@router.get("/recommendation/byMovie/{movie_id}")
def get_recommendation_by_movie(movie_id: int, db: Session = Depends(db_session_gen)) -> list[int]:
    return similar_movies.get_recommendations_by_id(movie_id)


@router.get("/recommendation/byTv/{tv_id}")
def get_recommendation_by_movie(tv_id: int, db: Session = Depends(db_session_gen)) -> list[int]:
    return similar_tvs.get_recommendations_by_id(tv_id)


@router.get("/votes/{user_id}")
def get_votes(user_id: int, db: Session = Depends(db_session_gen)):
    return db.query(Vote).filter_by(user_id=user_id).all()


class VotePayload(BaseModel):
    vote: int


@router.post("/vote/{movie_id}")
def post_vote(movie_id: int, payload: VotePayload, db: Session = Depends(db_session_gen)):
    vote = Vote(
        user_id=200_000,
        movie_id=movie_id,
        vote=payload.vote
    )

    merged_vote = db.merge(vote)  # upsert
    db.commit()
    db.refresh(merged_vote)
    return merged_vote



"""
A catch-all route in FastAPI to serve the index.html file for any other requests (supporting SPA routing)
"""


@router.get("/{path:path}")
def read_root(path: str):
    return FileResponse("public/fe/index.html")

from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi import Depends
from sqlalchemy.orm import Session
from starlette.responses import HTMLResponse, FileResponse

from db import get_db
from utils import SimilarMovies

app = FastAPI()

app.mount("/static", StaticFiles(directory="public/fe/static"), name="static")

similar_movies = SimilarMovies()

@app.get("/")
def read_root():
    with open("public/fe/index.html") as f:
        html_content = f.read()
    return HTMLResponse(content=html_content)


@app.get("/movies-map")
def get_movies_map():
    file_path = Path("public/movies-map.json")
    return FileResponse(file_path)

@app.get("/recommendation/byUser/{user_id}")
def get_recommendation_by_user(user_id: str, db: Session = Depends(get_db)):
    # Recommendation logic here
    pass


@app.get("/recommendation/byMovie/{movie_id}")
def get_recommendation_by_movie(movie_id: int, db: Session = Depends(get_db)) -> list[int]:
    return similar_movies.get_recommendations_by_id(movie_id)


@app.post("/vote")
def post_vote(userId: str, vote: int, movieId: str, db: Session = Depends(get_db)):
    # Voting logic here
    pass


"""
A catch-all route in FastAPI to serve the index.html file for any other requests (supporting SPA routing)
"""
@app.get("/{path:path}")
def read_root(path: str):
    return FileResponse("public/index.html")

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from typing import List

from models import Base

DATABASE_URL = "postgresql://postgres:wizard7@localhost:5432/movies"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(engine)

def get_db():
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()


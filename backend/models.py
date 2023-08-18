from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Seen(Base):
    __tablename__ = 'seen'
    user_id = Column(String, primary_key=True)
    movie_id = Column(Integer, primary_key=True)
    seen = Column(String)

class Vote(Base):
    __tablename__ = 'votes'
    user_id = Column(String, primary_key=True)
    movie_id = Column(Integer, primary_key=True)
    vote = Column(Integer)
    movie = relationship('Movie', back_populates='votes')

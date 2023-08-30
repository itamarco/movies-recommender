from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Seen(Base):
    __tablename__ = 'seen'
    user_id = Column(Integer, primary_key=True)
    movie_id = Column(Integer, primary_key=True)
    seen = Column(String)

class Vote(Base):
    __tablename__ = 'votes'
    user_id = Column(Integer, primary_key=True)
    movie_id = Column(Integer, primary_key=True)
    vote = Column(Integer)

class Visit(Base):
    __tablename__ = 'visits'
    ip = Column(String, primary_key=True)
    datetime = Column(DateTime, primary_key=True)
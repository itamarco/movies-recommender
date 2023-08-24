# Start with a base Python image
FROM python:3.9-slim-buster

# dependencies for psycog2
RUN apt-get update \
    && apt-get -y install libpq-dev gcc 

# Set environment variables for Poetry
ENV POETRY_VERSION=1.2.2 \
    POETRY_HOME="/opt/poetry" \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=false \
    PATH="$POETRY_HOME/bin:$PATH"

# Install Poetry
RUN pip install poetry==${POETRY_VERSION}

# Set the working directory
WORKDIR /app

# Copy models ## TODO
COPY ./models /app/models
# Copy only the pyproject.toml and poetry.lock files to install dependencies
COPY ./pyproject.toml ./poetry.lock /app/

# Install the dependencies without the development dependencies
RUN poetry install --only main

# Copy the app directory into the container
COPY ./app /app

# Copy the public directory for static assets
COPY ./public /app/public

# Expose the port the app runs on
EXPOSE 80

# Command to run the application using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
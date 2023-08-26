#!/bin/bash

# Copy the build directory to the backend's public folder
rm -rf ../backend/public/fe/*
cp -r build/* ../backend/public/fe


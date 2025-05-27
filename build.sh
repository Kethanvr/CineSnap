#!/bin/bash

# Custom build script for Vercel deployment
echo "Starting custom build process..."

# Install dependencies with legacy peer deps
echo "Installing dependencies..."
npm install --legacy-peer-deps --force

# Run the build
echo "Running build..."
npm run build

echo "Build completed successfully!"

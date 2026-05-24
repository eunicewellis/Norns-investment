#!/bin/bash
# Start script for Norns Investment Platform on Railway
# This script installs backend dependencies and starts the server

echo "Starting Norns Investment Platform..."

# Navigate to backend directory
cd backend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
fi

# Start the server
echo "Starting backend server..."
node server.js
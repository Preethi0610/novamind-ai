#!/bin/bash
# Quick start script for the backend

echo "🔧 Setting up backend..."

# Create venv if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt --quiet

# Check for .env
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️  No .env file found!"
    echo "Create one with: cp .env.example .env"
    echo "Then add your OpenAI API key."
    exit 1
fi

# Start server
echo ""
echo "🚀 Starting server on http://localhost:8000"
echo "   Health check: http://localhost:8000/health"
echo "   API docs:     http://localhost:8000/docs"
echo ""
python -m uvicorn app.main:app --reload --port 8000

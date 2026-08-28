"""Tests for the FastAPI chat endpoint."""

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.fixture
def client():
    transport = ASGITransport(app=app)
    return AsyncClient(transport=transport, base_url="http://test")


@pytest.mark.asyncio
async def test_root(client):
    resp = await client.get("/")
    assert resp.status_code == 200
    assert resp.json() == {"message": "AI Chat API is running"}


@pytest.mark.asyncio
async def test_health_check(client):
    resp = await client.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


@pytest.mark.asyncio
async def test_chat_empty_messages(client):
    resp = await client.post("/api/chat", json={"messages": []})
    assert resp.status_code == 422


@pytest.mark.asyncio
async def test_chat_invalid_role(client):
    resp = await client.post(
        "/api/chat",
        json={"messages": [{"role": "hacker", "content": "hello"}]},
    )
    assert resp.status_code == 422


@pytest.mark.asyncio
async def test_chat_empty_content(client):
    resp = await client.post(
        "/api/chat",
        json={"messages": [{"role": "user", "content": ""}]},
    )
    assert resp.status_code == 422

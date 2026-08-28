"""FastAPI application — AI Chat backend."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.services.openai_service import get_chat_response


app = FastAPI(
    title="AI Chat API",
    version="1.0.0",
    description="Backend API for the AI Chat application",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    role: str = Field(..., pattern="^(user|assistant|system)$")
    content: str = Field(..., min_length=1)


class ChatRequest(BaseModel):
    messages: list[Message] = Field(..., min_length=1)
    model: str = Field(default="gpt-4o-mini")


class ChatResponse(BaseModel):
    reply: str
    model: str
    usage: dict | None = None


@app.get("/")
async def root():
    return {"message": "AI Chat API is running"}


@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Send a conversation to OpenAI and return the assistant's reply."""
    try:
        result = await get_chat_response(
            messages=[m.model_dump() for m in request.messages],
            model=request.model,
        )
        return result
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except TimeoutError:
        raise HTTPException(status_code=504, detail="OpenAI request timed out.")
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

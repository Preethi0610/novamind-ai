"""OpenAI integration service."""

import asyncio
import os

from dotenv import load_dotenv
from openai import AsyncOpenAI, OpenAIError

load_dotenv()

_client = None

SYSTEM_PROMPT = (
    "You are a helpful, concise AI assistant. "
    "When sharing code, use markdown fenced code blocks with the language specified. "
    "Keep answers clear and well-structured."
)

REQUEST_TIMEOUT = 30


def _get_client():
    """Lazy-initialise the OpenAI async client."""
    global _client
    if _client is None:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError(
                "OPENAI_API_KEY is not set. "
                "Copy .env.example to .env and add your key."
            )
        _client = AsyncOpenAI(api_key=api_key)
    return _client


async def get_chat_response(messages, model="gpt-4o-mini"):
    """Call OpenAI chat completions and return the reply with metadata."""

    client = _get_client()

    # Prepend system message if not already present
    if not messages or messages[0].get("role") != "system":
        messages = [{"role": "system", "content": SYSTEM_PROMPT}] + messages

    try:
        response = await asyncio.wait_for(
            client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=0.7,
                max_tokens=2048,
            ),
            timeout=REQUEST_TIMEOUT,
        )
    except asyncio.TimeoutError:
        raise TimeoutError("OpenAI did not respond within the timeout window.")
    except OpenAIError as exc:
        raise RuntimeError("OpenAI API error: " + str(exc))

    choice = response.choices[0]
    usage = None
    if response.usage:
        usage = {
            "prompt_tokens": response.usage.prompt_tokens,
            "completion_tokens": response.usage.completion_tokens,
            "total_tokens": response.usage.total_tokens,
        }

    return {
        "reply": choice.message.content,
        "model": response.model,
        "usage": usage,
    }

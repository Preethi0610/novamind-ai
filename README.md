# NovaMind AI — Full-Stack Chat Application

A production-grade AI chat application featuring a **glassmorphism UI**, **real-time GPT integration**, and **animated loading states** — built with Next.js, React, TypeScript, and Python.

![Landing Page](screenshots/landing.png)
![Chat Panel](screenshots/chat.png)

---

## Highlights

- **Glassmorphism UI** — frosted glass panels, ambient glow, smooth entrance animations
- **Half-page chat panel** — slides in from right, page content shifts left responsively
- **Animated AI mascot** — Snapchat-style loading with changing expressions, sparkles, and rotating status text
- **Markdown + code blocks** — AI responses render with full markdown and syntax highlighting
- **Persistent history** — chat survives page refresh via localStorage
- **Robust error handling** — timeout detection, API failure banners, input validation
- **Fully responsive** — half-panel on desktop, full-screen on mobile

---

## Tech Stack

| Layer | Stack |
|-------|-------|
| Frontend | Next.js 14 · React 18 · TypeScript · CSS Modules |
| Backend | Python 3 · FastAPI · Uvicorn |
| AI | OpenAI GPT-4o-mini |
| Testing | Jest · React Testing Library · Pytest |

---

## Architecture
**Key design decisions:**
- `useChat` hook encapsulates all chat state, side effects, and persistence — components stay pure
- Backend service layer decouples OpenAI from routes — swappable model, testable in isolation
- `AbortController` with 35s timeout on frontend; `asyncio.wait_for` with 30s on backend — double safety net
- CSS custom properties for the entire theme — one file change to reskin

---

## Quick Start

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
echo "OPENAI_API_KEY=sk-your-key" > .env
python -m uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev
```

Open **http://localhost:3000**

---

## Tests

```bash
cd frontend && npm test     
cd backend && pytest        
```


---


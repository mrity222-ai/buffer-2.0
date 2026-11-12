# Social Publisher 🚀
> **Tagline:** Create Once. Publish Everywhere.  
> **UI Concept:** Inspired by **Buffer** (Minimalist White + Premium Purple Accent + Multi-Channel Sidebar).

---

## 🌟 Overview
Social Publisher is a Multi-Channel Social Media Management SaaS designed for Social Media Managers, Digital Marketing Agencies, Content Creators, and Small Businesses.

It allows you to draft a social post once (with high-res media, captions, and hashtags), select multiple connected **Facebook Pages** and **Instagram Professional / Business Accounts**, and dispatch parallel publishing jobs with a single click.

---

## 🎨 Buffer-Inspired UI Highlights
* **Channel Sidebar (Buffer Hallmark):** Dedicated left panel showcasing all connected Facebook Pages and Instagram accounts with live status indicators, category badges, and quick filter switches.
* **Streamlined Post Composer:**
  * Multi-account selector pill buttons with checkboxes & "Select All".
  * Caption textarea with real-time character counters (Facebook 63k vs Instagram 2,200 limits).
  * Hashtag drawer with quick chip insertion.
  * Drag & drop media uploader.
  * **Pixel-perfect Live Previews:** Tabbed realistic live previews for both **Facebook Page Feed** and **Instagram Mobile Card**.
* **Buffer-style Queue & Timeline:** View scheduled posts organized by slots with direct "Publish Now" triggers and post deletion.
* **Multi-Destination History & Retry:** Granular delivery status per account with instant one-click retry for failed uploads.
* **SaaS Subscription & Pricing:** Tiers for Free (2 channels), Starter (5 channels, ₹199/mo), Pro (15 channels, ₹499/mo), and Agency (30 channels, ₹999/mo).

---

## 🏗️ Architecture & Tech Stack

```
buffer/
├── frontend/             # Next.js App Router + Tailwind CSS + Lucide Icons (Buffer UI)
│   ├── src/
│   │   ├── app/          # App router pages & global layout
│   │   ├── components/   # Buffer UI: Sidebar, Composer, Previews, Queue, History
│   │   ├── lib/          # Mock data & state persistence
│   │   └── types/        # TypeScript definitions
│   └── Dockerfile
│
├── backend/              # Python FastAPI Application
│   ├── app/
│   │   ├── auth/         # JWT Authentication & Registration
│   │   ├── database.py   # Async SQLAlchemy 2.0 Engine & Session
│   │   ├── models/       # Users, SocialAccounts, Posts, PostTargets, PublishingJobs
│   │   ├── posts/        # Post creation & retry endpoints
│   │   ├── publishing/   # Celery worker & Redis queue for asynchronous publishing
│   │   ├── schemas/      # Pydantic v2 validation models
│   │   └── social/       # Meta Graph API client (FB Pages & IG Business)
│   ├── requirements.txt
│   └── Dockerfile
│
├── docker-compose.yml    # Full-stack orchestration (PostgreSQL, Redis, Worker, API, Web)
└── README.md
```

---

## 🚀 Running the Project

### Option 1: Docker Compose (Recommended)
To run the complete stack (PostgreSQL, Redis, Celery Worker, FastAPI backend, Next.js frontend):
```bash
docker-compose up --build
```
* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Backend API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

### Option 2: Local Development

#### 1. Frontend:
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### 2. Backend:
```bash
cd backend
python -m venv venv
venv\Scripts\activate       # On Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Open [http://localhost:8000/docs](http://localhost:8000/docs) for the interactive Swagger documentation.

---

## 🔑 Meta Graph API Integration Guide
1. Create a Business App on [developers.facebook.com](https://developers.facebook.com).
2. Configure **Facebook Login for Business** and **Instagram Graph API**.
3. Required permissions:
   * `pages_show_list`
   * `pages_read_engagement`
   * `pages_manage_posts`
   * `instagram_basic`
   * `instagram_content_publish`
4. Copy `App ID` and `App Secret` into `backend/.env`.

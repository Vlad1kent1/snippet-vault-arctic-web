# Snippet Vault 

## Task

Technical test assignment for the **Junior FullStack Developer** position. The project is a centralized service for managing code snippets, links, and technical notes with advanced filtering, partial-match search, and a clean, high-performance UI.

## What was done

I developed a full-scale FullStack application with a clear separation of concerns between Client and Server. My main focus was on type safety, code readability (Clean Code principles), and an intuitive search experience.

### Backend (NestJS + MongoDB)

* **CRUD Architecture**: Implemented a robust API for creating, reading, updating, and deleting snippets.
* **Smart Search Logic**: Instead of basic word-matching, I implemented **Regex-based search**. This allows users to find snippets by partial strings (e.g., searching "t" will find "test"), providing a much smoother UX than standard tokenized search.
* **Strict Validation**: All incoming data is filtered through `DTOs` and `class-validator`, ensuring database integrity and preventing malformed entries.
* **Scalable Structure**: Used NestJS modular architecture (Module/Controller/Service) to ensure the backend is easy to maintain and scale.

### Frontend (Next.js 15 + Tailwind CSS)

* **Arctic Mono Design**: Developed a custom minimalist design system. All UI elements follow a strict **16px rounding (rounded-2xl)** rule and a monochromatic palette to achieve a professional "Arctic" aesthetic.
* **Dynamic Tag System**: Built a dynamic tag filtering system. Instead of hardcoded values, tags are fetched and filtered in real-time through the API.
* **Refactored Component Architecture**: Organized UI elements into a modular structure. I separated page-specific components from shared UI elements to ensure scalability and avoid code clutter.
* **State Handling**: Implemented comprehensive UI states for `Loading`, `Empty` (no results found), and `Error` handling to ensure a seamless user experience.

## Core technologies

* **Next.js 15 (App Router)** & **TypeScript**
* **NestJS** & **Mongoose**
* **MongoDB Atlas** (Cloud Database)
* **Tailwind CSS** (Custom Design System)
* **Axios** (API communication)

## Project structure

```text
/
├── backend/            # NestJS Server
│   ├── src/
│   │   ├── snippets/   # Domain logic (Schemas, DTOs, Services)
│   │   └── main.ts     # Entry point (Port: 3001)
├── frontend/           # Next.js Client
│   ├── src/
│   │   ├── app/        # App Router & Layouts
│   │   ├── components/ # Modular UI components
│   │   │   ├── pages/  # Page-specific components (Home, Details)
│   │   │   └── shared/ # Reusable UI elements (Modals, Buttons, Inputs)
│   │   ├── lib/        # API client configuration & Utilities
│   │   └── types/      # Global TypeScript interfaces
```

## Environment Variables

To run this project, create `.env` files in the following directories:

**Backend (.env):**

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3001
```

## Setup Instructions

### 1. Backend

```shell
cd backend
npm install
npm run start:dev
```

The server will be running at `http://localhost:3001`.

### 2. Frontend

```shell
cd frontend
npm install
npm run dev
```

The client will be running at `http://localhost:3000`.

## API Endpoints

* `GET /snippets` — Fetch all snippets (supports `?q=` for text search and `?tag=` for tag filtering).
* `POST /snippets` — Create a new snippet.
* `GET /snippets/:id` — View snippet details.
* `PATCH /snippets/:id` — Update an existing snippet.
* `DELETE /snippets/:id` — Remove a snippet.

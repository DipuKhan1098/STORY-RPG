# Backend - My Turn-Based Game

## Purpose
This folder contains the **Express.js backend** for the game.
It serves as the API and data layer for both the **game client** and **admin panel**.

### Key Responsibilities
- Serve and manage game data stored as JSON in `/data`
- Provide CRUD endpoints for all game entities (spells, skills, races, classes, items, shops, story nodes, battle nodes, players, etc.)
- Handle **turn-based battle simulation** via `battleService`
- Manage **player state**: stats, inventory, equipment, spells, skills, abilities, quests
- Provide **admin authentication** and protect admin-only routes
- Serve uploaded assets (images/audio) from `/uploads`

---

## Folder Structure
backend/
data/ # JSON “tables” (our simple database)
routes/ # Express routers for each table and gameplay feature
services/ # Business logic (battle, inventory, story, etc.)
uploads/ # Uploaded assets from admin panel
server.js # App entry point
package.json # Backend dependencies and scripts
README.md # This file



## Development Notes
- **No real DB**: all data in `/data/*.json`
- **fileService** is the only module that reads/writes these JSON files — do NOT use `fs` directly in routes
- If moving to a real database later, replace fileService methods without touching higher-level logic
- All `routes/` are designed to be RESTful, using standard CRUD patterns
- Game simulation (battleService) runs server-side to prevent cheating

---

## API Overview
- `GET /spells` → All spells
- `POST /players` → Create new player
- `POST /battle/start` → Simulate battle
- See individual route files for detailed endpoints

---

## Authentication
- Only admin routes are protected
- Admin credentials are stored in environment variables or a config file (not in repo)
- Auth uses JWT for session tokens

---

## Assets
- `/uploads` contains images/audio uploaded via admin panel (race/class images, item icons, etc.)
- These are served statically by Express

---

## Running the Backend
```bash
cd backend
npm install
npm start

Backend runs on port 5000 by default.

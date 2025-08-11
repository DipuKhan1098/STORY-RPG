# Frontend (React + TypeScript)

## Purpose
This app contains **both** the Player client and the Admin panel in a single project.  
They share routing, components, and types, but render different experiences:

- **Player** routes: `/play`, `/player/*`
- **Admin** routes: `/admin/*`

## Quick Start
```bash
cd frontend
npm install
npm run dev         # starts Vite dev server (default http://localhost:5173)

Production Build
npm run build       # outputs to /dist
npm run preview     # serve built app locally

nvironment
Create .env based on .env.example:

ini
Copy code
VITE_API_BASE_URL=http://localhost:5000
This should point to your backend Express server.

The Admin panel sends JWT tokens via Authorization: Bearer <token>.

Project Layout (high level)
php
Copy code
frontend/
  public/               # index.html mount point
  src/
    assets/             # images/audio placeholders
    components/         # Shared UI + Game + Admin components
    pages/              # Player and Admin pages
    types/              # TS interfaces shared with backend JSON schema
    api/                # HTTP helpers for backend endpoints
    contexts/           # PlayerContext, DataContext, AdminAuthContext
    hooks/              # useStory, useBattle, useInventory, useAdminAuth
    styles/global.css   # base dark theme styles
    App.tsx             # router (player + admin)
    index.tsx           # React root
Design & UX Guidelines
Dark theme by default (keep contrast high for readability).

Try → Alert Rule: whenever a button attempts navigation or calls an API, if it fails, show an alert and stay on the same page. This ensures future pages can hook in without breaking the flow.

Persistent Profile Sidebar (Player): the right sidebar shows current stats/elements/abilities and always remains visible inside the game loop.

Admin UI: left collapsible navbar with sections: Home, Dashboard, Race Management, Class Management, Items, Shops, Monsters, Villains, Spells, Skills, Abilities, Story Editor, Battle Nodes, Quests.

Routing (summary)
/ → Landing page (Play / Admin)

/play → Player menu (New Game / Continue [hidden for now])

/player/new → New Game (name + gender → POST /players)

/player/race → Race selection (GET /races → PUT /players/:id)

/player/class → Class selection (GET /classes → PUT /players/:id)

/player/game → Main game loop (Story / Battle / Shop)

/admin → Admin dashboard (requires auth)

/admin/login → Admin login (JWT)

/admin/* → Editors (races, classes, items, shops, monsters, villains, spells, skills, abilities, stories, battle nodes)

Data Sources
The UI consumes Express endpoints and JSON “tables” from the backend:

/abilities, /spells, /skills, /items, /shops, /monsters, /villains, /classes, /races, /players, /storyNodes, /battleNodes, /battle.

Use src/api/* helpers rather than fetch directly.

Dev Tips
Implement pages and components using the comments already included in each file as your blueprint.

Keep all validations server‑source of truth; mirror lightweight checks in the UI for better UX.

Use DataContext to cache static lists (races/classes/items/spells/skills/abilities/monsters/villains/shops).

Use PlayerContext to manage the active player state across pages.
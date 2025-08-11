# API Reference (Backend Endpoints)

This document summarizes the **HTTP endpoints** provided by the Express backend.

## Conventions
- Base URL: `${VITE_API_BASE_URL}` (e.g., `http://localhost:5000`)
- JSON request/response.
- Admin endpoints require `Authorization: Bearer <token>`.

## Index
- Abilities: `/abilities`
- Spells: `/spells`
- Skills: `/skills`
- Items: `/items`
- Shops: `/shops`
- Monsters: `/monsters`
- Villains: `/villains`
- Classes: `/classes`
- Races: `/races`
- Players: `/players`
- Story Nodes: `/storyNodes`
- Battle Nodes: `/battleNodes`
- Battle: `/battle`
- Auth: `/auth`

---

## Abilities
- `GET /abilities` → list
- `GET /abilities/:id` → single
- `POST /abilities` (admin) → create
- `PUT /abilities/:id` (admin) → update
- `DELETE /abilities/:id` (admin) → delete

## Spells / Skills
- Same pattern as Abilities.
- Spells: INT-scaling; Skills: STR-scaling.

## Items
- `GET /items`, `GET /items/:id`, `POST`, `PUT`, `DELETE`
- Equipment slots and embedded abilities/spells/skills enforced server-side.

## Shops
- CRUD as above.
- `GET /shops/:id/inventory` → current prices (buy multiplier and overrides)
- `POST /shops/:id/buy` body `{ playerId, itemId, qty }`
- `POST /shops/:id/sell` body `{ playerId, itemId, qty }`

## Monsters / Villains
- CRUD as above; villains can equip items.

## Classes / Races
- CRUD as above.
- Classes: may define `startingAction` (0 or 1 of spell/skill).
- Races: may define `raceAbilityId`.

## Players
- `GET /players` (future continue)
- `GET /players/:id`
- `POST /players` body `{ name, gender }`
- `PUT /players/:id` → update profile/state
- Optional subroutes: `/equip`, `/useItem`

## Story Nodes
- CRUD for `intro`, `shop`, `battle`, `end` (and optional generic `story`).
- Admin validators: one intro per story; complete next-node links except on `end`.

## Battle Nodes
- CRUD for enemy compositions and outcomes.

## Battle
- `POST /battle/start` body `{ playerId, battleNodeId }`
- Returns `{ log[], player, outcome, nextNodeId }`.

## Auth
- `POST /auth/login` → `{ token }`
- `GET /auth/verify` → 200 OK if valid

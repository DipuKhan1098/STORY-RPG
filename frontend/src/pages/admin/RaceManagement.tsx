/**
 * RaceManagement.tsx
 * PURPOSE:
 *  - CRUD interface for Races.
 *
 * UI:
 *  - Table/grid view of existing races: name, description, base stats, elements, ability, asset preview.
 *  - Actions:
 *      - Create New Race → opens multi-step modal:
 *          Step 1: Basic info (name, description)
 *          Step 2: Stats (str, int, wis, end, dex, agi, luck, char)
 *          Step 3: Elemental damage & resistance (fire, water, earth, air, wood, metal, light, darkness, life, death, time, space)
 *          Step 4: Ability (select from abilities.json or none)
 *          Step 5: Asset upload (PNG/JPG)
 *      - Edit Race → same modal pre-filled.
 *      - Duplicate Race → copies data, prompts for new name.
 *      - Delete Race → confirm, then DELETE /api/races/:id.
 *
 * DATA:
 *  - GET /api/races → list
 *  - POST /api/races → create
 *  - PUT /api/races/:id → update
 *  - DELETE /api/races/:id → remove
 */

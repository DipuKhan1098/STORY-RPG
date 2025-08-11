/**
 * ClassSelect.tsx
 * PURPOSE:
 *  - Let the player choose a Class; filter list by eligibility based on current player stats/elements/race (post-race selection).
 *  - Show Class cards with:
 *      - name, PNG, short description
 *      - stat contributions, element offense/defense adjustments
 *      - optional startingAction (0 or 1 of spell/skill) with a badge; click to view details
 *
 * UI:
 *  - Grid of eligible Class cards; ineligible classes hidden or shown disabled with a tooltip “requirements not met” (choose one behavior and document).
 *  - Right sidebar: ProfileSidebar (always visible) shows PREVIEW deltas when a class is highlighted:
 *      - Added stats/elements
 *      - Starting spell/skill if any
 *  - Buttons:
 *      - "Back" → /player/race
 *      - "Start Adventure" (enabled when a class is selected)
 *
 * DATA:
 *  - GET /api/classes → all classes
 *  - Filter by `requirements` against the current player (race-adjusted stats/elements/race).
 *
 * INTERACTIONS:
 *  - Click a Class card to select; show details section (long description, full element table, startingAction preview).
 *  - On "Start Adventure":
 *      1) PUT /api/players/:id → { classId } (+ apply startingAction to spells/skills if backend chooses to persist now)
 *      2) Navigate → /player/game (the main loop)
 *  - On failure: alert & stay.
 *
 * TRY→ALERT:
 *  - Any failure to save or navigate → alert.
 */

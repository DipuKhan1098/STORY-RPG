/**
 * PlayerMenu.tsx
 * PURPOSE:
 *  - Entry screen after clicking "Play" on landing.
 *  - Shows two primary actions:
 *      1) New Game → goes to /player/new
 *      2) Continue  → (hidden for now as requested) later lists saved profiles from players.json
 *
 * UI (dark theme, simple cards/buttons):
 *  - Title: "Play"
 *  - Buttons:
 *      - "New Game" (primary)
 *      - "Continue" (hidden until we implement)
 *
 * NAVIGATION:
 *  - On "New Game" → try navigate to /player/new; if route missing or fails → alert.
 *
 * DATA:
 *  - None required yet. Continue will later call GET /api/players to show saves.
 *
 * TRY→ALERT:
 *  - If navigation fails or route not mounted, show a friendly alert and stay on this page.
 */

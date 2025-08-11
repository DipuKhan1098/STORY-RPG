/**
 * NewGame.tsx
 * PURPOSE:
 *  - Collect basic player identity and create a saved profile.
 *  - Fields:
 *      - Player Name (required)
 *      - Gender (card-style selector: Male / Female with simple tarot-card visual)
 *
 * UI:
 *  - Form with:
 *      - Text input for name (validate non-empty; optional min/max length)
 *      - Two selectable gender cards (Male | Female); highlight selected
 *  - Actions:
 *      - "Go" button → creates new player and proceeds to Race selection
 *      - "Back" → returns to PlayerMenu
 *
 * DATA FLOW:
 *  - On "Go":
 *      1) Construct payload: { name, gender } (other fields defaulted by backend)
 *      2) POST /api/players → backend creates new profile in players.json
 *      3) On success: store playerId (e.g., localStorage/context)
 *      4) Navigate → /player/race
 *  - On failure: alert with server message; remain on page.
 *
 * VALIDATION:
 *  - Name required; gender required.
 *
 * TRY→ALERT:
 *  - POST fails or route change fails → alert; do not advance.
 */

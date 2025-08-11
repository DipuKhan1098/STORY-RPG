/**
 * RaceSelect.tsx
 * PURPOSE:
 *  - Let the player choose a Race defined by admin.
 *  - Displays tarot-style Race cards:
 *      - name, PNG asset, description (short), base stats, elements (damage/resistance),
 *      - optional innate ability (show as a small badge; click for tooltip/details).
 *
 * UI:
 *  - Grid of Race cards (dark theme).
 *  - Right sidebar: ProfileSidebar (always visible) showing current player identity and PREVIEW deltas if a race is highlighted.
 *  - Buttons:
 *      - "Back" → /player/new
 *      - "Next" (disabled until a race is selected)
 *
 * DATA:
 *  - GET /api/races → list of races with fields (baseStats, elements, raceAbilityId, asset).
 *  - PlayerContext for current draft player (name, gender).
 *
 * INTERACTIONS:
 *  - Clicking a Race card sets selectedRace; ProfileSidebar shows preview of stats/elements/ability after choosing this race.
 *  - On "Next":
 *      1) PUT /api/players/:id → { raceId } (and optionally backend computes new derived stats or we compute on client then persist)
 *      2) Navigate → /player/class
 *  - On failure: alert (network/validation) and stay.
 *
 * ELIGIBILITY:
 *  - Races typically have no requirements; if admin adds restrictions, hide/disable card and show tooltip.
 *
 * TRY→ALERT:
 *  - Any API or navigation error → alert; do not advance.
 */

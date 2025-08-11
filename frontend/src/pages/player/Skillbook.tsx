/**
 * Skillbook.tsx
 * PURPOSE:
 *  - View-only list of learned physical skills.
 *  - Shows:
 *      - Name, icon, cooldown, targeting
 *      - Scaling summary (base + STR * mult) and any element imbues
 *  - Can also show gear-granted skills with "From Gear" badge.
 *
 * UI:
 *  - List/grid with filters (cooldown, type).
 *  - No activation here; battle handles usage.
 *
 * DATA:
 *  - Pull skills by IDs from PlayerContext (player.skills).
 */

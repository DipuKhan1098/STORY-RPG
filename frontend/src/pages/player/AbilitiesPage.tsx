/**
 * AbilitiesPage.tsx
 * PURPOSE:
 *  - List of passive abilities currently affecting the player.
 *  - Includes:
 *      - Race innate ability (if any)
 *      - Class abilities (if any)
 *      - Gear-granted passives
 *      - Quest abilities
 *  - Show exact effects (stats, regen, multipliers, elemental offense/defense, crit/escape rules).
 *
 * UI:
 *  - List with expandable rows for full effect breakdown.
 *  - Source tag on each entry: [Race], [Class], [Gear], [Quest].
 *
 * DATA:
 *  - Aggregate from PlayerContext (player.abilities + item-embedded abilities on equipped).
 *  - Dedupe by id to avoid double counting.
 */

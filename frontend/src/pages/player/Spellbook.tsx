/**
 * Spellbook.tsx
 * PURPOSE:
 *  - View-only (and favorite/organize) list of learned spells.
 *  - Shows:
 *      - Name, icon, type (damage/heal/summon/buff/debuff/mixed)
 *      - Targeting (Single/AoE/Self)
 *      - Elements list with fixed/mult bonuses
 *      - MP cost, cooldown
 *      - Scaling summary (base + INT * mult)
 *  - No casting here—this is for reference and favorites tagging.
 *
 * UI:
 *  - List/grid with filter by type/element.
 *  - Toggle "★ Favorite" — stored in local UI state or player preferences later.
 *
 * DATA:
 *  - Pull spells by IDs from PlayerContext (player.spells).
 *  - For gear-granted spells, display a badge "From Gear — remove on unequip".
 */

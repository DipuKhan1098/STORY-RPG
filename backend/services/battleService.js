/**
 * battleService.js
 * PURPOSE:
 *  - Core turn-based battle simulation engine
 *  - Resolves combat between:
 *      - Player(s) and enemy group (monsters/villains/summons)
 *  - Calculates:
 *      - Turn order (AGI speed-based)
 *      - Physical damage = STR scaling (plus weapon/skill modifiers)
 *      - Magical damage = INT scaling (plus spell modifiers)
 *      - Elemental bonuses/penalties
 *      - Buff/Debuff application
 *      - DoT (damage over time) and HoT (heal over time)
 *      - AoE (area of effect) targeting multiple entities
 *      - Summon mechanics (ally/enemy adds mid-battle)
 *      - Critical hit chance = DEX disparity
 *      - Escape chance = AGI disparity
 *      - HP/MP regen per turn (base from END/WIS, plus abilities/items)
 *      - Win/Lose/Escape outcomes
 * Base stats meanings
HP_max = END * 10
Per-turn HP regen = END (applied at round end)
MP_max = WIS * 10
Per-turn MP regen = WIS
Physical basic attack damage = STR (before armor/resists)
Magical basic attack (no element) = INT
Critical chance = function of DEX (see below)
Escape chance = function of AGI disparity (see below)
Loot luck: LUCK increases gold range and drop chance
 *
 * STEPS:
 *  1. Load player data and enemy stats
 *  2. Aggregate player stats from base + race + class + equipped items + abilities
 *  3. Create battle state objects (HP, MP, buffs, cooldowns)
 *  4. Loop turns until one side wins or escape
 *  5. Log each action (attacks, damage dealt, buffs applied, etc.)
 *  6. On victory: distribute XP/gold/items, update player state
 *  7. On loss: apply penalties if any (gold loss, item loss, etc.)
 *  8. On escape: no XP, may apply penalties
 *
 * RETURNS:
 *  - log[] of battle events
 *  - updated player object
 *  - outcome: 'win' | 'lose' | 'escape'
 *  - nextNodeId (from battleNode or storyNode config)
 *
 * USED BY:
 *  - battle.js route (POST /battle/start)
 *  - Could be used by test utilities for balance checking
 */

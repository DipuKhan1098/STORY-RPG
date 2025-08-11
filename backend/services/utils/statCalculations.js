/**
 * statCalculations.js
 * PURPOSE:
 *  - Functions to calculate derived stats from base stats + modifiers
 *  - Includes:
 *      - max HP = END * 10 (+ equipment/ability bonuses)
 *      - max MP = WIS * 10 (+ bonuses)
 *      - physicalDamage = STR scaling (+ element)
 *      - magicalDamage = INT scaling (+ element)
 *      - critChance = base + (DEX disparity * perDexDisparity%)
 *      - escapeChance = base + (AGI disparity * perAgiDisparity%)
 *      - goldDropMultiplier = base + LUCK * multiplier
 *
 * EXPORTS:
 *  - aggregateStats(player): merges base stats with race, class, equipped, abilities
 *  - calculateDerivedStats(stats): returns maxHp, maxMp, critChance, escapeChance
 */

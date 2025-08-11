/**
 * levelService.js
 * PURPOSE:
 *  - Handle XP gain and leveling
 *  - On level up:
 *      - Increase player stats based on class stat growth
 *      - Grant new spells every 5 levels (class/race-allowed list)
 *      - Grant new skills every 20 levels (class-allowed list)
 *      - Increase max HP = END * 10
 *      - Increase max MP = WIS * 10
 *      - Trigger LevelUp modal in frontend
 *
 * EXPORTS:
 *  - addXP(player, amount): returns updated player object
 *      → Adds XP, checks thresholds, may trigger level up(s)
 *  - handleLevelUp(player): internal
 *
 * NOTES:
 *  - XP thresholds may be static (fibonacci * 100) 
 *  - At level up, check available spells/skills not yet learned
 *  - Do not duplicate learned spells/skills
 */

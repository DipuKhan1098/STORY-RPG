/**
 * skills.js
 * PURPOSE:
 *  - Manage physical skills scaling on STR (plus DEX for some).
 *  - CRUD for skills.json
 *  - Game uses for:
 *      - Battle UI
 *      - Skill unlocks every 20 levels
 *      - Item embedded skills
 *
 * ENDPOINTS: same pattern as spells
 * VALIDATIONS:
 *  - scaling.strMultiplier >= 0
 *  - Element keys valid
 *  - AoE and DoT valid only for 'damage' type
 */

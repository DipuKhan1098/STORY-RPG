/**
 * spells.js
 * PURPOSE:
 *  - Manage magical abilities scaling on INT.
 *  - CRUD for spells.json
 *  - Game fetches spells for:
 *      - Battle UI
 *      - Spell selection on level-up (every 5 levels)
 *      - Item embedded spells
 *
 * ENDPOINTS:
 *  GET /spells
 *  GET /spells/:id
 *  POST /spells
 *      body: { name, description, type, targeting, scaling, elements, cost, cooldown, requirements }
 *  PUT /spells/:id
 *  DELETE /spells/:id
 *
 * VALIDATIONS:
 *  - Type must be one of 'damage','heal','summon','buff','debuff','mixed'
 *  - scaling.intMultiplier >= 0
 *  - Element keys from fixed list; fixed damage and multipliers numeric
 *  - DoT fields only for types that support it
 *  - Summon.monsterId must exist in monsters.json
 */

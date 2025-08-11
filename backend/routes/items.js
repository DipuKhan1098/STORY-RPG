/**
 * items.js
 * PURPOSE:
 *  - CRUD for items.json
 *  - Handles multiple item types: equipment, potions, materials
 *  - Validates slot assignment, embedded abilities/spells/skills references
 *
 * ENDPOINTS:
 *  GET /items
 *  GET /items/:id
 *  POST /items
 *      body: { name, type, slot, cost, sellValue, requirements, bonuses, potion?, embedded }
 *  PUT /items/:id
 *  DELETE /items/:id
 *
 * VALIDATIONS:
 *  - type matches allowed list
 *  - slot matches type (weapons→mainWeapon/offWeapon, armor→head/body/leg/shoe, etc.)
 *  - Potion effectKind in allowed list
 *  - Embedded ids exist in relevant json
 */

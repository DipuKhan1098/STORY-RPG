/**
 * MonsterManagement.tsx
 * PURPOSE:
 *  - CRUD interface for Monsters.
 *
 * UI:
 *  - Table view: name, element, stats, loot count.
 *  - Actions:
 *      - Create Monster → form:
 *          - name, description
 *          - stats
 *          - element offense/defense
 *          - spells/skills used
 *          - loot table (itemId + chance)
 *          - rewards (xp, gold)
 *          - asset upload
 *      - Edit, Delete
 *
 * DATA:
 *  - GET /api/monsters
 *  - POST /api/monsters
 *  - PUT /api/monsters/:id
 *  - DELETE /api/monsters/:id
 */

/**
 * ItemManagement.tsx
 * PURPOSE:
 *  - CRUD interface for Items.
 *
 * UI:
 *  - Table view: name, type, slot (if equipment), price, sell value, bonuses, requirements, asset.
 *  - Actions:
 *      - Create Item → form:
 *          - name, description
 *          - type: weapon/armor/potion/material/etc.
 *          - slot (if applicable)
 *          - stat bonuses, elemental bonuses
 *          - embedded abilities/spells/skills
 *          - potion-specific fields (effect kind, duration, permanent?)
 *          - requirements
 *          - asset upload
 *      - Edit, Duplicate, Delete
 *
 * DATA:
 *  - GET /api/items
 *  - POST /api/items
 *  - PUT /api/items/:id
 *  - DELETE /api/items/:id
 */

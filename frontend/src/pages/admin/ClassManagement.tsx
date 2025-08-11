/**
 * ClassManagement.tsx
 * PURPOSE:
 *  - CRUD interface for Classes.
 *
 * UI:
 *  - Table/grid view of existing classes: name, description, base stats, elements, startingAction (spell or skill), asset preview.
 *  - Actions:
 *      - Create New Class → modal:
 *          Step 1: Basic info
 *          Step 2: Stats
 *          Step 3: Elemental offense/defense
 *          Step 4: Requirements (min stats/elements, race restrictions)
 *          Step 5: Starting spell/skill (0 or 1)
 *          Step 6: Asset upload
 *      - Edit, Duplicate, Delete.
 *
 * DATA:
 *  - GET /api/classes
 *  - POST /api/classes
 *  - PUT /api/classes/:id
 *  - DELETE /api/classes/:id
 */

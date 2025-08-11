/**
 * storyNodes.js
 * PURPOSE:
 *  - CRUD for storyNodes.json
 *  - Enforce:
 *      - Exactly 1 intro per storyId
 *      - Choices must have unique IDs
 *      - No missing nextNodeId unless node type = 'end'
 *
 * GAME:
 *  GET /story/:id → Returns node details (for game flow)
 */

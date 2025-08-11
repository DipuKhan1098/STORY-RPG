/**
 * storyService.js
 * PURPOSE:
 *  - Orchestrate story flow between nodes
 *  - Validate choice requirements:
 *      - Stats (>= required)
 *      - Elements (>= required %)
 *      - Items in inventory
 *      - Quests/flags
 *  - Apply choice rewards:
 *      - Gold
 *      - Items
 *      - Stats boosts
 *      - Element bonuses
 *      - Quest flags
 *  - Return nextNodeId to game
 *
 * EXPORTS:
 *  - getNode(nodeId): loads from storyNodes.json
 *  - chooseOption(playerId, nodeId, choiceId): returns nextNodeId + updated player
 *
 * NOTES:
 *  - For battle/shop nodes, storyService may return a special signal to frontend
 *    to switch mode (battle UI, shop UI)
 *  - End nodes return null or main menu redirect
 */

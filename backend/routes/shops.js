/**
 * shops.js
 * PURPOSE:
 *  - CRUD for shops.json
 *  - Handle transactions in-game (buy/sell)
 *
 * ENDPOINTS:
 *  GET /shops
 *  GET /shops/:id
 *  POST /shops
 *      body: { name, description, items, buyMultiplier, sellMultiplier }
 *  PUT /shops/:id
 *  DELETE /shops/:id
 *
 * GAME-SPECIFIC:
 *  GET /shops/:id/inventory
 *      → Returns shop items with price = basePrice * buyMultiplier (unless priceOverride)
 *  POST /shops/:id/buy
 *      body: { playerId, itemId, qty }
 *      → Checks player gold, inventory space, updates players.json
 *  POST /shops/:id/sell
 *      body: { playerId, itemId, qty }
 *      → Removes from player inventory, adds gold
 */

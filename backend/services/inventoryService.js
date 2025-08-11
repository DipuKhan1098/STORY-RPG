/**
 * inventoryService.js
 * PURPOSE:
 *  - Manage buying, selling, crafting, equipping, and using items
 *
 * EXPORTS:
 *  - buyItem(playerId, shopId, itemId, qty)
 *      → Checks gold, adds item(s) to inventory, removes gold
 *  - sellItem(playerId, shopId, itemId, qty)
 *      → Removes from inventory, adds gold
 *  - craftItem(playerId, recipeId)
 *      → Checks ingredients, removes them, adds crafted item
 *  - equipItem(player, slot, itemId)
 *      → Checks requirements, places in slot, updates stats
 *  - unequipItem(player, slot)
 *  - useItem(player, itemId)
 *      → Apply potion effects (heal, buff, etc.)
 *
 * LOGIC:
 *  - Requirements: stats, level, class, race, element mastery
 *  - Stackable items: increment/decrement qty
 *  - Equipment stat aggregation handled in PlayerContext in frontend and in battleService for server
 *  - Selling: price = baseSellValue * sellMultiplier (shop)
 */

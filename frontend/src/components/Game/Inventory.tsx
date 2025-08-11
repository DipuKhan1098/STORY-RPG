/**
 * Inventory.tsx
 * PURPOSE:
 *  - Display player's inventory (items + equipment)
 *  - Allow:
 *      - Use (consume potion or buff item)
 *      - Equip/unequip
 *      - Sell (if in shop mode)
 *      - Dispose (permanent remove)
 *
 * UI ELEMENTS:
 *  - Tabs:
 *      - Bag (all items)
 *      - Equipment (currently equipped)
 *      - Crafting (if in crafting context)
 *  - Item list/grid:
 *      - Name, description, quantity
 *      - Icon
 *      - Action buttons (context-sensitive)
 *
 * INTERACTIONS:
 *  - Equip: checks requirements via PlayerContext / backend
 *  - Use: applies item effect, reduces quantity
 *  - Sell: calls shop API to remove item, add gold
 *  - Dispose: confirmation prompt before removal
 */

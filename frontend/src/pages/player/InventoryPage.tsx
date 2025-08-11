/**
 * InventoryPage.tsx
 * PURPOSE:
 *  - Standalone route wrapper for inventory management (same UI can be a panel inside Game).
 *  - Embeds <Inventory /> component (from components/Game).
 *
 * UI:
 *  - Bag list with quantities (stackable), filters (type/slot), actions (Equip, Use, Dispose).
 *  - If route param or context indicates "Shop Mode", show Sell in place of Dispose.
 *
 * DATA:
 *  - Uses PlayerContext methods and players API to persist item changes.
 *
 * TRY→ALERT:
 *  - Use/Dispose/Sell fails → alert & revert.
 */

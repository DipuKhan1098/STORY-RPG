/**
 * ShopPage.tsx
 * PURPOSE:
 *  - Standalone route wrapper to host <Shop /> (buy/sell UI).
 *  - Useful for direct linking during development or a dedicated shop screen.
 *
 * UI:
 *  - Two columns: Shop inventory (Buy) and Player inventory (Sell).
 *  - Show gold and transaction summaries.
 *
 * DATA:
 *  - GET /api/shops/:id (shopId provided via route or context from story node).
 *  - PlayerContext updates after successful buy/sell.
 *
 * TRY→ALERT:
 *  - API failure to load or transact → alert & stay.
 */

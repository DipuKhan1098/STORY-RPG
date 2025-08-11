/**
 * shops.ts
 * PURPOSE:
 *  - CRUD for shops + game-specific buy/sell operations.
 *
 * FUNCTIONS:
 *  - listShops(): Promise<Shop[]>
 *  - getShop(id: string): Promise<Shop>
 *  - createShop(data: Partial<Shop>): Promise<Shop>                     // admin-only
 *  - updateShop(id: string, data: Partial<Shop>): Promise<Shop>         // admin-only
 *  - deleteShop(id: string): Promise<void>                              // admin-only
 *
 * GAME OPERATIONS:
 *  - getShopInventory(id: string): Promise<{ itemId:string; price:number }[]>
 *      GET /shops/:id/inventory
 *  - buyItem(playerId: string, shopId: string, itemId: string, qty: number): Promise<Player>
 *      POST /shops/:id/buy
 *  - sellItem(playerId: string, shopId: string, itemId: string, qty: number): Promise<Player>
 *      POST /shops/:id/sell
 *
 * TRY→ALERT:
 *  - If buy/sell fails (not enough gold, missing item), throw Error with readable message.
 */

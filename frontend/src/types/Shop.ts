/**
 * Shop.ts
 * PURPOSE:
 *  - Defines shop inventory and price rules.
 *
 * FIELDS:
 *  - id, name, description
 *  - items: { itemId:string; priceOverride?:number }[]
 *  - buyMultiplier:number      // e.g., 1.0
 *  - sellMultiplier:number     // e.g., 0.5
 *  - asset?: AssetRef
 *
 * PRICING:
 *  - Buy price = (priceOverride ?? item.cost) * buyMultiplier
 *  - Sell price = (item.sellValue ?? item.cost) * sellMultiplier
 */

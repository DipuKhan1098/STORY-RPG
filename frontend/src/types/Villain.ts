/**
 * Villain.ts
 * PURPOSE:
 *  - Boss-like enemy that can equip items (uses same slots as player except potions).
 *
 * FIELDS:
 *  - id, name, description
 *  - baseStats: StatBlock
 *  - elements: ElementsBundle
 *  - spells: string[]
 *  - skills: string[]
 *  - abilities: string[]
 *  - equipped: {
 *      head?:string|null; body?:string|null; leg?:string|null; shoe?:string|null;
 *      mainWeapon?:string|null; offWeapon?:string|null;
 *      ringLeft?:string|null; ringRight?:string|null; necklace?:string|null;
 *    }
 *  - loot: same shape as Monster.loot
 *  - asset?: AssetRef
 */

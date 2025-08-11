/**
 * Monster.ts
 * PURPOSE:
 *  - Non-villain enemy definition.
 *
 * FIELDS:
 *  - id, name, description
 *  - baseStats: StatBlock
 *  - elements: ElementsBundle (damage/resistance)
 *  - spells: string[]       // SpellId[]
 *  - skills: string[]       // SkillId[]
 *  - abilities: string[]    // AbilityId[]
 *  - loot: {
 *      xp:number;
 *      gold:[number, number]; // min,max
 *      items:{ itemId:string; chance:number; qtyMin?:number; qtyMax?:number }[];
 *    }
 *  - asset?: AssetRef
 *
 * NOTES:
 *  - HP/MP derived at runtime from END/WIS; monsters can have local overrides later.
 */

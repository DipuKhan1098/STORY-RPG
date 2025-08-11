/**
 * Player.ts
 * PURPOSE:
 *  - Full player profile + runtime state mirrored from backend.
 *
 * FIELDS:
 *  - id, name, gender: 'male'|'female'
 *  - raceId?: string | null
 *  - classId?: string | null
 *  - level:number
 *  - currentXP:number; neededXP:number
 *  - hp:number; maxHp:number
 *  - mp:number; maxMp:number
 *  - stats: StatBlock                                  // base + race + class + permanent gains
 *  - elements: ElementsBundle                          // permanent allocations
 *  - spells: string[]                                  // permanently learned
 *  - skills: string[]
 *  - abilities: string[]                               // permanent passives
 *  - inventory: { itemId:string; qty:number }[]
 *  - equipped: {
 *      head?:string|null; body?:string|null; leg?:string|null; shoe?:string|null;
 *      mainWeapon?:string|null; offWeapon?:string|null;
 *      ringLeft?:string|null; ringRight?:string|null; necklace?:string|null;
 *      potion1?: { itemId:string; qty:number } | null;
 *      potion2?: { itemId:string; qty:number } | null;
 *    }
 *  - gold:number
 *  - currentStoryNodeId?: string | null
 *  - activeQuestState?: Record<string, unknown>        // flags/step indices
 *  - summons?: { monsterId:string; hp:number; durationTurns?:number }[]
 *
 * DERIVED (computed at runtime; not persisted necessarily):
 *  - totals: aggregated stats/elements after gear + abilities + temp effects
 *  - tempEffects: list of active buffs/debuffs with remaining turns
 */

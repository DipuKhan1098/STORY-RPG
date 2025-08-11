/**
 * Common.ts
 * PURPOSE:
 *  - Centralize shared primitive types & helper shapes used by all other types.
 *  - Keeps field names consistent between frontend & backend.
 *
 * DEFINITIONS (spec to implement):
 *  - StatKey:
 *      'str' | 'int' | 'wis' | 'end' | 'dex' | 'agi' | 'luck' | 'char'
 *  - ElementKey (12 elements):
 *      'fire' | 'water' | 'earth' | 'air' | 'wood' | 'metal' |
 *      'light' | 'darkness' | 'life' | 'death' | 'time' | 'space'
 *
 *  - StatBlock:
 *      { str:number, int:number, wis:number, end:number, dex:number, agi:number, luck:number, char:number }
 *
 *  - ElementMap:
 *      Partial<Record<ElementKey, number>>   // percentage values in [-100..100] unless otherwise noted
 *
 *  - ElementsBundle:
 *      { damage?: ElementMap, resistance?: ElementMap }
 *
 *  - AssetRef:
 *      { image?: string, icon?: string, audio?: string, [key:string]: string|undefined }
 *
 *  - ID types:
 *      Branded strings or plain string: AbilityId, SpellId, SkillId, ItemId, ShopId, MonsterId, VillainId,
 *      ClassId, RaceId, PlayerId, StoryId, StoryNodeId, BattleNodeId, QuestId.
 *
 *  - Requirements (used in items, classes, choices, etc.):
 *      {
 *        level?: number;
 *        stats?: Partial<StatBlock>;                 // each is ">= threshold"
 *        elements?: Partial<Record<ElementKey, number>>;  // ">= threshold" percent
 *        classIds?: string[];
 *        raceIds?: string[];
 *        questFlags?: string[];
 *        items?: { itemId: string; qty?: number }[];
 *      }
 *
 *  - Rewards (applied on story choice, battle, quest, etc.):
 *      {
 *        xp?: number;
 *        gold?: number;
 *        items?: { itemId: string; qty: number }[];
 *        stats?: Partial<StatBlock>;                 // permanent increases
 *        elements?: Partial<Record<ElementKey, number>>; // permanent % mods
 *        questFlags?: string[];
 *      }
 *
 *  - AOE/DoT helpers:
 *      Aoe: { radius:number; falloff?:number }              // 0..1 falloff multiplier outward
 *      Dot: { ticks:number; amountPerTick?:number; usesScaling?:boolean }
 *
 *  - Targeting:
 *      'single' | 'aoe' | 'self'
 *
 *  - DamageType (logical tag; not exclusive):
 *      'physical' | 'magical'
 *
 *  - Multipliers caps (for comments/validation; not enforced here):
 *      - elemental offense/resistance clamped final to [-100..100]
 *      - taken% floors (e.g., physicalTaken >= -80%) decided in services
 */

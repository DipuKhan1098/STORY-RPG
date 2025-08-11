/**
 * Item.ts
 * PURPOSE:
 *  - Consumables, equipment, crafting mats, accessories, rings, etc.
 *
 * FIELDS:
 *  - id, name, description
 *  - type:
 *      'weapon'|'armor_head'|'armor_body'|'armor_leg'|'armor_shoe'|'offhand'|
 *      'ring'|'necklace'|'potion'|'accessory'|'material'
 *  - slot:
 *      'head'|'body'|'leg'|'shoe'|'mainWeapon'|'offWeapon'|'ringLeft'|'ringRight'|'necklace'|'potionSlot'
 *      // potionSlot maps to potion1/potion2 equipment positions at runtime
 *  - cost?: number
 *  - sellValue?: number
 *  - stackable?: boolean
 *  - maxStack?: number
 *  - requirements?: Requirements
 *  - bonuses?: {
 *      stats?: Partial<StatBlock>;
 *      offense?: ElementMap;
 *      resistance?: ElementMap;
 *      armor?: number;
 *      physicalTaken?: number;   // % add
 *      magicalTaken?: number;    // % add
 *    }
 *  - potion?: {
 *      effectKind: 'heal'|'mpHeal'|'statBuff'|'statPermanent'|'elementBuff'|'regenBuff';
 *      amount?: number;                              // heal/mpHeal or flat stat amount
 *      perStatMap?: Partial<StatBlock>;              // for buff types
 *      perElementMap?: ElementMap;                   // for element buff
 *      durationTurns?: number;                       // 0 = permanent
 *      cooldown?: number;
 *    }
 *  - embedded?: { abilities?: string[]; spells?: string[]; skills?: string[] } // max total entries ≤ 5
 *  - asset?: AssetRef
 *
 * NOTES:
 *  - On equip: apply bonuses + grant embedded entries (dedupe with existing learns).
 *  - On unequip: remove embedded grants unless learned elsewhere.
 */

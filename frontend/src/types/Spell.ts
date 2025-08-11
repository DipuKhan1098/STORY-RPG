/**
 * Spell.ts
 * PURPOSE:
 *  - Magical action scaling on INT; may do damage, heal, summon, buff, debuff, or mixed.
 *
 * FIELDS:
 *  - id, name, description
 *  - type: 'damage' | 'heal' | 'summon' | 'buff' | 'debuff' | 'mixed'
 *  - targeting: 'single' | 'aoe' | 'self'
 *  - scaling: { base:number; intMultiplier:number }          // raw = base + INT * intMultiplier
 *  - elements: { key:ElementKey; fixed?:number; mult?:number }[] // fixed adds flat; mult adds %
 *  - aoe?: Aoe
 *  - dot?: Dot
 *  - summon?: { monsterId:string; durationTurns?:number; replacesExisting?:boolean }
 *  - cost?: { mp?:number; hp?:number; itemId?:string }
 *  - cooldown?: number
 *  - requirements?: Requirements
 *  - asset?: AssetRef
 *
 * NOTES:
 *  - Even non-damage spells can carry element tags for synergy (e.g., buffs).
 *  - Elemental pipeline: attacker offense → defender resistance → final clamp.
 */

/**
 * Skill.ts
 * PURPOSE:
 *  - Physical action scaling on STR; can still carry element tags for imbues.
 *
 * FIELDS:
 *  - id, name, description
 *  - type: 'damage' | 'buff' | 'debuff' | 'mixed'
 *  - targeting: 'single' | 'aoe' | 'self'
 *  - scaling: { base:number; strMultiplier:number }          // raw = base + STR * strMultiplier
 *  - elements?: { key:ElementKey; fixed?:number; mult?:number }[]
 *  - aoe?: Aoe
 *  - dot?: Dot
 *  - cost?: { mp?:number; hp?:number; itemId?:string }       // some physical skills may cost MP/HP
 *  - cooldown?: number
 *  - requirements?: Requirements
 *  - asset?: AssetRef
 *
 * UNLOCKING:
 *  - Level-up rule (documented in backend): new skill every 20 levels if available.
 */

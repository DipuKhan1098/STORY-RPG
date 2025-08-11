/**
 * Class.ts
 * PURPOSE:
 *  - Player class definition; contributes stats/elements and an optional starting action.
 *
 * FIELDS:
 *  - id, name, description
 *  - baseStats: StatBlock
 *  - elements: ElementsBundle
 *  - requirements?: Requirements               // to be eligible in selection UI
 *  - startingAction?: { type:'spell'|'skill'; id:string } | null
 *  - asset?: AssetRef
 *
 * NOTES:
 *  - Eligibility filter in ClassSelect uses player (post-race) stats/elements/race.
 */

# Data Schemas (JSON “Tables”)

All data lives in `/backend/data/*.json`. These are treated as **tables**.

## Core Types
- **Stats**: `str, int, wis, end, dex, agi, luck, char`
- **Elements**: `fire, water, earth, air, wood, metal, light, darkness, life, death, time, space`
- **ElementsBundle**: `{ damage: {element:%}, resistance: {element:%} }`

## Abilities
- Passive effects. Fields:
  - `effects.stats`, `effects.regen`, `effects.multipliers`, `effects.elemental`, `effects.crit`, `effects.escape`
  - `requirements` (optional)
  - `isRaceAbility` boolean

## Spells
- INT-scaling actions; can be `damage|heal|summon|buff|debuff|mixed`.
- `targeting: single|aoe|self`
- `scaling: { base, intMultiplier }`
- `elements` array of `{ key, fixed?, mult? }`
- Optional `dot`, `summon`, `cooldown`, `requirements`.

## Skills
- STR-scaling actions; similar to spells; unlock every **20 levels** by rule.

## Items
- Types: weapon/armor_head/armor_body/armor_leg/armor_shoe/offhand/ring/necklace/potion/accessory/material
- Slots: head/body/leg/shoe/mainWeapon/offWeapon/ringLeft/ringRight/necklace/potion1/potion2
- `bonuses` for stats/elements/armor/taken%
- `embedded` (0–5) abilities/spells/skills
- `potion` config for consumables.

## Shops
- `items: [{ itemId, priceOverride? }]`
- `buyMultiplier`, `sellMultiplier`

## Monsters / Villains
- `baseStats`, `elements`, `spells`, `skills`, `abilities`
- `loot`: `xp`, `gold[min,max]`, `items[{ itemId, chance, qtyMin?, qtyMax? }]`
- Villains also have `equipped` slots.

## Classes
- `baseStats`, `elements`, `requirements`, `startingAction (0 or 1)`

## Races
- `baseStats`, `elements`, `raceAbilityId`, `allowedClasses[]`

## Players
- Profile + runtime:
  - lvl/xp/hp/mp/stats/elements
  - `spells`, `skills`, `abilities`
  - `inventory[{ itemId, qty }]`
  - `equipped` (11 slots including two potion slots)
  - `currentStoryNodeId`, `gold`, `activeQuestState`, `summons[]`

## Story Nodes
- `intro`, `shop`, `battle`, `end` (and optional `story`).
- Choices have `requirements` and `rewards`.
- Battle nodes link `nextOnWin/nextOnLose/nextOnEscape`.

## Battle Nodes
- Optional dedicated table for enemy compositions and outcomes.

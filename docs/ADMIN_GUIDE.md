# Admin Guide

## Navigation
- Collapsible left navbar:
  - Home, Dashboard, Race Management, Class Management, Items, Shops, Monsters, Villains, Spells, Skills, Abilities, Story Editor, Battle Nodes.

## Races
- **Create / Edit** (multi-step modal):
  1. Basic info (name, description)
  2. Stats (`str,int,wis,end,dex,agi,luck,char`)
  3. Elemental offense/defense (12 elements)
  4. Ability (0 or 1 innate)
  5. Asset upload (PNG)
- Save → writes to `races.json`.

## Classes
- **Create / Edit**:
  - Stats & elements
  - Requirements (min stats/elements, race restrictions)
  - StartingAction (0 or 1 of spell/skill)
  - Asset upload

## Items
- **Create / Edit**:
  - Type & slot; stat/element bonuses
  - Embedded abilities/spells/skills (0–5)
  - Potion effects (temporary/permanent)
  - Requirements; price/sell value
  - Asset upload

## Shops
- **Create / Edit**:
  - Add items via typeahead; price overrides
  - Buy/Sell multipliers

## Monsters & Villains
- **Create / Edit**:
  - Stats, elements, spells, skills, abilities
  - Loot table: xp, gold range, item drops
  - Villains: equipped slots

## Spells / Skills / Abilities
- **Spells**: INT-scaling; elements; AoE/DoT; summon config
- **Skills**: STR-scaling; cooldowns; optional elements
- **Abilities**: passive effects; multipliers; regen; crit/escape modifiers

## Stories
- **Story Editor**:
  - One **intro** per story; additional **shop**, **battle**, **end** nodes
  - Choices: requirements (hide if unmet), rewards, nextNode linking
  - Validations:
    - If parent missing (except intro), **highlight** in list
    - Choice missing or nextNode missing → **highlight**
  - Node list grouped: Intro, Script (generic story), Battle, Shop, End

## Battle Nodes
- Define compositions: monsters/villains, environment, rewards
- Next nodes: `nextOnWin/nextOnLose/nextOnEscape`

## Authentication
- Admin routes require JWT; login via `/auth/login`.
- Tokens stored client-side; verify on load.

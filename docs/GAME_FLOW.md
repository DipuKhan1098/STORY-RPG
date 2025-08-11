# Game Flow

## Player Onboarding
1. **Landing → Play**
2. **Player Menu**: New Game / Continue (continue hidden initially)
3. **New Game**: name + gender → `POST /players`
4. **Race Select**: choose race → `PUT /players/:id { raceId }`
5. **Class Select**: choose eligible class → `PUT /players/:id { classId }`
6. **Start Adventure** → enter Story loop

## Story → Battle → Shop Loop
- Load current **Story Node**
  - If `type = intro|story|end`: render narrative + choices
  - If `type = shop`: open shop UI (`GET /shops/:id`)
  - If `type = battle`: start battle (`POST /battle/start`)
- After **Battle**: receive `{ outcome, nextNodeId }` and continue.
- **Try → Alert**: any failed navigation or API → alert and remain.

## Stats / Formulas (summary)
- **HP** = `END * 10`
- **MP** = `WIS * 10`
- **Basic Physical** = `STR * 1.0` (then armor and physicalTaken%)
- **Basic Magical** = `INT * 1.0` (no element)
- **Regen/Turn** = `+END HP`, `+WIS MP` (plus regen effects)
- **Crit Chance** = `5% + 1% * (DEX_player - DEX_target)` clamp `[0..100]`, crit ×1.5
- **Escape Chance** = `25% + 1% * (AGI_player - AGI_fastestEnemy)` clamp `[5..95]`
- **Elements Pipeline**: offense% − defense% → clamp to `[-100..100]` → apply

## Leveling
- Gain XP from battles; on level-up:
  - Increase stats per class growth (service-defined or 3 free stats per level)
  - **New spell every 5 levels**, **new skill every 20 levels**
  - LevelUp modal lets the player pick among eligible options

## Inventory & Equipment
- 11 slots (head, body, leg, shoe, mainWeapon, offWeapon, ringL, ringR, necklace, potion1, potion2)
- Items can have **embedded** abilities/spells/skills (0–5) granted while equipped.

## Text-Based Story Flow Example
Intro: "The Village Awakens"
|-- Choice: Visit the market [char >= 1]
| --> [Shop] Market → Choice: Continue to gates → Bandit Ambush
|
|-- Choice: Train with guards
| --> [Battle] Bandit Ambush
| |-- Win --> End: "Safe Passage" (rewards)
| |-- Lose --> End: "Defeat"
| |-- Escape --> End: "A Narrow Escape"
|
'-- Choice: Rest at inn
--> [End] Peaceful Ending
/**
 * Battle.tsx
 * PURPOSE:
 *  - Display turn-based battle UI
 *  - Show:
 *      - Player party + summons
 *      - Enemy party
 *      - HP/MP bars, buffs/debuffs
 *      - Action bar for commands
 *      - Turn log
 *
 * UI ELEMENTS:
 *  - Enemy area: list of enemies with HP bars, element icons
 *  - Player area: player + allies with HP/MP bars, buffs/debuffs
 *  - Action bar:
 *      - Attack (physical, STR scaling)
 *      - Spells (list learned spells; show mana cost, damage/heal, AoE/DoT, elements)
 *      - Skills (list learned physical skills; show cooldown, effects)
 *      - Items (open inventory modal)
 *      - Summon (available summons; click to summon or dismiss)
 *      - Run (attempt escape; success = AGI disparity check)
 *  - Turn log: scrollable list of battle events
 *
 * INTERACTIONS:
 *  - Selecting an action sends it to useBattle() hook
 *  - useBattle() updates local state and/or calls backend battleService
 *  - On battle end: show outcome panel (Victory/Defeat/Escape) with "Continue" button
 *
 * PROPS:
 *  - battleNodeId
 *
 * NOTES:
 *  - Critical hits (DEX disparity) should be highlighted
 *  - Element advantage/disadvantage visually indicated
 */

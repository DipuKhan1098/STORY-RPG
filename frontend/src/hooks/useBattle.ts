/**
 * useBattle.ts
 * PURPOSE:
 *  - Encapsulate all client-side battle flow and state for a single encounter.
 *  - Controls:
 *      - Local battle state (player/enemies HP/MP, buffs, cooldowns, DoT/HoT timers)
 *      - Turn order (AGI-based)
 *      - Action handlers (attack, cast spell, use skill, use item, summon, defend, run)
 *      - Calling backend simulation OR mirroring battleService locally for responsiveness
 *      - Returning outcome and nextNodeId to the page to continue story flow
 *
 * EXPORTED API (to implement):
 *  - const {
 *      battle,            // current battle state (entities, round index, log[])
 *      isLoading,
 *      error,
 *      startBattle,       // (battleNodeId) => Promise<void>
 *      attack,            // (targetId) => Promise<void>
 *      castSpell,         // (spellId, targetId|multi) => Promise<void>
 *      useSkill,          // (skillId, targetId|multi) => Promise<void>
 *      useItem,           // (itemId, targetId?) => Promise<void>
 *      summon,            // (spellId) => Promise<void>
 *      defend,            // () => Promise<void>
 *      run,               // () => Promise<'win'|'lose'|'escape'>
 *    } = useBattle(playerId)
 *
 * STATE shape (suggested):
 *  - battle: {
 *      player: { hp, mp, stats, elements, buffs[], debuffs[], cooldowns:Record<string,number> },
 *      allies:  { id, hp, ... }[],     // summons if any
 *      enemies: { id, type: 'monster'|'villain', hp, mp?, stats, elements, buffs[], debuffs[] }[],
 *      round: number,
 *      log: string[],                  // human-readable turn log
 *      outcome?: 'win'|'lose'|'escape',
 *      nextNodeId?: string | null
 *    }
 *
 * DATA/DEPENDENCIES:
 *  - BattleAPI.startBattle(playerId, battleNodeId) (server-sim canonical path)
 *  - PlayersAPI.updatePlayer()       // persist post-battle HP/MP/XP/gold/inventory
 *  - DataContext for lookups (spells/skills/items/monsters/villains) if client-sim is used
 *
 * ACTION RULES (documented; mirror backend formulas):
 *  - Turn order: sort all alive combatants by AGI each round (random small jitter on ties).
 *  - Physical basic attack damage: D = base(0) + STR * 1.0 → armor & physicalTaken% → element imbues → crit → clamp ≥ 0
 *  - Magical basic attack (no element): D = base(0) + INT * 1.0 → magicalTaken% → clamp
 *  - Elements pipeline:
 *      attacker.offense[element] ( +% ) → defender.resistance[element] ( -/+% ) → clamp final [-100..100] → apply
 *  - Crit chance = base(5%) + 1% * (DEX_player - DEX_target)   // clamp [0..100]; crit multiplier ×1.5
 *  - Escape chance = base(25%) + 1% * (AGI_player - AGI_highestEnemy) // clamp [5..95]
 *  - Regen at end of round: +END hp; +WIS mp (plus any regen effects)
 *  - DoT/HoT timing: tick at end of round; decrement duration
 *  - AoE: apply to all enemies (with falloff if defined)
 *  - Summons: add an ally entity with its own turn; duration turns if defined
 *
 * START FLOW:
 *  - startBattle(battleNodeId):
 *      • Preferred path: call BattleAPI.startBattle() — backend runs full sim, returns log, updated player, outcome, nextNodeId.
 *      • Set battle.outcome and nextNodeId; update PlayerContext with returned player state; notify caller to continue.
 *      • If server returns missing nextNodeId for outcome → throw error (UI alerts).
 *
 * CLIENT-SIM OPTION:
 *  - For snappy UX, you may mirror logic here, but backend remains source of truth.
 *  - If client-sim diverges, trust backend; reconcile using returned state.
 *
 * FAILURE MODES:
 *  - Network error, invalid node, missing enemies, etc. → throw error; UI shows alert and returns to story node.
 *
 * TRY→ALERT:
 *  - This hook throws normalized errors; Battle.tsx should catch and alert user.
 */

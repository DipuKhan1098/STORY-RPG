/**
 * battle.js
 * PURPOSE:
 *  - POST /battle/start
 *      body: { playerId, battleNodeId }
 *      → Loads player, enemies
 *      → Runs battleService turn-by-turn until win/lose/escape
 *      → Applies XP/gold/item rewards
 *      → Returns:
 *          { log: [turn-by-turn actions],
 *            player: updatedPlayer,
 *            outcome: 'win'|'lose'|'escape',
 *            nextNodeId }
 */

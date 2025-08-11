/**
 * battle.ts
 * PURPOSE:
 *  - Start and resolve battles via backend simulation.
 *
 * FUNCTIONS:
 *  - startBattle(playerId: string, battleNodeId: string): Promise<{
 *      log: string[];
 *      player: Player;                   // updated with HP/MP, XP, inventory changes
 *      outcome: 'win'|'lose'|'escape';
 *      nextNodeId: string | null;
 *    }>
 *
 * ENDPOINT:
 *  - POST /battle/start  body: { playerId, battleNodeId }
 *
 * TRY→ALERT:
 *  - If backend returns missing nextNodeId for outcome, throw Error so UI can alert.
 */

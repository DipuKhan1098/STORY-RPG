/**
 * players.ts
 * PURPOSE:
 *  - Create and manage player profiles + runtime state.
 *
 * FUNCTIONS:
 *  - listPlayers(): Promise<Player[]>                       // (future Continue screen)
 *  - getPlayer(id: string): Promise<Player>
 *  - createPlayer(payload: { name:string; gender:'male'|'female' }): Promise<Player>
 *  - updatePlayer(id: string, data: Partial<Player>): Promise<Player>
 *  - deletePlayer(id: string): Promise<void>
 *
 * GAME-SPECIFIC SHORTCUTS (optional helpers):
 *  - setRace(id: string, raceId: string): Promise<Player>
 *  - setClass(id: string, classId: string): Promise<Player>
 *  - equip(id: string, slot: string, itemId: string|null): Promise<Player>
 *  - useItem(id: string, itemId: string): Promise<Player>
 *
 * ENDPOINTS:
 *  - /players, /players/:id, and sub-routes (equip/use) if you expose them
 *
 * TRY→ALERT:
 *  - On create/update failures (validation), throw Error with friendly message.
 */

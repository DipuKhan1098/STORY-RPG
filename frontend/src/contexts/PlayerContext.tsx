/**
 * PlayerContext.tsx
 * PURPOSE:
 *  - Global React Context for the *current* player's full profile and runtime state.
 *  - Accessible in all game-related components (story, battle, shop, inventory, etc.).
 *
 * STORED STATE (mirrors Player type):
 *  - player: Player | null
 *  - isLoading: boolean   // true during API fetch/save
 *
 * PROVIDED FUNCTIONS (to implement):
 *  - loadPlayer(id: string): Promise<void>
 *      Calls GET /api/players/:id → sets player state.
 *
 *  - createPlayer(name: string, gender: 'male'|'female'): Promise<void>
 *      Calls POST /api/players → sets player state.
 *
 *  - updatePlayer(data: Partial<Player>): Promise<void>
 *      Calls PUT /api/players/:id → merges into state.
 *
 *  - setRace(raceId: string): Promise<void>
 *      Calls PUT /api/players/:id with raceId → updates state.
 *
 *  - setClass(classId: string): Promise<void>
 *      Calls PUT /api/players/:id with classId → updates state.
 *
 *  - equipItem(slot: string, itemId: string|null): Promise<void>
 *      Calls PUT /api/players/:id/equip → updates state.
 *
 *  - useItem(itemId: string): Promise<void>
 *      Calls PUT /api/players/:id/useItem → updates state.
 *
 *  - addXP(amount: number): void
 *      Adds XP locally + triggers levelService logic if threshold crossed.
 *
 *  - updateHP(amount: number): void
 *      Adds/subtracts HP locally; clamps between 0 and maxHp.
 *
 *  - useMana(amount: number): void
 *      Subtracts MP locally; clamps between 0 and maxMp.
 *
 * INTEGRATION:
 *  - Persists changes to backend when critical; local-only for transient battle changes unless backend simulation is used.
 *  - On logout or new game, reset player state to null.
 */

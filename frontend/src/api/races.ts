/**
 * races.ts
 * PURPOSE:
 *  - CRUD for player races.
 *
 * FUNCTIONS:
 *  - listRaces(): Promise<Race[]>
 *  - getRace(id: string): Promise<Race>
 *  - createRace(data: Partial<Race>): Promise<Race>                     // admin-only
 *  - updateRace(id: string, data: Partial<Race>): Promise<Race>         // admin-only
 *  - deleteRace(id: string): Promise<void>                              // admin-only
 */

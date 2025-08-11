/**
 * villains.ts
 * PURPOSE:
 *  - CRUD for villains (bosses) that can equip items.
 *
 * FUNCTIONS:
 *  - listVillains(): Promise<Villain[]>
 *  - getVillain(id: string): Promise<Villain>
 *  - createVillain(data: Partial<Villain>): Promise<Villain>            // admin-only
 *  - updateVillain(id: string, data: Partial<Villain>): Promise<Villain>// admin-only
 *  - deleteVillain(id: string): Promise<void>                           // admin-only
 */

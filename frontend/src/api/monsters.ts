/**
 * monsters.ts
 * PURPOSE:
 *  - CRUD for monsters used in battle nodes.
 *
 * FUNCTIONS:
 *  - listMonsters(): Promise<Monster[]>
 *  - getMonster(id: string): Promise<Monster>
 *  - createMonster(data: Partial<Monster>): Promise<Monster>            // admin-only
 *  - updateMonster(id: string, data: Partial<Monster>): Promise<Monster>// admin-only
 *  - deleteMonster(id: string): Promise<void>                           // admin-only
 */

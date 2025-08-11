/**
 * items.ts
 * PURPOSE:
 *  - CRUD helpers for items (equipment, potions, materials).
 *
 * FUNCTIONS:
 *  - listItems(): Promise<Item[]>
 *  - getItem(id: string): Promise<Item>
 *  - createItem(data: Partial<Item>): Promise<Item>                     // admin-only
 *  - updateItem(id: string, data: Partial<Item>): Promise<Item>         // admin-only
 *  - deleteItem(id: string): Promise<void>                              // admin-only
 *
 * ENDPOINTS:
 *  - /items, /items/:id
 *
 * NOTES:
 *  - When admin updates embedded abilities/spells/skills, server validates references.
 */

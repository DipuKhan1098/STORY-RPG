/**
 * spells.ts
 * PURPOSE:
 *  - CRUD helpers for magical actions scaling on INT.
 *
 * FUNCTIONS:
 *  - listSpells(): Promise<Spell[]>
 *  - getSpell(id: string): Promise<Spell>
 *  - createSpell(data: Partial<Spell>): Promise<Spell>                  // admin-only
 *  - updateSpell(id: string, data: Partial<Spell>): Promise<Spell>      // admin-only
 *  - deleteSpell(id: string): Promise<void>                             // admin-only
 *
 * ENDPOINTS:
 *  - /spells, /spells/:id
 *
 * VALIDATION (server-side summary for error mapping):
 *  - type in allowed set; scaling, elements, dot/summon fields shape; summon.monsterId exists.
 */

/**
 * abilities.ts
 * PURPOSE:
 *  - CRUD helpers for /abilities endpoints (admin + read for clients).
 *
 * FUNCTIONS (to implement):
 *  - listAbilities(): Promise<Ability[]>
 *  - getAbility(id: string): Promise<Ability>
 *  - createAbility(payload: Partial<Ability>): Promise<Ability>          // admin-only
 *  - updateAbility(id: string, payload: Partial<Ability>): Promise<Ability> // admin-only
 *  - deleteAbility(id: string): Promise<void>                            // admin-only
 *
 * REQUEST/RESPONSE:
 *  - GET /abilities
 *  - GET /abilities/:id
 *  - POST /abilities  (admin JWT)
 *  - PUT  /abilities/:id (admin JWT)
 *  - DELETE /abilities/:id (admin JWT)
 *
 * ERRORS & TRY→ALERT:
 *  - All functions throw normalized Error with message from server if present.
 *  - UI layers catch and show alert, then remain on current view.
 */

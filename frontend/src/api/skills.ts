/**
 * skills.ts
 * PURPOSE:
 *  - CRUD helpers for physical skills scaling on STR.
 *
 * FUNCTIONS:
 *  - listSkills(): Promise<Skill[]>
 *  - getSkill(id: string): Promise<Skill>
 *  - createSkill(data: Partial<Skill>): Promise<Skill>                  // admin-only
 *  - updateSkill(id: string, data: Partial<Skill>): Promise<Skill>      // admin-only
 *  - deleteSkill(id: string): Promise<void>                             // admin-only
 *
 * ENDPOINTS:
 *  - /skills, /skills/:id
 */

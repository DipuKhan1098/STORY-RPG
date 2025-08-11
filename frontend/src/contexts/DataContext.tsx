/**
 * DataContext.tsx
 * PURPOSE:
 *  - Global cache of *static* or semi-static game data (races, classes, items, spells, skills, abilities, monsters, villains, shops).
 *  - Prevents repeated API calls for resources that rarely change during a play session.
 *
 * STORED STATE:
 *  - races: Race[]
 *  - classes: Class[]
 *  - items: Item[]
 *  - spells: Spell[]
 *  - skills: Skill[]
 *  - abilities: Ability[]
 *  - monsters: Monster[]
 *  - villains: Villain[]
 *  - shops: Shop[]
 *  - isLoading: boolean
 *
 * PROVIDED FUNCTIONS:
 *  - loadAll(): Promise<void>
 *      Fetches all resources in parallel via API helpers; sets state.
 *
 *  - reload(type: string): Promise<void>
 *      Refetches a specific resource type if admin changes data.
 *
 *  - getById(type: string, id: string): T | undefined
 *      Utility to fetch an item from state arrays by ID.
 *
 * USAGE:
 *  - Wrapped around <App /> in index.tsx.
 *  - Game pages & admin pages read from here for dropdowns, cards, etc.
 */

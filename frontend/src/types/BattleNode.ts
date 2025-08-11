/**
 * BattleNode.ts
 * PURPOSE:
 *  - (Optional) Dedicated battle composition node if you keep it separate from StoryNode.
 *
 * FIELDS:
 *  - id, storyId, title, description
 *  - enemies: { kind:'monster'|'villain'; id:string }[]
 *  - environment?: string
 *  - rewards?: Rewards                         // bonus rewards in addition to enemy loot
 *  - nextOnWin?: string | null
 *  - nextOnLose?: string | null
 *  - nextOnEscape?: string | null
 */

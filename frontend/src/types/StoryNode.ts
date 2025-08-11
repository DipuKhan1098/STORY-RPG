/**
 * StoryNode.ts
 * PURPOSE:
 *  - Story graph node data used by the player client.
 *
 * TYPES:
 *  - NodeType: 'intro'|'shop'|'battle'|'end'|'story' (if you keep a generic story type)
 *
 * BASE FIELDS:
 *  - id: string
 *  - storyId: string
 *  - type: NodeType
 *  - title?: string
 *  - description?: string
 *  - asset?: AssetRef
 *
 * CHOICES (for intro, shop, end, story types):
 *  - Choice:
 *      {
 *        id:string;
 *        text:string;
 *        nextNodeId?: string;          // optional; may be omitted on End
 *        requirements?: Requirements;   // hide if unmet
 *        rewards?: Rewards;             // apply on pick
 *      }
 *  - choices?: Choice[]
 *
 * BATTLE-SPECIFIC:
 *  - monsters?: string[]                // MonsterId[] (and/or villains later)
 *  - environment?: string
 *  - nextOnWin?: string | null
 *  - nextOnLose?: string | null
 *  - nextOnEscape?: string | null
 */

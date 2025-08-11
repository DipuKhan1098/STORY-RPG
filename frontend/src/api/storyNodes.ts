/**
 * storyNodes.ts
 * PURPOSE:
 *  - Manage story graph nodes and provide data for the player client.
 *
 * FUNCTIONS:
 *  - listStories(): Promise<{ id:string; name:string; introId?:string }[]>   // admin
 *  - createStory(name: string): Promise<{ id:string; name:string; introId?:string }>
 *  - deleteStory(storyId: string): Promise<void>
 *
 *  - listNodes(storyId: string): Promise<StoryNode[]>
 *  - getNode(nodeId: string): Promise<StoryNode>
 *  - createNode(storyId: string, payload: Partial<StoryNode>): Promise<StoryNode>
 *  - updateNode(nodeId: string, payload: Partial<StoryNode>): Promise<StoryNode>
 *  - deleteNode(nodeId: string): Promise<void>
 *
 *  - typeaheadNodes(storyId: string, q: string): Promise<StoryNode[]>        // for linking nextNodeId
 *
 * GAME-SHORTCUT:
 *  - getPlayableNode(nodeId: string, playerId: string): Promise<StoryNode>   // server may pre-filter choices by requirements
 *
 * VALIDATION ERRORS:
 *  - One intro per story; missing nextNode targets; invalid references → throw with server message.
 */

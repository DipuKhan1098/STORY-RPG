/**
 * battleNodes.ts
 * PURPOSE:
 *  - CRUD helpers for dedicated battle compositions (if using a separate table).
 *
 * FUNCTIONS:
 *  - listBattleNodes(storyId?: string): Promise<BattleNode[]>
 *  - getBattleNode(id: string): Promise<BattleNode>
 *  - createBattleNode(data: Partial<BattleNode>): Promise<BattleNode>     // admin-only
 *  - updateBattleNode(id: string, data: Partial<BattleNode>): Promise<BattleNode> // admin-only
 *  - deleteBattleNode(id: string): Promise<void>                          // admin-only
 */

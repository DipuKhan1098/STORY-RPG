/**
 * useStory.ts
 * PURPOSE:
 *  - Encapsulate story flow for the player: loading nodes, filtering choices by requirements,
 *    applying rewards, and routing to special modes (battle/shop/end).
 *
 * EXPORTED API (to implement):
 *  - const { node, isLoading, error, loadNode, selectChoice, refresh } = useStory(playerId)
 *
 * STATE:
 *  - node: StoryNode | null        // current playable node
 *  - isLoading: boolean
 *  - error: string | null
 *
 * DEPENDENCIES:
 *  - PlayersAPI (to persist currentStoryNodeId and player rewards)
 *  - StoryAPI.getNode(nodeId)      // or .getPlayableNode(nodeId, playerId) if server pre-filters
 *  - PlayerContext (read/write player state: gold, items, stats, elements, currentStoryNodeId)
 *  - DataContext (optional lookups: items, abilities for tooltips)
 *
 * FUNCTIONS (behavior spec):
 *  - loadNode(nodeId?: string):
 *      • If nodeId provided → fetch node by id.
 *      • Else → if player.currentStoryNodeId present, use that; otherwise fetch the story’s intro node (admin-configured).
 *      • On success: set `node` and ensure choices are filtered:
 *          - For each choice, check requirements (stats/elements/level/items/questFlags) against PlayerContext.
 *          - Choice VISIBILITY policy:
 *              - We will HIDE unmet choices (as you requested). Optionally a “Show requirements” toggle can reveal them.
 *      • On failure: set `error` and leave previous `node` unchanged.
 *
 *  - selectChoice(choiceId: string):
 *      • Ensure `node` exists; find choice.
 *      • If choice has rewards → apply in order:
 *          1) Items: merge into inventory stacks.
 *          2) Gold: add to player.gold.
 *          3) Stats/Elements: add permanently to player.stats / player.elements (documented caps, if any).
 *          4) Quest flags: set in player.activeQuestState.
 *      • Persist player updates via PlayersAPI.updatePlayer().
 *      • Route behavior by node.type:
 *          - 'shop': switch to Shop UI with node.shopId.
 *          - 'battle': switch to Battle UI with node.id or referenced battleNodeId.
 *          - 'end'  : allow return to main menu or loop if nextNodeId present.
 *          - others : navigate to choice.nextNodeId (must exist unless end).
 *      • Update player.currentStoryNodeId = nextNodeId (unless entering battle/shop which will decide outcome).
 *      • Any failure → throw Error; caller (page component) shows alert and stays put.
 *
 * EDGE CASES:
 *  - Missing nextNodeId on non-`end` node → throw; StoryEditor should prevent this (admin validation).
 *  - Requirements shift due to equip/unequip mid-node (rare) → evaluate at click time, not load time.
 *  - Rewards that overflow inventory stacks → create multiple stacks (respect maxStack if defined).
 *
 * TRY→ALERT:
 *  - This hook throws normalized errors; UI should catch and alert user then remain in place.
 */

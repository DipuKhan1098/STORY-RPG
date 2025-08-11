/**
 * Game.tsx
 * PURPOSE:
 *  - High-level page that orchestrates the game loop (Story ↔ Battle ↔ Shop).
 *  - Always renders the ProfileSidebar (right) and StatsBar (top/bottom).
 *  - Loads the current story node and renders appropriate component:
 *      - If node.type === 'intro' or 'end' or generic 'story' → <StoryNode />
 *      - If node.type === 'battle' → renders <Battle /> (or navigates into battle mode)
 *      - If node.type === 'shop' → renders <Shop />
 *
 * DATA:
 *  - PlayerContext for playerId/current state.
 *  - useStory() hook:
 *      - loadNode(currentStoryNodeId)
 *      - selectChoice(choice) to apply rewards and move to next node
 *  - Optional: if currentStoryNodeId is null, fetch the story's intro nodeId to start.
 *
 * INTERACTIONS:
 *  - On mount: verify player has raceId and classId; if missing, alert and redirect to the correct step.
 *  - Transition between modes:
 *      - Story choice → may switch to Battle or Shop.
 *      - After Battle outcome, navigate using node.nextOnWin/nextOnLose/nextOnEscape.
 *
 * TRY→ALERT:
 *  - Any data load or transition failure → alert and remain in current view.
 */

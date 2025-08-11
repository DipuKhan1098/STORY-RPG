/**
 * StoryNode.tsx
 * PURPOSE:
 *  - Render the narrative content for a story node.
 *  - Display:
 *      - Node text
 *      - Optional image
 *      - Available choices (filtered by requirements)
 *  - Handle player choice selection.
 *
 * UI ELEMENTS:
 *  - Title (if any)
 *  - Narrative text (multiline, may include formatting)
 *  - Image panel (optional, pulled from node.image asset path)
 *  - Choices rendered as buttons or cards
 *      - Disabled/hidden if requirements not met
 *      - On hover: show requirements tooltip
 *
 * INTERACTIONS:
 *  - On choice click:
 *      1. Call `selectChoice(nextNodeId)` from useStory hook
 *      2. If choice leads to battle/shop, trigger game mode switch
 *      3. If choice has rewards, apply them via PlayerContext
 *
 * PROPS:
 *  - node: StoryNode (type from /types/StoryNode.ts)
 *  - onChoiceSelect: function
 *
 * DATA SOURCES:
 *  - useStory() hook to load current node data from backend
 *  - PlayerContext for player state to check requirements
 */

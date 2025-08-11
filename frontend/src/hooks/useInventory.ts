/**
 * useInventory.ts
 * PURPOSE:
 *  - Centralize inventory & equipment actions for the player.
 *  - Keeps Inventory/Equipment UIs thin and declarative.
 *
 * EXPORTED API (to implement):
 *  - const {
 *      isWorking,             // network or processing flag
 *      addItem,               // (itemId, qty=1)
 *      removeItem,            // (itemId, qty=1)  // dispose
 *      useItem,               // (itemId) → applies potion/buff effects
 *      equip,                 // (slot, itemId) → validates requirements; swaps if occupied
 *      unequip,               // (slot)
 *      canEquip,              // (itemId) => boolean | reason
 *      getEquipped,           // () => map of slots
 *    } = useInventory(playerId)
 *
 * STATE/DEPS:
 *  - PlayerContext for player + setter
 *  - DataContext for item definitions
 *  - PlayersAPI for persistence
 *
 * EQUIP RULES:
 *  - Requirements check:
 *      • level, stats, classIds, raceIds, element mastery (>= thresholds)
 *  - On equip:
 *      • Apply bonuses (stats, offense/resistance, armor, taken%), and *grant* embedded abilities/spells/skills
 *  - On unequip:
 *      • Remove bonuses and *revoke* embedded grants unless also learned from another source
 *  - Rings:
 *      • Decide mapping to ringLeft/ringRight deterministically
 *  - Potions:
 *      • potionSlot placeholder equips a stack into potion1/potion2 (inventory qty source of truth)
 *
 * USE RULES:
 *  - Potion kinds:
 *      • heal/mpHeal: add to hp/mp (clamp)
 *      • statBuff/regeneration: add temp effect with durationTurns
 *      • statPermanent/elementBuff: commit to player.stats/elements permanently
 *  - After use: decrement inventory stack; remove item if qty <= 0
 *
 * SHOP MODES:
 *  - buy/sell handled by ShopsAPI; this hook exposes helpers to reflect resulting inventory state.
 *
 * TRY→ALERT:
 *  - Any failure to equip/use/dispose should throw Error; UI catches and alerts, then revert UI.
 */

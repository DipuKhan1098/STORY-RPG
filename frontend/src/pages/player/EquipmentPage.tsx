/**
 * EquipmentPage.tsx
 * PURPOSE:
 *  - Standalone route wrapper for equipment management (same UI can be a panel inside Game).
 *  - Embeds <Equipment /> component (from components/Game) or reuses Inventory with an "Equipment" tab.
 *
 * UI:
 *  - Shows 11 equipment slots (head, body, leg, shoe, mainWeapon, offWeapon, ringLeft, ringRight, necklace, potion1, potion2).
 *  - Equip/unequip/use potion actions; tooltips for requirements not met; embedded grants badges.
 *
 * DATA:
 *  - Uses PlayerContext + API PUT /api/players/:id for persistence.
 *
 * TRY→ALERT:
 *  - Equip/unequip/use fails → alert & revert.
 */

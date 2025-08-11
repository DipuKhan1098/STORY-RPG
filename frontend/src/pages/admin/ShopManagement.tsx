/**
 * ShopManagement.tsx
 * PURPOSE:
 *  - CRUD interface for Shops.
 *
 * UI:
 *  - Table view: name, description, item count, multipliers.
 *  - Actions:
 *      - Create Shop → form:
 *          - name, description
 *          - add items via typeahead (itemId + custom price if override)
 *          - buy/sell multipliers
 *      - Edit, Delete
 *
 * DATA:
 *  - GET /api/shops
 *  - POST /api/shops
 *  - PUT /api/shops/:id
 *  - DELETE /api/shops/:id
 */

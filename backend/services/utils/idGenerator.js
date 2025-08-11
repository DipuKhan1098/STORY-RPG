/**
 * idGenerator.js
 * PURPOSE:
 *  - Generate unique IDs for new records in JSON tables
 *  - Format: prefix + '_' + random string
 *  - Prefix examples: abl, spl, skl, itm, shp, mon, vil, cls, rac, ply, sto, btl, qst
 *
 * EXPORTS:
 *  - generateId(prefix: string): string
 */

function generateId(prefix) {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${random}`;
}

module.exports = {
  generateId
};
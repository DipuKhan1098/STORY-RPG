/**
 * fileService.js
 * PURPOSE:
 *  - Central utility for reading/writing JSON "tables" in /backend/data
 *  - Wraps Node's fs/promises with:
 *      - JSON parse/stringify
 *      - Locking to prevent concurrent write corruption
 *      - Error handling and consistent responses
 *
 * EXPORTS:
 *  - readJSON(fileName): Promise<object|array>
 *      → Reads and parses JSON file from /data
 *  - writeJSON(fileName, data): Promise<void>
 *      → Stringifies and writes data to file
 *  - updateJSON(fileName, updaterFn): Promise<updatedData>
 *      → Reads, runs updaterFn on parsed data, writes back, returns updated
 *
 * USAGE:
 *  - All routes/services that mutate data should go through fileService
 *  - Ensures no partial writes, avoids direct fs usage in routes
 *
 * NOTES:
 *  - fileName parameter excludes path; service automatically resolves to /data
 *  - Could later be swapped with a DB without changing higher-level code
 */

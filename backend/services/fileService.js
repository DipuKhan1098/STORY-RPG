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

const fs = require('fs-extra');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Simple in-memory lock to prevent concurrent writes
const locks = new Map();

async function acquireLock(fileName) {
  while (locks.has(fileName)) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  locks.set(fileName, true);
}

function releaseLock(fileName) {
  locks.delete(fileName);
}

async function readJSON(fileName) {
  try {
    const filePath = path.join(DATA_DIR, fileName);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`File ${fileName} not found`);
    }
    throw new Error(`Failed to read ${fileName}: ${error.message}`);
  }
}

async function writeJSON(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);
  
  await acquireLock(fileName);
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } finally {
    releaseLock(fileName);
  }
}

async function updateJSON(fileName, updaterFn) {
  await acquireLock(fileName);
  try {
    const data = await readJSON(fileName);
    const updatedData = updaterFn(data);
    await writeJSON(fileName, updatedData);
    return updatedData;
  } finally {
    releaseLock(fileName);
  }
}

module.exports = {
  readJSON,
  writeJSON,
  updateJSON
};
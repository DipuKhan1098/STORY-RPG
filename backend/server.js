/**
 * server.js
 * PURPOSE:
 *  - Entry point for backend server
 *  - Sets up:
 *      - Express app
 *      - Middleware (JSON parsing, CORS, static files)
 *      - Route mounting for all API endpoints
 *      - Error handling
 *
 * FLOW:
 *  1. Import dependencies
 *  2. Create Express app
 *  3. Apply middleware:
 *      - express.json() to parse JSON request bodies
 *      - cors() to allow frontend access
 *      - express.static() to serve uploads and possibly frontend build
 *  4. Mount all routers from /routes
 *  5. Global error handler
 *  6. Start server on PORT (default 5000)
 *
 * NOTES:
 *  - All data access in routes should go through fileService
 *  - For security, only /uploads and safe API routes are exposed publicly
 *  - Admin routes should use auth middleware to check JWT token
 */

// 1. Import dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');

// 2. Create app
const app = express();

// 3. Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded assets statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. Mount routes (placeholder — real code would require each router file)
// Example:
// const spellsRouter = require('./routes/spells');
// app.use('/spells', spellsRouter);

// 5. Error handler middleware (basic)
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 6. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));

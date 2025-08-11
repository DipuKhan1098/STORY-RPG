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

// Import route handlers
const abilitiesRouter = require('./routes/abilities');
const spellsRouter = require('./routes/spells');
const skillsRouter = require('./routes/skills');
const itemsRouter = require('./routes/items');
const shopsRouter = require('./routes/shops');
const monstersRouter = require('./routes/monsters');
const villainsRouter = require('./routes/villains');
const classesRouter = require('./routes/classes');
const racesRouter = require('./routes/races');
const playersRouter = require('./routes/players');
const storyNodesRouter = require('./routes/storyNodes');
const battleNodesRouter = require('./routes/battleNodes');
const battleRouter = require('./routes/battle');
const authRouter = require('./routes/auth');

// 2. Create app
const app = express();

// 3. Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve uploaded assets statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 4. Mount routes
app.use('/abilities', abilitiesRouter);
app.use('/spells', spellsRouter);
app.use('/skills', skillsRouter);
app.use('/items', itemsRouter);
app.use('/shops', shopsRouter);
app.use('/monsters', monstersRouter);
app.use('/villains', villainsRouter);
app.use('/classes', classesRouter);
app.use('/races', racesRouter);
app.use('/players', playersRouter);
app.use('/storyNodes', storyNodesRouter);
app.use('/battleNodes', battleNodesRouter);
app.use('/battle', battleRouter);
app.use('/auth', authRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 5. Error handler middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 6. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
/**
 * index.tsx
 * PURPOSE:
 *  - Entry point for the React frontend (player + admin combined).
 *  - Mounts the <App /> component inside #root in public/index.html.
 *  - Wraps <App /> in BrowserRouter for routing and in global Context providers
 *    (PlayerContext, DataContext, AdminAuthContext).
 *
 * FLOW:
 *  1. Import global styles (CSS or SCSS).
 *  2. Render <App /> inside <BrowserRouter>.
 *  3. Wrap with contexts:
 *       - <AdminAuthProvider>  // manages admin login state
 *       - <PlayerProvider>     // manages current player profile
 *       - <DataProvider>       // caches game data lists
 *
 * DEV NOTES:
 *  - This is the top-level integration point; all routes are declared in App.tsx.
 *  - Contexts here ensure they are available anywhere in the component tree.
 *
 * ERROR HANDLING:
 *  - If any provider throws on init (e.g., invalid stored token), catch and log, then render fallback UI.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  
  // Fallback UI
  root.render(
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Failed to Load Application</h1>
        <p className="text-gray-400 mb-4">
          There was an error initializing the game. Please refresh the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
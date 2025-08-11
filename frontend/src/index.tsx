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

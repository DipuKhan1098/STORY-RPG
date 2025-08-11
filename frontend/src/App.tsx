/**
 * App.tsx
 * PURPOSE:
 *  - Defines all frontend routes using React Router v6.
 *  - Splits navigation between:
 *      - Player paths (/play, /player/*)
 *      - Admin paths (/admin/*)
 *  - Handles admin authentication guard.
 *
 * ROUTES (high-level):
 *  - "/" → Landing page (Play / Admin)
 *  - "/play" → PlayerMenuPage (New Game / Continue)
 *  - "/player/new" → NewGamePage (name + gender)
 *  - "/player/race" → RaceSelectPage
 *  - "/player/class" → ClassSelectPage
 *  - "/player/game" → GamePage (story/battle/shop loop)
 *  - "/admin/login" → AdminLoginPage
 *  - "/admin" → AdminPage (dashboard, editors)
 *
 * ADMIN GUARD:
 *  - Wrap /admin/* routes in a component that checks AdminAuthContext.isAuthenticated.
 *  - If false → redirect to /admin/login.
 *
 * PLAYER CONTEXT:
 *  - Player routes can assume PlayerContext.player exists after New Game or Continue.
 *  - If missing → redirect to /play.
 *
 * ERROR HANDLING:
 *  - Routes should catch navigation or API errors and follow Try→Alert pattern.
 *  - Global error boundary can be added here to catch render errors.
 *
 * DEV NOTE:
 *  - Lazy load heavy admin editor components to keep initial bundle size smaller.
 */

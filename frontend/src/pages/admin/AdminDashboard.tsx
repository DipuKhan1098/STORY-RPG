/**
 * AdminDashboard.tsx
 * PURPOSE:
 *  - Landing page after successful admin login.
 *  - Acts as the "Home" view for the admin panel.
 *
 * UI:
 *  - Collapsible left-hand nav (Home, Dashboard, Race Management, Class Management, Items, Shops, Monsters, Villains, Spells, Skills, Abilities, Story Editor, Battle Nodes, Quests, etc.).
 *  - Main area:
 *      - Welcome banner
 *      - Summary metrics (counts of races, classes, items, shops, monsters, stories, etc.)
 *      - Quick links to most-used editors.
 *
 * DATA:
 *  - GET requests to each resource’s /count endpoint OR GET full list and count locally.
 *  - Requires admin auth token; if missing/invalid → redirect to /admin/login.
 *
 * NAVIGATION:
 *  - Sidebar links navigate to the corresponding admin management pages.
 */

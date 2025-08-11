/**
 * auth.ts
 * PURPOSE:
 *  - Admin authentication helpers (login, verify).
 *
 * FUNCTIONS:
 *  - loginAdmin(username: string, password: string): Promise<{ token:string }>
 *      POST /auth/login
 *      → Stores token in localStorage/sessionStorage for subsequent admin requests.
 *
 *  - verifyToken(token?: string): Promise<boolean>
 *      GET /auth/verify     // returns 200 if valid, else 401
 *
 * NOTES:
 *  - All admin-only API helpers should attach Authorization: Bearer <token>.
 *  - If 401 is received mid-session, UI should redirect to /admin/login.
 */

/**
 * AdminAuthContext.tsx
 * PURPOSE:
 *  - Global auth state for the admin panel.
 *
 * STORED STATE:
 *  - token: string | null
 *  - isAuthenticated: boolean
 *  - isLoading: boolean
 *
 * PROVIDED FUNCTIONS:
 *  - login(username: string, password: string): Promise<void>
 *      Calls AuthAPI.loginAdmin(); stores token; sets isAuthenticated = true.
 *
 *  - logout(): void
 *      Clears token; sets isAuthenticated = false; redirect to /admin/login.
 *
 *  - verify(): Promise<boolean>
 *      Calls AuthAPI.verifyToken(); updates isAuthenticated based on result.
 *
 *  - getAuthHeader(): Record<string,string>
 *      Returns Authorization header if token exists.
 *
 * TOKEN STORAGE:
 *  - Store token in localStorage (persist between sessions).
 *  - Restore token on mount; auto-verify to prevent stale sessions.
 *
 * USAGE:
 *  - Wrapped around admin routes in App.tsx.
 *  - All admin API calls read token via getAuthHeader().
 */

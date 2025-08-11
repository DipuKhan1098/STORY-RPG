/**
 * useAdminAuth.ts
 * PURPOSE:
 *  - Thin hook wrapper around AdminAuthContext for convenience in admin pages.
 *
 * EXPORTED API (to implement):
 *  - const { token, isAuthenticated, isLoading, login, logout, verify, getAuthHeader } = useAdminAuth()
 *
 * BEHAVIOR:
 *  - On mount:
 *      • Attempt to restore token from localStorage.
 *      • Call verify() to confirm validity.
 *      • If invalid → clear token and redirect to /admin/login.
 *
 * ERROR HANDLING:
 *  - login errors propagate as Error objects; pages show toast/alert.
 *  - verify failures should not loop; debounce repeated checks.
 *
 * INTEGRATION:
 *  - Admin pages guard: if not authenticated → redirect to /admin/login.
 *  - API modules read Authorization header from here to attach JWT.
 */

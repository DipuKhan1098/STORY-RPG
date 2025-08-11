/**
 * _config.ts
 * PURPOSE:
 *  - Centralize API client configuration (base URL, headers, auth).
 *  - All API modules import from here to avoid duplication.
 *
 * ENV:
 *  - Uses environment variable for backend URL:
 *      - VITE_API_BASE_URL (Vite) or REACT_APP_API_BASE_URL (CRA)
 *  - Default fallback: http://localhost:5000
 *
 * AUTH:
 *  - Include admin JWT token when calling admin-only endpoints.
 *  - Token source: localStorage/sessionStorage (e.g., 'admin_token').
 *
 * EXPORTS (to implement):
 *  - getBaseUrl(): string
 *  - getAuthHeaders(): Record<string, string>  // { Authorization: `Bearer ${token}` } if present
 *  - handleResponse<T>(resp): Promise<T>       // unwraps .json(), throws on !ok with readable message
 *  - handleError(e): never                     // rethrows after normalizing error message text
 */

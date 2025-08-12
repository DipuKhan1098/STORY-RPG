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

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PlayerProvider } from './contexts/PlayerContext';
import { DataProvider } from './contexts/DataContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';

// Landing and Player pages
import LandingPage from './pages/LandingPage';
import PlayerMenuPage from './pages/player/PlayerMenu';


// Admin pages (lazy loaded)
import AdminLoginPage from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Admin guard component
const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // This would use AdminAuthContext to check authentication
  // For now, just render children
  return <>{children}</>;
};

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AdminAuthProvider>
          <DataProvider>
            <PlayerProvider>
              <div className="min-h-screen bg-gray-900 text-white">
                <Routes>
                  {/* Landing */}
                  <Route path="/" element={<LandingPage />} />
                  
                  {/* Player routes */}
                  <Route path="/play" element={<PlayerMenuPage />} />
                 
                  
                  
                  {/* Admin routes */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route 
                    path="/admin/*" 
                    element={
                      <AdminGuard>
                        <AdminDashboard />
                      </AdminGuard>
                    } 
                  />
                  
                  {/* Catch all */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </PlayerProvider>
          </DataProvider>
        </AdminAuthProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
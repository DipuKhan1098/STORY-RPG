/**
 * AdminLogin.tsx
 * PURPOSE:
 *  - Admin authentication page
 *  - Simple login form with username/password
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      alert('Please enter both username and password.');
      return;
    }

    setLoginLoading(true);
    try {
      await login(username.trim(), password);
      navigate('/admin');
    } catch (error) {
      alert(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleBack = () => {
    try {
      navigate('/');
    } catch (error) {
      alert('Failed to navigate back. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="text-center">
          <div className="text-4xl mb-4">⚙️</div>
          <p className="text-xl text-white">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="w-full max-w-md animate-slide-in">
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">⚙️</div>
            <h1 className="text-3xl font-bold mb-2 text-white">
              Admin Panel
            </h1>
            <p className="text-gray-300">
              Sign in to manage game content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Enter admin username"
                disabled={loginLoading}
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter admin password"
                disabled={loginLoading}
                autoComplete="current-password"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                type="submit"
                disabled={!username.trim() || !password.trim() || loginLoading}
                className="w-full btn btn-primary btn-lg"
              >
                {loginLoading ? 'Signing In...' : 'Sign In'}
              </button>
              
              <button
                type="button"
                onClick={handleBack}
                disabled={loginLoading}
                className="w-full btn btn-secondary"
              >
                ← Back to Main Menu
              </button>
            </div>
          </form>

          {/* Default Credentials Info */}
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Default Credentials:</h3>
            <div className="text-sm text-gray-400 space-y-1">
              <div>Username: <code className="text-gray-200">admin</code></div>
              <div>Password: <code className="text-gray-200">admin123</code></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Change these in production via environment variables
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
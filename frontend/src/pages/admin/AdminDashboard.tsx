/**
 * AdminDashboard.tsx
 * PURPOSE:
 *  - Landing page after successful admin login.
 *  - Acts as the "Home" view for the admin panel.
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { useDataContext } from '../../contexts/DataContext';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const { 
    races, classes, items, spells, skills, abilities, monsters, villains, shops,
    isLoading: dataLoading 
  } = useDataContext();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="text-4xl mb-4">⚙️</div>
          <p className="text-xl text-white">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    { name: 'Races', count: races.length, icon: '🧬', color: 'bg-blue-600' },
    { name: 'Classes', count: classes.length, icon: '⚔️', color: 'bg-green-600' },
    { name: 'Items', count: items.length, icon: '🎒', color: 'bg-purple-600' },
    { name: 'Spells', count: spells.length, icon: '✨', color: 'bg-pink-600' },
    { name: 'Skills', count: skills.length, icon: '🥊', color: 'bg-orange-600' },
    { name: 'Abilities', count: abilities.length, icon: '💪', color: 'bg-red-600' },
    { name: 'Monsters', count: monsters.length, icon: '👹', color: 'bg-gray-600' },
    { name: 'Villains', count: villains.length, icon: '👑', color: 'bg-indigo-600' },
    { name: 'Shops', count: shops.length, icon: '🏪', color: 'bg-yellow-600' },
  ];

  const quickActions = [
    { name: 'Race Management', path: '/admin/races', icon: '🧬', description: 'Manage player races' },
    { name: 'Class Management', path: '/admin/classes', icon: '⚔️', description: 'Manage player classes' },
    { name: 'Item Management', path: '/admin/items', icon: '🎒', description: 'Manage equipment and items' },
    { name: 'Story Editor', path: '/admin/stories', icon: '📖', description: 'Create and edit story content' },
    { name: 'Monster Management', path: '/admin/monsters', icon: '👹', description: 'Manage enemies and creatures' },
    { name: 'Shop Management', path: '/admin/shops', icon: '🏪', description: 'Configure shops and trading' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400">Manage your turn-based RPG game content</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="card">
            <div className="flex items-center gap-4">
              <div className="text-4xl">👋</div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Welcome to the Admin Panel</h2>
                <p className="text-gray-400">
                  Manage all aspects of your turn-based RPG game from races and classes to stories and battles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Content Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {stats.map((stat) => (
              <div key={stat.name} className="card">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-xl`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {dataLoading ? '...' : stat.count}
                    </div>
                    <div className="text-sm text-gray-400">{stat.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <button
                key={action.name}
                onClick={() => navigate(action.path)}
                className="card card-hover text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{action.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{action.name}</h3>
                    <p className="text-sm text-gray-400">{action.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">System Status</h2>
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl mb-2">🟢</div>
                <div className="text-sm font-semibold text-white">API Status</div>
                <div className="text-xs text-gray-400">Connected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-semibold text-white">Data Loading</div>
                <div className="text-xs text-gray-400">
                  {dataLoading ? 'Loading...' : 'Complete'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔐</div>
                <div className="text-sm font-semibold text-white">Authentication</div>
                <div className="text-xs text-gray-400">Authenticated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
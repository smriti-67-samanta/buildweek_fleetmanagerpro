import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import {
  Bell,
  Settings,
  User,
  LogOut,
  Search,
  Plus,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Calendar,
  Clock,
  ChevronDown,
  MessageSquare,
  HelpCircle,
  Sun,
  Moon,
  Zap
} from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({
    activeVehicles: 18,
    ongoingTrips: 6,
    alerts: 3,
    efficiency: '92%'
  });

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setShowUserDropdown(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const quickActions = [
    { label: 'New Trip', icon: Plus, color: 'bg-blue-500 hover:bg-blue-600' },
    { label: 'Refresh', icon: RefreshCw, color: 'bg-green-500 hover:bg-green-600' },
    { label: 'Reports', icon: BarChart3, color: 'bg-purple-500 hover:bg-purple-600' }
  ];

  if (!user) {
    return null;
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left side - Stats and Quick Actions */}
          <div className="flex items-center space-x-6">
            {/* Quick Stats */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-yellow-300 mr-2" />
                  <span className="text-sm font-semibold">Efficiency: {stats.efficiency}</span>
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-300 mr-2" />
                  <span className="text-sm font-semibold">{stats.activeVehicles} Active</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className={`${action.color} text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-md`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right side - User, Time, and Utilities */}
          <div className="flex items-center space-x-4">
            {/* Date and Time */}
            <div className="hidden md:flex flex-col items-end text-white/90">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{currentTime.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            {/* Utilities */}
            <div className="flex items-center space-x-1">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title={darkMode ? 'Light mode' : 'Dark mode'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Messages */}
              <button className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors relative">
                <MessageSquare className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-green-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </button>

              {/* Notifications */}
              <button className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  5
                </span>
              </button>

              {/* Help */}
              <button className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                <HelpCircle className="h-5 w-5" />
              </button>

              {/* Settings */}
              <button className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                  <span className="text-white font-semibold text-sm">
                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-xs text-white/80">
                    {user?.email?.split('@')[0] || 'Admin'}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-white/80" />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 dropdown">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email || 'Administrator'}
                    </p>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                      👤 Profile Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                      ⚙️ Account Preferences
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                      🔔 Notification Settings
                    </button>
                  </div>
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md flex items-center transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Bar - Search and Additional Info */}
        <div className="flex items-center justify-between pb-3">
          {/* Welcome Message */}
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1">
              <span className="text-sm font-medium">
                Welcome back, {user?.displayName || 'User'}! 👋
              </span>
            </div>
            <div className="hidden md:block bg-green-400/20 backdrop-blur-sm rounded-full px-4 py-1">
              <span className="text-sm font-medium text-green-100">
                🚀 System status: Operational
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80 h-5 w-5" />
              <input
                type="text"
                placeholder="Search vehicles, drivers, routes..."
                className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
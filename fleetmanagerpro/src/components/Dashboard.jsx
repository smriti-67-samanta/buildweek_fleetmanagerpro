import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  Users,
  MapPin,
  AlertTriangle,
  BarChart3,
  Wrench,
  Calendar,
  Fuel,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeVehicles: 0,
    totalDrivers: 0,
    maintenanceDue: 0,
    activeTrips: 0,
    alerts: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [vehicleStatus, setVehicleStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated data loading
  useEffect(() => {
    const loadDashboardData = () => {
      // Simulate API call delay
      setTimeout(() => {
        setStats({
          totalVehicles: 24,
          activeVehicles: 18,
          totalDrivers: 15,
          maintenanceDue: 3,
          activeTrips: 8,
          alerts: 2
        });

        setRecentActivity([
          {
            id: 1,
            type: 'maintenance',
            message: 'Vehicle TRK-001 completed oil change',
            time: '2 hours ago',
            icon: Wrench,
            color: 'blue'
          },
          {
            id: 2,
            type: 'vehicle',
            message: 'New vehicle added to fleet - Van-025',
            time: '1 day ago',
            icon: Truck,
            color: 'green'
          },
          {
            id: 3,
            type: 'alert',
            message: 'Vehicle TRK-008 needs immediate maintenance',
            time: '3 hours ago',
            icon: AlertTriangle,
            color: 'red'
          },
          {
            id: 4,
            type: 'trip',
            message: 'Trip completed: New York to Boston',
            time: '5 hours ago',
            icon: MapPin,
            color: 'purple'
          }
        ]);

        setVehicleStatus([
          { status: 'Active', count: 18, color: 'green', icon: CheckCircle },
          { status: 'Maintenance', count: 3, color: 'yellow', icon: Wrench },
          { status: 'Inactive', count: 3, color: 'red', icon: XCircle }
        ]);

        setIsLoading(false);
      }, 1000);
    };

    loadDashboardData();
  }, []);

  const statsCards = [
    {
      title: 'Total Vehicles',
      value: stats.totalVehicles,
      icon: Truck,
      color: 'blue',
      path: '/vehicles'
    },
    {
      title: 'Active Vehicles',
      value: stats.activeVehicles,
      icon: CheckCircle,
      color: 'green',
      path: '/vehicles'
    },
    {
      title: 'Total Drivers',
      value: stats.totalDrivers,
      icon: Users,
      color: 'purple',
      path: '/drivers'
    },
    {
      title: 'Maintenance Due',
      value: stats.maintenanceDue,
      icon: AlertTriangle,
      color: 'yellow',
      path: '/maintenance'
    },
    {
      title: 'Active Trips',
      value: stats.activeTrips,
      icon: MapPin,
      color: 'indigo',
      path: '/routes'
    },
    {
      title: 'Alerts',
      value: stats.alerts,
      icon: AlertTriangle,
      color: 'red',
      path: '/alerts'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Vehicles',
      description: 'View and manage your fleet',
      icon: Truck,
      path: '/vehicles',
      color: 'blue'
    },
    {
      title: 'Plan Routes',
      description: 'Create and optimize routes',
      icon: MapPin,
      path: '/routes',
      color: 'green'
    },
    {
      title: 'Schedule Maintenance',
      description: 'Plan vehicle maintenance',
      icon: Wrench,
      path: '/maintenance',
      color: 'yellow'
    },
    {
      title: 'View Reports',
      description: 'Analytics and insights',
      icon: BarChart3,
      path: '/reports',
      color: 'purple'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your fleet.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link
                key={index}
                to={stat.path}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={index}
                      to={action.path}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`p-2 rounded-full bg-${action.color}-100 mr-4`}>
                        <Icon className={`h-5 w-5 text-${action.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Vehicle Status Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Status</h2>
              <div className="space-y-4">
                {vehicleStatus.map((status, index) => {
                  const Icon = status.icon;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon className={`h-5 w-5 text-${status.color}-600 mr-2`} />
                        <span className="text-sm font-medium">{status.status}</span>
                      </div>
                      <span className="text-lg font-bold">{status.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Middle Column - Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <Link to="/activity" className="text-sm text-blue-600 hover:text-blue-800">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className={`p-2 rounded-full bg-${activity.color}-100 mr-4`}>
                        <Icon className={`h-5 w-5 text-${activity.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Maintenance */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Maintenance</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <Wrench className="h-5 w-5 text-yellow-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium">TRK-008 - Oil Change</p>
                      <p className="text-xs text-gray-600">Due in 2 days</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Schedule
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center">
                    <Wrench className="h-5 w-5 text-orange-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium">VAN-015 - Tire Rotation</p>
                      <p className="text-xs text-gray-600">Due in 5 days</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Schedule
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium">TRK-003 - Brake Inspection</p>
                      <p className="text-xs text-gray-600">OVERDUE</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Fuel Efficiency</p>
              <p className="text-xl font-bold text-gray-900">8.2 MPG</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Avg. Trip Time</p>
              <p className="text-xl font-bold text-gray-900">4.2 hrs</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Fuel className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Fuel Cost</p>
              <p className="text-xl font-bold text-gray-900">$2,340</p>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <Calendar className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Utilization Rate</p>
              <p className="text-xl font-bold text-gray-900">78%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle, XCircle, Filter, Clock } from 'lucide-react';

const Alerts = () => {
  const [alerts] = useState([
    {
      id: 1,
      type: 'maintenance',
      title: 'Vehicle TRK-008 needs immediate maintenance',
      description: 'Brake system requires urgent inspection',
      priority: 'high',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'unread'
    },
    {
      id: 2,
      type: 'route',
      title: 'Route deviation detected',
      description: 'Vehicle VAN-002 off planned route',
      priority: 'medium',
      timestamp: '2024-01-15T09:15:00Z',
      status: 'read'
    },
    {
      id: 3,
      type: 'driver',
      title: 'Driver hours exceeded',
      description: 'John Doe has exceeded weekly driving hours',
      priority: 'medium',
      timestamp: '2024-01-14T16:45:00Z',
      status: 'read'
    },
    {
      id: 4,
      type: 'vehicle',
      title: 'Low fuel alert',
      description: 'Truck-001 fuel level below 10%',
      priority: 'low',
      timestamp: '2024-01-14T14:20:00Z',
      status: 'resolved'
    }
  ]);

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800'
  };

  const statusColors = {
    unread: 'bg-blue-100 text-blue-800',
    read: 'bg-gray-100 text-gray-800',
    resolved: 'bg-green-100 text-green-800'
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h1>
          <div className="flex space-x-3">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Mark All Read
            </button>
          </div>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold">16</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent Alerts</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${priorityColors[alert.priority]}`}>
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{alert.title}</h3>
                      <p className="text-gray-600 mb-2">{alert.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded ${priorityColors[alert.priority]}`}>
                          {alert.priority} priority
                        </span>
                        <span className={`px-2 py-1 rounded ${statusColors[alert.status]}`}>
                          {alert.status}
                        </span>
                        <span>{new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {alert.status !== 'resolved' && (
                      <button className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Resolve
                      </button>
                    )}
                    <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
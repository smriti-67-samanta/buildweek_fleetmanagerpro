import React, { useState } from 'react';
import { Users, Plus, Phone, Mail, MapPin, Clock, Award, AlertTriangle } from 'lucide-react';

const Drivers = () => {
  const [drivers] = useState([
    {
      id: 1,
      name: 'John Doe',
      license: 'D1234567',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com',
      status: 'active',
      hoursThisWeek: '42',
      rating: '4.8'
    },
    {
      id: 2,
      name: 'Jane Smith',
      license: 'D7654321',
      phone: '+1 (555) 987-6543',
      email: 'jane.smith@example.com',
      status: 'active',
      hoursThisWeek: '38',
      rating: '4.9'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      license: 'D1122334',
      phone: '+1 (555) 456-7890',
      email: 'mike.johnson@example.com',
      status: 'on_leave',
      hoursThisWeek: '0',
      rating: '4.5'
    }
  ]);

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    on_leave: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-red-100 text-red-800'
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Driver Management</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Driver
          </button>
        </div>

        {/* Driver Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Drivers</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Active Drivers</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold">4.7</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">On Leave</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver) => (
            <div key={driver.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{driver.name}</h3>
                    <p className="text-gray-600">License: {driver.license}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[driver.status]}`}>
                  {driver.status.replace('_', ' ')}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm">{driver.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm">{driver.email}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm">{driver.hoursThisWeek} hours this week</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-sm">Rating: {driver.rating}/5.0</span>
                </div>
              </div>

              <div className="flex justify-between">
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
                  View Details
                </button>
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                  Assign Vehicle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drivers;
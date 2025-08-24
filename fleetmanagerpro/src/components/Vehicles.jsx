import React, { useState } from 'react';
import { Truck, Plus, Search, Filter, Edit, Trash2, MapPin, RefreshCw } from 'lucide-react';

const Vehicles = () => {
  const [vehicles] = useState([
    {
      id: 1,
      name: 'Truck-001',
      make: 'Ford',
      model: 'F-150',
      license: 'ABC123',
      status: 'active',
      mileage: 13250,
      location: 'New York',
      lastUpdate: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Van-002',
      make: 'Toyota',
      model: 'Camry',
      license: 'XYZ789',
      status: 'maintenance',
      mileage: 8910,
      location: 'Los Angeles',
      lastUpdate: '2024-01-14T15:45:00Z'
    },
    {
      id: 3,
      name: 'Truck-003',
      make: 'Chevrolet',
      model: 'Silverado',
      license: 'TRK456',
      status: 'inactive',
      mileage: 19200,
      location: 'Chicago',
      lastUpdate: '2024-01-13T09:15:00Z'
    }
  ]);

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-red-100 text-red-800'
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Vehicle Management</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Vehicle
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vehicles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Truck className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                    <p className="text-gray-600">{vehicle.make} {vehicle.model}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[vehicle.status]}`}>
                  {vehicle.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">License:</span>
                  <span className="font-medium">{vehicle.license}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mileage:</span>
                  <span className="font-medium">{vehicle.mileage.toLocaleString()} miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {vehicle.location}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Last update: {new Date(vehicle.lastUpdate).toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
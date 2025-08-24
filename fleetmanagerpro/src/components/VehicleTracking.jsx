// src/features/vehicles/VehicleTracking.jsx
import React, { useState } from 'react';


// Mock data for vehicles
const initialVehicles = [
  {
    id: 1,
    make: 'Ford',
    model: 'F-150',
    licensePlate: 'ABC123',
    initialMileage: 12500,
    currentMileage: 13250,
    status: 'active',
    location: { lat: 40.7128, lng: -74.0060 }, // New York
    lastUpdate: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    make: 'Toyota',
    model: 'Camry',
    licensePlate: 'XYZ789',
    initialMileage: 8200,
    currentMileage: 8910,
    status: 'maintenance',
    location: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    lastUpdate: '2024-01-14T15:45:00Z'
  },
  {
    id: 3,
    make: 'Chevrolet',
    model: 'Silverado',
    licensePlate: 'TRK456',
    initialMileage: 18500,
    currentMileage: 19200,
    status: 'inactive',
    location: { lat: 41.8781, lng: -87.6298 }, // Chicago
    lastUpdate: '2024-01-13T09:15:00Z'
  }
];

// Simulated cities for location updates
const cities = [
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298 },
  { name: 'Houston', lat: 29.7604, lng: -95.3698 },
  { name: 'Phoenix', lat: 33.4484, lng: -112.0740 },
  { name: 'Philadelphia', lat: 39.9526, lng: -75.1652 }
];

const VehicleTracking = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
    licensePlate: '',
    initialMileage: '',
    status: 'active'
  });

  // Status colors mapping
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-red-100 text-red-800'
  };

  // Status icons mapping
  const statusIcons = {
    active: CheckCircle,
    maintenance: AlertTriangle,
    inactive: XCircle
  };

  // Add new vehicle
  const handleAddVehicle = (e) => {
    e.preventDefault();
    const vehicle = {
      id: Date.now(),
      ...newVehicle,
      initialMileage: parseInt(newVehicle.initialMileage),
      currentMileage: parseInt(newVehicle.initialMileage),
      location: cities[Math.floor(Math.random() * cities.length)],
      lastUpdate: new Date().toISOString()
    };
    setVehicles([...vehicles, vehicle]);
    setNewVehicle({
      make: '',
      model: '',
      licensePlate: '',
      initialMileage: '',
      status: 'active'
    });
    setShowAddForm(false);
  };

  // Update vehicle location (simulated)
  const updateVehicleLocation = (vehicleId) => {
    setVehicles(vehicles.map(vehicle => {
      if (vehicle.id === vehicleId) {
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        return {
          ...vehicle,
          location: randomCity,
          lastUpdate: new Date().toISOString(),
          currentMileage: vehicle.currentMileage + Math.floor(Math.random() * 100) + 50
        };
      }
      return vehicle;
    }));
  };

  // Update all vehicles locations
  const updateAllLocations = () => {
    setVehicles(vehicles.map(vehicle => {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      return {
        ...vehicle,
        location: randomCity,
        lastUpdate: new Date().toISOString(),
        currentMileage: vehicle.currentMileage + Math.floor(Math.random() * 100) + 50
      };
    }));
  };

  // Delete vehicle
  const deleteVehicle = (vehicleId) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
    if (selectedVehicle?.id === vehicleId) {
      setSelectedVehicle(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Vehicle Tracking</h2>
        <div className="flex space-x-2">
          <button
            onClick={updateAllLocations}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Update All Locations
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Add Vehicle Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Vehicle</h3>
            <form onSubmit={handleAddVehicle}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Make</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={newVehicle.make}
                    onChange={(e) => setNewVehicle({...newVehicle, make: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Model</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">License Plate</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={newVehicle.licensePlate}
                    onChange={(e) => setNewVehicle({...newVehicle, licensePlate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Initial Mileage</label>
                  <input
                    type="number"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={newVehicle.initialMileage}
                    onChange={(e) => setNewVehicle({...newVehicle, initialMileage: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={newVehicle.status}
                    onChange={(e) => setNewVehicle({...newVehicle, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle List */}
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Vehicle List</h3>
          <div className="space-y-3">
            {vehicles.map(vehicle => {
              const StatusIcon = statusIcons[vehicle.status];
              return (
                <div
                  key={vehicle.id}
                  className={`border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow ${
                    selectedVehicle?.id === vehicle.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">{vehicle.make} {vehicle.model}</h4>
                        <p className="text-sm text-gray-600">{vehicle.licensePlate}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[vehicle.status]}`}>
                      <StatusIcon className="w-3 h-3 inline mr-1" />
                      {vehicle.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Mileage: {vehicle.currentMileage.toLocaleString()} miles</p>
                    <p>Last update: {new Date(vehicle.lastUpdate).toLocaleString()}</p>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateVehicleLocation(vehicle.id);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Update Location
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteVehicle(vehicle.id);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map View */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Vehicle Locations</h3>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center relative">
            {/* Simulated Map */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg">
              {/* Simulated map background */}
              <div className="absolute inset-0 opacity-30">
                <div className="grid grid-cols-3 gap-8 h-full">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="border border-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
              
              {/* Vehicle markers */}
              {vehicles.map(vehicle => {
                // Simple positioning simulation based on coordinates
                const left = 50 + (vehicle.location.lng / 10);
                const top = 50 - (vehicle.location.lat / 10);
                
                return (
                  <div
                    key={vehicle.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    <div className={`p-2 rounded-full ${
                      vehicle.status === 'active' ? 'bg-green-500' :
                      vehicle.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                    } text-white shadow-lg`}>
                      <Truck className="w-4 h-4" />
                    </div>
                    <div className="mt-1 text-xs bg-white px-2 py-1 rounded shadow">
                      {vehicle.licensePlate}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center z-10 bg-white p-6 rounded-lg shadow-lg">
              <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Simulated Map View</h4>
              <p className="text-gray-600 mb-4">
                This is a simulated map showing vehicle locations. In a real application,
                this would integrate with a mapping service like Google Maps or Mapbox.
              </p>
              <button
                onClick={updateAllLocations}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center mx-auto"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Simulate Location Updates
              </button>
            </div>
          </div>

          {/* Selected Vehicle Details */}
          {selectedVehicle && (
            <div className="mt-6 p-4 border rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Vehicle Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Make & Model</p>
                  <p className="font-medium">{selectedVehicle.make} {selectedVehicle.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">License Plate</p>
                  <p className="font-medium">{selectedVehicle.licensePlate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Mileage</p>
                  <p className="font-medium">{selectedVehicle.currentMileage.toLocaleString()} miles</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[selectedVehicle.status]}`}>
                    {selectedVehicle.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Location</p>
                  <p className="font-medium">
                    {cities.find(c => c.lat === selectedVehicle.location.lat)?.name || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="font-medium">{new Date(selectedVehicle.lastUpdate).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleTracking;
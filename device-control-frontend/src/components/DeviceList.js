import React, { useEffect, useState } from 'react';
import {
  getDevices,
  deleteDevice,
  togglePower,
  volumeUp,
  volumeDown,
  muteDevice
} from '../services/api';

const DeviceList = ({ onEdit }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await getDevices();
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      try {
        await deleteDevice(id);
        fetchDevices();
      } catch (error) {
        console.error('Error deleting device:', error);
      }
    }
  };

  const handlePower = async (id) => {
    try {
      await togglePower(id);
      fetchDevices();
    } catch (err) {
      console.error('Error toggling power:', err);
    }
  };

  const handleVolumeUp = async (id) => {
    try {
      await volumeUp(id);
      fetchDevices();
    } catch (err) {
      console.error('Error increasing volume:', err);
    }
  };

  const handleVolumeDown = async (id) => {
    try {
      await volumeDown(id);
      fetchDevices();
    } catch (err) {
      console.error('Error decreasing volume:', err);
    }
  };

  const handleMute = async (id) => {
    try {
      await muteDevice(id);
      fetchDevices();
    } catch (err) {
      console.error('Error muting device:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Device List</h2>
      <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">IP Address</th>
            <th className="py-2 px-4">Port</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr
              key={device.id}
              className={`${
                device.status === 'ON' ? 'bg-green-100' : 'bg-red-100'
              } hover:bg-gray-100`}
            >
              <td className="py-2 px-4">{device.id}</td>
              <td className="py-2 px-4">{device.name}</td>
              <td className="py-2 px-4">{device.type}</td>
              <td className="py-2 px-4">{device.ipAddress}</td>
              <td className="py-2 px-4">{device.port}</td>
              <td className="py-2 px-4">{device.status}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => onEdit(device)}
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:from-blue-600 hover:to-blue-800 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(device.id)}
                  className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full hover:from-red-600 hover:to-red-800 transition"
                >
                  Delete
                </button>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handlePower(device.id)}
                    className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full hover:from-yellow-500 hover:to-yellow-700 transition"
                  >
                    Power
                  </button>
                  {(device.type === 'MICROPHONE' || device.type === 'SPEAKER') && (
                    <>
                      <button
                        onClick={() => handleVolumeUp(device.id)}
                        className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full hover:from-green-500 hover:to-green-700 transition"
                      >
                        Vol +
                      </button>
                      <button
                        onClick={() => handleVolumeDown(device.id)}
                        className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full hover:from-red-500 hover:to-red-700 transition"
                      >
                        Vol -
                      </button>
                      <button
                        onClick={() => handleMute(device.id)}
                        className="px-5 py-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-full hover:from-gray-500 hover:to-gray-700 transition"
                      >
                        Mute
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceList;

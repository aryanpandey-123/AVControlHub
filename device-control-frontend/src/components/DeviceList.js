import React, { useEffect, useState } from 'react';
import {
  getDevices,
  deleteDevice,
  togglePower,
  volumeUp,
  volumeDown,
  muteDevice,
} from '../services/api';
import { toast } from 'react-toastify';

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
      toast.error('Failed to fetch devices');
      console.error('Error fetching devices:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      try {
        await deleteDevice(id);
        toast.success('Device deleted successfully');
        fetchDevices();
      } catch (error) {
        toast.error('Error deleting device');
        console.error('Error deleting device:', error);
      }
    }
  };

  const handlePower = async (id) => {
    try {
      await togglePower(id);
      toast.success('Power toggled');
      fetchDevices();
    } catch (err) {
      toast.error('Error toggling power');
      console.error('Error toggling power:', err);
    }
  };

  const handleVolumeUp = async (id) => {
    try {
      await volumeUp(id);
      toast.success('Volume increased');
      fetchDevices();
    } catch (err) {
      toast.error('Error increasing volume');
      console.error('Error increasing volume:', err);
    }
  };

  const handleVolumeDown = async (id) => {
    try {
      await volumeDown(id);
      toast.success('Volume decreased');
      fetchDevices();
    } catch (err) {
      toast.error('Error decreasing volume');
      console.error('Error decreasing volume:', err);
    }
  };

  const handleMute = async (id) => {
    try {
      await muteDevice(id);
      toast.success('Device muted');
      fetchDevices();
    } catch (err) {
      toast.error('Error muting device');
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
              <td className="py-2 px-4 space-y-2">
                <button
                  onClick={() => onEdit(device)}
                  className="w-full mb-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(device.id)}
                  className="w-full mb-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => handlePower(device.id)}
                  className="w-full mb-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Power
                </button>
                {(device.type === 'MICROPHONE' || device.type === 'SPEAKER') && (
                  <div className="space-y-1">
                    <button
                      onClick={() => handleVolumeUp(device.id)}
                      className="w-full px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Vol +
                    </button>
                    <button
                      onClick={() => handleVolumeDown(device.id)}
                      className="w-full px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500"
                    >
                      Vol -
                    </button>
                    <button
                      onClick={() => handleMute(device.id)}
                      className="w-full px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Mute
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceList;

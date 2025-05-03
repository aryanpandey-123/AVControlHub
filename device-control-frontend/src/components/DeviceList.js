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
    <div>
      <h2>Device List</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>IP Address</th>
            <th>Port</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.id}</td>
              <td>{device.name}</td>
              <td>{device.type}</td>
              <td>{device.ipAddress}</td>
              <td>{device.port}</td>
              <td>{device.status}</td>
              <td>
                <button onClick={() => onEdit(device)}>Edit</button>
                <button onClick={() => handleDelete(device.id)}>Delete</button>
                <div style={{ marginTop: '5px' }}>
                  <button onClick={() => handlePower(device.id)}>Power</button>
                  {(device.type === 'MICROPHONE' || device.type === 'SPEAKER') && (
                    <>
                      <button onClick={() => handleVolumeUp(device.id)}>Vol +</button>
                      <button onClick={() => handleVolumeDown(device.id)}>Vol -</button>
                      <button onClick={() => handleMute(device.id)}>Mute</button>
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

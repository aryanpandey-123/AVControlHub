import React, { useEffect, useState } from 'react';
import { getDevices, deleteDevice } from '../services/api';

const DeviceList = ({ onEdit }) => {
  const [devices, setDevices] = useState([]);

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
        fetchDevices(); // refresh list
      } catch (error) {
        console.error('Error deleting device:', error);
      }
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div>
      <h2>Device List</h2>
      {devices.length === 0 ? (
        <p>No devices found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>IP</th>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeviceList;

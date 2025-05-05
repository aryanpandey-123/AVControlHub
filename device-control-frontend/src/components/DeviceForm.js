import React, { useEffect, useState } from 'react';
import { createDevice, updateDevice } from '../services/api';

const initialFormState = {
  name: '',
  type: 'CAMERA',
  ipAddress: '',
  port: '',
  status: 'OFF'
};

const DeviceForm = ({ selectedDevice, onSuccess }) => {
  const [device, setDevice] = useState(initialFormState);

  useEffect(() => {
    if (selectedDevice) {
      setDevice(selectedDevice);
    } else {
      setDevice(initialFormState);
    }
  }, [selectedDevice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDevice({ ...device, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (device.id) {
        await updateDevice(device.id, device);
      } else {
        await createDevice(device);
      }
      onSuccess(); // to refresh list
      setDevice(initialFormState); // reset form
    } catch (error) {
      console.error('Error saving device:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {device.id ? 'Edit Device' : 'Add New Device'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          value={device.name}
          onChange={handleChange}
          placeholder="Device Name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="type"
          value={device.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="CAMERA">CAMERA</option>
          <option value="MICROPHONE">MICROPHONE</option>
          <option value="SPEAKER">SPEAKER</option>
          <option value="DISPLAY">DISPLAY</option>
        </select>

        <input
          type="text"
          name="ipAddress"
          value={device.ipAddress}
          onChange={handleChange}
          placeholder="IP Address"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="port"
          value={device.port}
          onChange={handleChange}
          placeholder="Port"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="status"
          value={device.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ON">ON</option>
          <option value="OFF">OFF</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          {device.id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default DeviceForm;

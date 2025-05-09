import React, { useState, useEffect } from 'react';
import { createDevice, updateDevice } from '../services/api';
import { toast } from 'react-toastify';

const DeviceForm = ({ deviceToEdit, onSaved }) => {
  const [device, setDevice] = useState({
    name: '',
    type: '',
    ipAddress: '',
    port: '',
  });

  useEffect(() => {
    if (deviceToEdit) {
      setDevice(deviceToEdit);
    }
  }, [deviceToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDevice({ ...device, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (deviceToEdit) {
        await updateDevice(device.id, device);
        toast.success('Device updated successfully');
      } else {
        await createDevice(device);
        toast.success('Device added successfully');
      }
      onSaved();
      setDevice({ name: '', type: '', ipAddress: '', port: '' });
    } catch (err) {
      toast.error('Error saving device');
      console.error('Error saving device:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {deviceToEdit ? 'Edit Device' : 'Add Device'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Device Name"
          value={device.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <select
          name="type"
          value={device.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        >
          <option value="">Select Type</option>
          <option value="PTZ_CAMERA">PTZ Camera</option>
          <option value="MICROPHONE">Microphone</option>
          <option value="SPEAKER">Speaker</option>
          <option value="DISPLAY">Display</option>
        </select>
        <input
          type="text"
          name="ipAddress"
          placeholder="IP Address"
          value={device.ipAddress}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="number"
          name="port"
          placeholder="Port"
          value={device.port}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {deviceToEdit ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default DeviceForm;

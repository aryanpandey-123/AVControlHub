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
    <div>
      <h2>{device.id ? 'Edit Device' : 'Add New Device'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={device.name}
          onChange={handleChange}
          placeholder="Device Name"
          required
        />
        <select name="type" value={device.type} onChange={handleChange}>
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
        />
        <input
          type="number"
          name="port"
          value={device.port}
          onChange={handleChange}
          placeholder="Port"
          required
        />
        <select name="status" value={device.status} onChange={handleChange}>
          <option value="ON">ON</option>
          <option value="OFF">OFF</option>
        </select>
        <button type="submit">{device.id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default DeviceForm;

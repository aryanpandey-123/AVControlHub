import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/devices';

// Get all devices
export const getDevices = () => {
  return axios.get(BASE_URL);
};

// Get a single device by ID
export const getDeviceById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

// Create a new device
export const createDevice = (device) => {
  return axios.post(BASE_URL, device);
};

// Update an existing device
export const updateDevice = (id, device) => {
  return axios.put(`${BASE_URL}/${id}`, device);
};

// Delete a device
export const deleteDevice = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

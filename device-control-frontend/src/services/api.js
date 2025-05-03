import axios from 'axios';

export const togglePower = (id) => axios.put(`${BASE_URL}/${id}/power`);
export const volumeUp = (id) => axios.put(`${BASE_URL}/${id}/volume/up`);
export const volumeDown = (id) => axios.put(`${BASE_URL}/${id}/volume/down`);
export const muteDevice = (id) => axios.put(`${BASE_URL}/${id}/mute`);

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

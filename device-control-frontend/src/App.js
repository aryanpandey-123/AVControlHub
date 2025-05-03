import React, { useState } from 'react';
import DeviceList from './components/DeviceList';
import DeviceForm from './components/DeviceForm';

function App() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleEdit = (device) => {
    setSelectedDevice(device);
  };

  const handleSuccess = () => {
    setSelectedDevice(null);
    setRefreshFlag(!refreshFlag); // toggle to refresh list
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Device Control Dashboard</h1>
      <DeviceForm selectedDevice={selectedDevice} onSuccess={handleSuccess} />
      <hr />
      <DeviceList onEdit={handleEdit} key={refreshFlag} />
    </div>
  );
}

export default App;

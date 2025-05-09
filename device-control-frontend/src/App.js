import React, { useState } from 'react';
import DeviceForm from './components/DeviceForm';
import DeviceList from './components/DeviceList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [deviceToEdit, setDeviceToEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSaved = () => {
    setDeviceToEdit(null);
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <DeviceForm deviceToEdit={deviceToEdit} onSaved={handleSaved} />
        <DeviceList onEdit={setDeviceToEdit} refresh={refresh} />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;

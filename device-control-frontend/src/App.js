import React, { useState } from 'react';
import DeviceForm from './components/DeviceForm';
import DeviceList from './components/DeviceList';

function App() {
  const [editingDevice, setEditingDevice] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Device Control Panel</h1>
          <p className="text-sm">Manage your PTZ Cameras, Speakers, Microphones, and Displays</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">{editingDevice ? 'Edit Device' : 'Add Device'}</h2>
          <DeviceForm editingDevice={editingDevice} setEditingDevice={setEditingDevice} />
        </section>

        <section className="bg-white p-6 rounded-2xl shadow md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Device List</h2>
          <DeviceList onEdit={setEditingDevice} />
        </section>
      </main>
    </div>
  );
}

export default App;

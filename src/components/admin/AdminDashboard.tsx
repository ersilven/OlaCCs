import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import BookingsTable from './BookingsTable';
import ServicesList from './services/ServicesList';
import EquipmentList from './equipment/EquipmentList';
import SettingsPanel from './settings/SettingsPanel';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');

  const renderContent = () => {
    switch (activeTab) {
      case 'bookings':
        return <BookingsTable />;
      case 'services':
        return <ServicesList />;
      case 'equipment':
        return <EquipmentList />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <BookingsTable />;
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-brand-brown text-brand-brown'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reservaciones
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'services'
                  ? 'border-brand-brown text-brand-brown'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Servicios
            </button>
            <button
              onClick={() => setActiveTab('equipment')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'equipment'
                  ? 'border-brand-brown text-brand-brown'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Equipamiento
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-brand-brown text-brand-brown'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Configuración
            </button>
          </nav>
        </div>
      </div>
      {renderContent()}
    </AdminLayout>
  );
}
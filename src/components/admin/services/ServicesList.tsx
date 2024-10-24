import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import ServiceForm from './ServiceForm';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  active: boolean;
}

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const storedServices = localStorage.getItem('adminServices');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  const handleSave = (service: Service) => {
    let updatedServices;
    if (editingService) {
      updatedServices = services.map(s => s.id === service.id ? service : s);
    } else {
      updatedServices = [...services, { ...service, id: Date.now().toString() }];
    }
    setServices(updatedServices);
    localStorage.setItem('adminServices', JSON.stringify(updatedServices));
    setIsFormOpen(false);
    setEditingService(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      const updatedServices = services.filter(s => s.id !== id);
      setServices(updatedServices);
      localStorage.setItem('adminServices', JSON.stringify(updatedServices));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif text-brand-brown">Servicios</h2>
          <button
            onClick={() => {
              setEditingService(null);
              setIsFormOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-brand-brown text-white rounded-md hover:bg-brand-dark transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Servicio
          </button>
        </div>

        {isFormOpen && (
          <ServiceForm
            service={editingService}
            onSave={handleSave}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingService(null);
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-brand-brown">{service.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingService(service);
                      setIsFormOpen(true);
                    }}
                    className="text-gray-600 hover:text-brand-brown"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{service.duration} min</span>
                <span>${service.price}</span>
              </div>
              <div className="mt-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  service.active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {service.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
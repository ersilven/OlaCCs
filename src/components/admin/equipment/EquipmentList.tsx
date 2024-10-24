import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import EquipmentForm from './EquipmentForm';

interface Equipment {
  id: string;
  name: string;
  description: string;
  quantity: number;
  status: 'available' | 'in-use' | 'maintenance';
  lastMaintenance: string;
}

export default function EquipmentList() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const storedEquipment = localStorage.getItem('adminEquipment');
    if (storedEquipment) {
      setEquipment(JSON.parse(storedEquipment));
    }
  }, []);

  const handleSave = (item: Equipment) => {
    let updatedEquipment;
    if (editingEquipment) {
      updatedEquipment = equipment.map(e => e.id === item.id ? item : e);
    } else {
      updatedEquipment = [...equipment, { ...item, id: Date.now().toString() }];
    }
    setEquipment(updatedEquipment);
    localStorage.setItem('adminEquipment', JSON.stringify(updatedEquipment));
    setIsFormOpen(false);
    setEditingEquipment(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
      const updatedEquipment = equipment.filter(e => e.id !== id);
      setEquipment(updatedEquipment);
      localStorage.setItem('adminEquipment', JSON.stringify(updatedEquipment));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in-use':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'in-use':
        return 'En uso';
      case 'maintenance':
        return 'Mantenimiento';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif text-brand-brown">Equipamiento</h2>
          <button
            onClick={() => {
              setEditingEquipment(null);
              setIsFormOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-brand-brown text-white rounded-md hover:bg-brand-dark transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Equipo
          </button>
        </div>

        {isFormOpen && (
          <EquipmentForm
            equipment={editingEquipment}
            onSave={handleSave}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingEquipment(null);
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-brand-brown">{item.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingEquipment(item);
                      setIsFormOpen(true);
                    }}
                    className="text-gray-600 hover:text-brand-brown"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Cantidad: {item.quantity}</span>
                <span>Último mant.: {new Date(item.lastMaintenance).toLocaleDateString()}</span>
              </div>
              <div className="mt-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
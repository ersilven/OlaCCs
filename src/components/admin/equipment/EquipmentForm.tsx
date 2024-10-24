import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  description: string;
  quantity: number;
  status: 'available' | 'in-use' | 'maintenance';
  lastMaintenance: string;
}

interface EquipmentFormProps {
  equipment?: Equipment | null;
  onSave: (equipment: Equipment) => void;
  onCancel: () => void;
}

export default function EquipmentForm({ equipment, onSave, onCancel }: EquipmentFormProps) {
  const [formData, setFormData] = useState<Omit<Equipment, 'id'>>({
    name: '',
    description: '',
    quantity: 1,
    status: 'available',
    lastMaintenance: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (equipment) {
      setFormData({
        name: equipment.name,
        description: equipment.description,
        quantity: equipment.quantity,
        status: equipment.status,
        lastMaintenance: equipment.lastMaintenance,
      });
    }
  }, [equipment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: equipment?.id || '',
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-brand-brown">
            {equipment ? 'Editar Equipo' : 'Nuevo Equipo'}
          </h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Equipment['status'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
              >
                <option value="available">Disponible</option>
                <option value="in-use">En uso</option>
                <option value="maintenance">Mantenimiento</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Último mantenimiento
            </label>
            <input
              type="date"
              required
              value={formData.lastMaintenance}
              onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-brown text-white rounded-md hover:bg-brand-dark"
            >
              {equipment ? 'Guardar Cambios' : 'Crear Equipo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
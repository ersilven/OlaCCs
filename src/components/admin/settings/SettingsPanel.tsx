import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

interface Settings {
  businessName: string;
  email: string;
  phone: string;
  address: string;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
  };
}

const defaultSettings: Settings = {
  businessName: 'Ola Caracas',
  email: 'info@olacaracas.com',
  phone: '+58 (123) 456-7890',
  address: 'Caracas, Venezuela',
  openingHours: {
    monday: '9:00 AM - 7:00 PM',
    tuesday: '9:00 AM - 7:00 PM',
    wednesday: '9:00 AM - 7:00 PM',
    thursday: '9:00 AM - 7:00 PM',
    friday: '9:00 AM - 7:00 PM',
    saturday: '9:00 AM - 4:00 PM',
    sunday: 'Cerrado',
  },
  socialMedia: {
    instagram: 'https://www.instagram.com/ola.ccs/',
    facebook: '',
  },
};

export default function SettingsPanel() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedSettings = localStorage.getItem('adminSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleOpeningHoursChange = (day: keyof Settings['openingHours'], value: string) => {
    setSettings({
      ...settings,
      openingHours: {
        ...settings.openingHours,
        [day]: value,
      },
    });
  };

  const handleSocialMediaChange = (platform: keyof Settings['socialMedia'], value: string) => {
    setSettings({
      ...settings,
      socialMedia: {
        ...settings.socialMedia,
        [platform]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif text-brand-brown">Configuración</h2>
          {saved && (
            <span className="text-green-600 flex items-center">
              <Save className="h-5 w-5 mr-2" />
              Cambios guardados
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-brand-brown mb-4">Información General</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del negocio
                  </label>
                  <input
                    type="text"
                    value={settings.businessName}
                    onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  <textarea
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-brand-brown mb-4">Horario de Atención</h3>
              <div className="space-y-3">
                {Object.entries(settings.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center">
                    <span className="w-28 text-sm font-medium text-gray-700 capitalize">
                      {day === 'monday' ? 'Lunes' :
                       day === 'tuesday' ? 'Martes' :
                       day === 'wednesday' ? 'Miércoles' :
                       day === 'thursday' ? 'Jueves' :
                       day === 'friday' ? 'Viernes' :
                       day === 'saturday' ? 'Sábado' : 'Domingo'}
                    </span>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => handleOpeningHoursChange(day as keyof Settings['openingHours'], e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-brand-brown mb-4">Redes Sociales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.instagram}
                  onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.facebook}
                  onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                  placeholder="https://facebook.com/..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-brand-brown text-white rounded-md hover:bg-brand-dark transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
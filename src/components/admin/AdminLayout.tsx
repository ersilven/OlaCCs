import React from 'react';
import { Calendar, Package, Wrench, Settings, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Reservaciones', icon: Calendar, href: '#bookings' },
  { name: 'Servicios', icon: Package, href: '#services' },
  { name: 'Equipamiento', icon: Wrench, href: '#equipment' },
  { name: 'Configuración', icon: Settings, href: '#settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-brand-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-auto rounded-full"
                  src="/logo.png"
                  alt="Ola Caracas"
                />
                <span className="ml-2 text-white font-serif">Panel Administrativo</span>
              </div>
            </div>
            <div className="flex items-center">
              <a 
                href="/"
                className="text-white hover:text-brand-cream flex items-center"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Salir
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
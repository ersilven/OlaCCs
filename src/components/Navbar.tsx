import React, { useState } from 'react';
import { Menu, X, Settings } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-sm fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Ola Caracas" 
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-brand-brown hover:text-brand-dark">Inicio</a>
            <a href="#servicios" className="text-brand-brown hover:text-brand-dark">Servicios</a>
            <a href="#equipo" className="text-brand-brown hover:text-brand-dark">Equipo</a>
            <a href="#reservar" className="px-4 py-2 rounded-md bg-brand-brown text-white hover:bg-brand-dark transition-colors">
              Reservar Cita
            </a>
            <a 
              href="./admin"
              className="text-brand-brown hover:text-brand-dark flex items-center"
              title="Panel Administrativo"
            >
              <Settings className="h-5 w-5" />
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-brown">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <a href="#inicio" className="block px-3 py-2 text-brand-brown hover:bg-brand-cream">Inicio</a>
            <a href="#servicios" className="block px-3 py-2 text-brand-brown hover:bg-brand-cream">Servicios</a>
            <a href="#equipo" className="block px-3 py-2 text-brand-brown hover:bg-brand-cream">Equipo</a>
            <a href="#reservar" className="block px-3 py-2 text-brand-brown hover:bg-brand-cream">Reservar Cita</a>
            <a href="#admin" className="block px-3 py-2 text-brand-brown hover:bg-brand-cream">Panel Administrativo</a>
          </div>
        </div>
      )}
    </nav>
  );
}

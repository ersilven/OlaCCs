import React from 'react';

const team = [
  {
    name: "María González",
    role: "Terapeuta Senior",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Ana Martínez",
    role: "Especialista en Masajes",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Carmen Silva",
    role: "Terapeuta Holística",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

export default function Team() {
  return (
    <section id="equipo" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-green-800 mb-4">Nuestro Equipo</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Profesionales dedicadas a tu bienestar y crecimiento personal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-green-900/10 hover:bg-green-900/0 transition-colors"></div>
              </div>
              <h3 className="text-xl font-serif text-green-800 mb-2">{member.name}</h3>
              <p className="text-stone-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
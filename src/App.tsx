import React from 'react';
import { Leaf, Calendar, Clock, Users, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import Booking from './components/Booking';
import Footer from './components/Footer';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  // Simple check for admin route
  const isAdmin = window.location.pathname === '/admin';

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Team />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}

export default App;
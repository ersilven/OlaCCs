import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Clock, Plus, Minus } from "lucide-react";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface Therapist {
  id: string;
  name: string;
  specialties: string[];
}

export default function Booking() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTherapists, setSelectedTherapists] = useState<{
    [key: string]: string;
  }>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: new Date(),
    time: "",
  });
  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, date });
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 17; hour++) {
      const timeString = `${hour.toString().padStart(2, "0")}:00`;
      slots.push(timeString);
    }
    return slots;
  };

  const handleAddService = () => {
    setSelectedServices([...selectedServices, ""]);
    setSelectedTherapists({
      ...selectedTherapists,
      ["service-" + selectedServices.length]: "",
    });
  };

  const handleRemoveService = (index: number) => {
    const newServices = selectedServices.filter((_, i) => i !== index);
    const newTherapists = { ...selectedTherapists };
    delete newTherapists["service-" + index];
    setSelectedServices(newServices);
    setSelectedTherapists(newTherapists);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = {
      id: Date.now().toString(),
      ...formData,
      services: selectedServices.map((serviceId, index) => ({
        serviceId,
        therapistId: selectedTherapists["service-" + index],
      })),
    };

    try {
      // Store in localStorage
      const existingBookings = JSON.parse(
        localStorage.getItem("bookings") || "[]"
      );
      localStorage.setItem(
        "bookings",
        JSON.stringify([...existingBookings, bookingData])
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
      });
      setSelectedServices([]);
      setSelectedTherapists({});

      alert("Reserva confirmada exitosamente");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error al procesar la reserva");
    }
  };

  return (
    <section id="reservar" className="py-24 bg-brand-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-brand-brown mb-4">
            Reserva tu Cita
          </h2>
          <p className="text-lg text-brand-dark/80">
            Personaliza tu experiencia de bienestar
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-8"
        >
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-serif text-brand-brown">
                  Servicios
                </h3>
                <button
                  type="button"
                  onClick={handleAddService}
                  className="flex items-center text-brand-brown hover:text-brand-dark"
                >
                  <Plus className="h-5 w-5 mr-1" />
                  Agregar servicio
                </button>
              </div>

              {selectedServices.map((serviceId, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-brand-cream rounded-md"
                >
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">
                      Servicio {index + 1}
                    </label>
                    <select
                      required
                      value={serviceId}
                      className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                      onChange={(e) => {
                        const newServices = [...selectedServices];
                        newServices[index] = e.target.value;
                        setSelectedServices(newServices);
                      }}
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="masaje">Masaje Terapéutico</option>
                      <option value="veloterapia">Veloterapia</option>
                      <option value="holistic">Terapia Holística</option>
                      <option value="asesoria">Asesoría Personalizada</option>
                    </select>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-brand-dark mb-2">
                        Terapeuta
                      </label>
                      <select
                        required
                        value={selectedTherapists["service-" + index] || ""}
                        className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                        onChange={(e) => {
                          setSelectedTherapists({
                            ...selectedTherapists,
                            ["service-" + index]: e.target.value,
                          });
                        }}
                      >
                        <option value="">Selecciona un terapeuta</option>
                        <option value="maria">María González</option>
                        <option value="ana">Ana Martínez</option>
                        <option value="carmen">Carmen Silva</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveService(index)}
                      className="mt-8 text-red-500 hover:text-red-700"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">
                  Fecha
                </label>
                <div className="relative">
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                  />
                  {/* <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-brand-brown/60" /> */}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">
                  Hora
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.time}
                    className="w-full px-4 py-2 border border-brand-cream rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent appearance-none"
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                  >
                    <option value="">Selecciona una hora</option>
                    {generateTimeSlots().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <Clock className="absolute right-3 top-2.5 h-5 w-5 text-brand-brown/60" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-brand-brown text-white py-3 px-6 rounded-md hover:bg-brand-dark transition-colors"
            >
              Reservar Cita
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

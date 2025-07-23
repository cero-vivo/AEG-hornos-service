"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, Mail, MapPin } from "lucide-react";
import styles from "./Calendar.module.css";
import { TimeSlot, AppointmentRequest } from "@/types/calendar";

interface CalendarBookingProps {
  selectedServices: string[];
  onClose: () => void;
}

type ServiceZone = 'caba' | 'amba' | 'interior';

export default function CalendarBooking({ selectedServices, onClose }: CalendarBookingProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<{message: string; meetLink?: string} | null>(null);

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: "",
  });

  // Generar las próximas 2 semanas de fechas (excluyendo domingos)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Excluir domingos (día 0)
      if (date.getDay() !== 0) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  // Obtener slots disponibles cuando cambia la fecha
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async (date: string) => {
    setLoading(true);
    setError("");
    setAvailableSlots([]);
    setSelectedSlot("");

    try {
      const response = await fetch(`/api/calendar/available-slots?date=${date}`);
      const data = await response.json();

      if (response.ok) {
        setAvailableSlots(data.slots || []);
      } else {
        setError(data.error || "Error al cargar horarios disponibles");
      }
    } catch (err) {
      setError("Error de conexión. Por favor intenta nuevamente.");
      console.error("Error fetching slots:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const formatSlotTime = (slot: TimeSlot) => {
    const start = new Date(slot.start);
    const end = new Date(slot.end);
    return `${start.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const formatSelectedDateTime = () => {
    if (!selectedDate || !selectedSlot) return "";
    
    const slot = availableSlots.find(s => s.id === selectedSlot);
    if (!slot) return "";

    const date = new Date(selectedDate);
    const time = new Date(slot.start);
    
    return `${date.toLocaleDateString('es-AR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })} a las ${time.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedDate || !selectedSlot) {
      setError("Por favor selecciona una fecha y horario");
      return;
    }

    const slot = availableSlots.find(s => s.id === selectedSlot);
    if (!slot) {
      setError("Horario seleccionado no válido");
      return;
    }

    const appointment: Omit<AppointmentRequest, 'zone'> = {
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      customerPhone: form.customerPhone,
      selectedServices: selectedServices,
      dateTime: slot.start,
      notes: form.notes,
    };

    setLoading(true);

    try {
      const response = await fetch('/api/calendar/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess({
          message: data.message,
          meetLink: data.meetLink,
        });
      } else {
        setError(data.error || "Error al agendar la cita");
      }
    } catch (err) {
      setError("Error de conexión. Por favor intenta nuevamente.");
      console.error("Error booking appointment:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.calendarContainer}>
        <div className={styles.successState}>
          <div className={styles.successIcon}>🎉</div>
          <h3 className={styles.successTitle}>¡Cita agendada exitosamente!</h3>
          <p className={styles.successMessage}>
            {success.message}
          </p>
          
          {success.meetLink && (
            <div>
              <p><strong>Link de videollamada:</strong></p>
              <div className={styles.meetLink}>
                {success.meetLink}
              </div>
              <p style={{fontSize: '0.9rem', color: '#666'}}>
                Te enviaremos este link por email también.
              </p>
            </div>
          )}
          
          <div className={styles.actionButtons}>
            <button 
              onClick={onClose}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              <Calendar size={16} />
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <h2 className={styles.calendarTitle}>Agendar llamada</h2>
        <p className={styles.calendarSubtitle}>
          Elegí el día y horario que más te convenga
        </p>
      </div>

      {error && (
        <div className={styles.errorState}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Selector de fecha */}
        <div className={styles.dateSelector}>
          <label className={styles.dateLabel}>Seleccionar fecha</label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={styles.dateInput}
            required
          >
            <option value="">Elegir fecha...</option>
            {availableDates.map(date => {
              const dateObj = new Date(date);
              return (
                <option key={date} value={date}>
                  {dateObj.toLocaleDateString('es-AR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </option>
              );
            })}
          </select>
        </div>

        {/* Slots de horarios */}
        {selectedDate && (
          <div className={styles.slotsContainer}>
            <div className={styles.slotsHeader}>
              <Clock size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
              Horarios disponibles
            </div>

            {loading ? (
              <div className={styles.loadingState}>
                Cargando horarios disponibles...
              </div>
            ) : availableSlots.length > 0 ? (
              <div className={styles.slotsGrid}>
                {availableSlots.map(slot => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`${styles.slotButton} ${selectedSlot === slot.id ? styles.selected : ''}`}
                  >
                    {formatSlotTime(slot)}
                  </button>
                ))}
              </div>
            ) : (
              <div className={styles.noSlotsMessage}>
                No hay horarios disponibles para esta fecha.
                <br />
                Por favor selecciona otra fecha.
              </div>
            )}
          </div>
        )}

        {/* Formulario de datos */}
        {selectedSlot && (
          <div className={styles.appointmentForm}>
            <h3 className={styles.formTitle}>
              <User size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
              Tus datos
            </h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nombre completo *</label>
                <input
                  type="text"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleFormChange}
                  className={styles.formInput}
                  required
                  placeholder="Tu nombre y apellido"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Teléfono *</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={form.customerPhone}
                  onChange={handleFormChange}
                  className={styles.formInput}
                  required
                  placeholder="11 1234-5678"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email *</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={form.customerEmail}
                  onChange={handleFormChange}
                  className={styles.formInput}
                  required
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {selectedServices.length > 0 && (
              <div className={styles.selectedServices}>
                <h4 className={styles.selectedServicesTitle}>Servicios a consultar:</h4>
                <ul className={styles.selectedServicesList}>
                  {selectedServices.map((service, index) => (
                    <li key={index} className={styles.selectedServiceItem}>{service}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Comentarios adicionales</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleFormChange}
                className={styles.formTextarea}
                placeholder="Contanos más detalles sobre tu consulta..."
              />
            </div>

            <div style={{background: '#ecfdf5', border: '1px solid #86efac', borderRadius: '6px', padding: '1rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#166534'}}>
              <strong>Resumen de tu cita:</strong><br />
              📅 {formatSelectedDateTime()}<br />
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className={styles.actionButtons}>
          <button
            type="button"
            onClick={onClose}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Cancelar
          </button>
          
          {selectedSlot && (
            <button
              type="submit"
              disabled={loading}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              {loading ? (
                "Agendando..."
              ) : (
                <>
                  <Calendar size={16} />
                  Confirmar cita
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
} 
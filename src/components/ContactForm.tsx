"use client";

import { useState, useEffect } from "react";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
  selectedServices?: string[];
}

type UrgencyLevel = 'low' | 'medium' | 'high' | 'urgent';
type ServiceZone = 'caba' | 'amba' | 'interior';

export default function ContactForm({ selectedServices = [] }: ContactFormProps) {
  const [form, setForm] = useState({ 
    nombre: "", 
    email: "", 
    telefono: "",
    zona: "" as ServiceZone | "",
    direccion: "",
    urgencia: "" as UrgencyLevel | "",
    fechaPreferida: "",
    horarioPreferido: "",
    descripcionProblema: "",
    mensaje: ""
  });
  const [enviado, setEnviado] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Pre-llenar mensaje con servicios seleccionados
  useEffect(() => {
    if (selectedServices.length > 0) {
      setForm(prev => ({
        ...prev,
        mensaje: `Servicios seleccionados: ${selectedServices.join(', ')}`
      }));
    }
  }, [selectedServices]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const getUrgencyColor = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case 'low': return '#22c55e';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      case 'urgent': return '#dc2626';
      default: return '#6b7280';
    }
  };

  if (enviado) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h3>¡Solicitud enviada con éxito!</h3>
        <p>Te contactaremos en las próximas <strong>24 horas</strong> para coordinar la visita.</p>
        <div className={styles.successDetails}>
          <p><strong>Zona:</strong> {form.zona?.toUpperCase()}</p>
          <p><strong>Urgencia:</strong> {form.urgencia}</p>
          {form.fechaPreferida && <p><strong>Fecha preferida:</strong> {form.fechaPreferida}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.progressBar}>
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`${styles.progressStep} ${s <= step ? styles.active : ''}`}
          >
            {s}
          </div>
        ))}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={styles.step}>
            <h3>Información personal</h3>
            <div className={styles.row}>
              <label>
                Nombre completo *
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre y apellido"
                />
              </label>
              <label>
                Teléfono *
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                  placeholder="11 1234-5678"
                />
              </label>
            </div>
            <label>
              Email *
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </label>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <h3>Ubicación y urgencia</h3>
            <div className={styles.row}>
              <label>
                Zona de servicio *
                <select name="zona" value={form.zona} onChange={handleChange} required>
                  <option value="">Seleccionar zona</option>
                  <option value="caba">CABA</option>
                  <option value="amba">AMBA</option>
                  <option value="interior">Interior (videollamada)</option>
                </select>
              </label>
              <label>
                Nivel de urgencia *
                <select name="urgencia" value={form.urgencia} onChange={handleChange} required>
                  <option value="">¿Qué tan urgente es?</option>
                  <option value="low">📅 Planificado (dentro de 2 semanas)</option>
                  <option value="medium">⚡ Importante (esta semana)</option>
                  <option value="high">🔥 Urgente (1-2 días)</option>
                  <option value="urgent">🚨 Emergencia (hoy mismo)</option>
                </select>
              </label>
            </div>
            <label>
              Dirección completa
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Calle, número, piso, depto (opcional)"
              />
            </label>
            <div className={styles.row}>
              <label>
                Fecha preferida
                <input
                  type="date"
                  name="fechaPreferida"
                  value={form.fechaPreferida}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </label>
              <label>
                Horario preferido
                <select name="horarioPreferido" value={form.horarioPreferido} onChange={handleChange}>
                  <option value="">Cualquier horario</option>
                  <option value="mañana">Mañana (9-12hs)</option>
                  <option value="tarde">Tarde (13-17hs)</option>
                  <option value="noche">Noche (18-20hs)</option>
                </select>
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.step}>
            <h3>Descripción del problema</h3>
            <label>
              ¿Qué problema tiene tu horno? *
              <textarea
                name="descripcionProblema"
                value={form.descripcionProblema}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Ej: No enciende, no llega a temperatura, se corta durante la cocción, hace ruidos raros..."
              />
            </label>
            {selectedServices.length > 0 && (
              <div className={styles.selectedServices}>
                <h4>Servicios seleccionados:</h4>
                <ul>
                  {selectedServices.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            )}
            <label>
              Información adicional
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows={3}
                placeholder="Cualquier otra información que consideres importante..."
              />
            </label>
          </div>
        )}

        <div className={styles.navigation}>
          {step > 1 && (
            <button type="button" onClick={prevStep} className={styles.btnSecondary}>
              ← Anterior
            </button>
          )}
          {step < totalSteps ? (
            <button type="button" onClick={nextStep} className={styles.btnPrimary}>
              Siguiente →
            </button>
          ) : (
            <button type="submit" className={styles.btnSubmit}>
              🚀 Enviar solicitud
            </button>
          )}
        </div>
      </form>
    </div>
  );
} 
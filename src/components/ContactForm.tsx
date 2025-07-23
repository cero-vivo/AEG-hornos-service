"use client";

import { useState, useEffect } from "react";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
  selectedServices?: string[];
}

type ServiceZone = 'caba' | 'amba' | 'interior';

export default function ContactForm({ selectedServices = [] }: ContactFormProps) {
  const [form, setForm] = useState({ 
    nombre: "", 
    email: "", 
    telefono: "",
    zona: "" as ServiceZone | "",
    direccion: "",
    descripcionProblema: "",
    fotos: [] as File[]
  });
  const [enviado, setEnviado] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setForm(prev => ({ ...prev, fotos: [...prev.fotos, ...files] }));
  };

  const removePhoto = (index: number) => {
    setForm(prev => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
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

  if (enviado) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h3>¡Solicitud enviada con éxito!</h3>
        <p>Te contactaremos en las próximas <strong>24 horas</strong> para coordinar la visita.</p>
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
            <h3>Ubicación</h3>
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
              Dirección completa
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Calle, número, piso, depto (opcional)"
              />
            </label>
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
            
            <div className={styles.photoSection}>
              <label>
                Adjuntar fotos del horno (opcional)
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
              </label>
              {form.fotos.length > 0 && (
                <div className={styles.photoPreview}>
                  {form.fotos.map((foto, index) => (
                    <div key={index} className={styles.photoItem}>
                      <div className={styles.photoThumbnail}>
                        <img 
                          src={URL.createObjectURL(foto)} 
                          alt={`Foto ${index + 1}`}
                          className={styles.thumbnailImage}
                        />
                      </div>
                      <div className={styles.photoInfo}>
                        <span className={styles.photoName}>{foto.name}</span>
                        <span className={styles.photoSize}>
                          {(foto.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removePhoto(index)}
                        className={styles.removePhoto}
                        title="Eliminar foto"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
              Enviar
            </button>
          )}
        </div>
      </form>
    </div>
  );
} 
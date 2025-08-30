"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";
import Image from "next/image";
import { useEmailContacto } from "@/hooks/useEmailContacto";

interface ContactFormProps {
  selectedServices?: string[];
}

type ServiceZone = 'caba' | 'amba' | 'interior';

export default function ContactForm({ selectedServices = [] }: ContactFormProps) {
  const { emailContacto, loading: loadingEmail } = useEmailContacto();
  console.log("🚀 ~ ContactForm ~ emailContacto:", emailContacto)
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
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError("");
    
    try {
      const formData = new FormData();
      
      // Agregar campos de texto
      formData.append('nombre', form.nombre);
      formData.append('email', form.email);
      formData.append('telefono', form.telefono);
      formData.append('zona', form.zona);
      formData.append('direccion', form.direccion);
      formData.append('descripcionProblema', form.descripcionProblema);
      formData.append('selectedServices', JSON.stringify(selectedServices));
      
      // Agregar el email de Remote Config
      if (emailContacto) {
        formData.append('emailDestino', emailContacto);
      }
      
      // Agregar imágenes
      form.fotos.forEach((foto) => {
        formData.append('fotos', foto);
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setEnviado(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setError('Error de conexión. Por favor, intenta nuevamente.');
    } finally {
      setEnviando(false);
    }
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
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

        <div className={styles.section}>
          <h3>Ubicación</h3>
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
        </div>

        <div className={styles.section}>
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
                      <Image 
                        src={URL.createObjectURL(foto)} 
                        alt={`Foto ${index + 1}`}
                        width={120}
                        height={120}
                        className={styles.thumbnailImage}
                        sizes="120px"
                        quality={75}
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

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}

        <div className={styles.submitSection}>
          <button 
            type="submit" 
            className={styles.btnSubmit}
            disabled={enviando}
          >
            {enviando ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </div>
      </form>
    </div>
  );
} 
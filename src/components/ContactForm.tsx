"use client";

import { useState, useEffect } from "react";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
  selectedServices?: string[];
}

export default function ContactForm({ selectedServices = [] }: ContactFormProps) {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  // Pre-llenar mensaje con servicios seleccionados
  useEffect(() => {
    if (selectedServices.length > 0) {
      setForm(prev => ({
        ...prev,
        mensaje: `Hola! Me interesa contratar los siguientes servicios:\n\n${selectedServices.map(s => `• ${s}`).join('\n')}\n\nPor favor, contactenme para coordinar. Gracias!`
      }));
    }
  }, [selectedServices]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías integrar tu backend o servicio de envío de mails.
    setEnviado(true);
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  if (enviado) {
    return (
      <p className={styles.gracias}>
        ¡Gracias por tu consulta! Te responderemos a la brevedad.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Nombre
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Mensaje
        <textarea
          name="mensaje"
          rows={4}
          value={form.mensaje}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
} 
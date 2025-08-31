'use client';

import { useState } from 'react';
import { CustomerData } from '@/types/customer';
import styles from './modals.module.css';

interface AdminCustomer extends CustomerData {
  id: string;
}

interface EmailModalProps {
  customers: AdminCustomer[];
  onClose: () => void;
}

const emailTemplates = {
  welcome: {
    subject: 'Bienvenido a AEG Hornos - Servicio Técnico Especializado',
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #007bff;">¡Bienvenido a AEG Hornos!</h2>
      <p>Gracias por contactarnos. Nuestro equipo de técnicos especializados está listo para ayudarte con tu horno AEG.</p>
      <p><strong>Servicios que ofrecemos:</strong></p>
      <ul>
        <li>Diagnóstico gratuito</li>
        <li>Reparación de hornos AEG</li>
        <li>Mantenimiento preventivo</li>
        <li>Instalación de repuestos originales</li>
      </ul>
      <p style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
        <strong>¿Necesitas ayuda urgente?</strong><br>
        📞 Teléfono: 11-1234-5678<br>
        📧 Email: contacto@aeghornos.com.ar
      </p>
    </div>`
  },
  followup: {
    subject: 'Seguimiento - Servicio Técnico AEG Hornos',
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #007bff;">Seguimiento de tu solicitud</h2>
      <p>Hola, queremos asegurarnos de que recibiste toda la información necesaria sobre nuestros servicios.</p>
      <p>Si tienes alguna pregunta o necesitas agendar una visita técnica, no dudes en contactarnos.</p>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3>¿Cómo agendar un servicio?</h3>
        <p>📞 Llamanos: 11-1234-5678<br>
        📱 WhatsApp: +54 9 11 1234-5678<br>
        📧 Email: contacto@aeghornos.com.ar</p>
      </div>
    </div>`
  },
  promotion: {
    subject: 'Promoción especial - Mantenimiento de hornos AEG',
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #28a745;">¡Promoción Especial!</h2>
      <p>¿Tu horno AEG necesita mantenimiento? Aprovecha nuestra promoción especial.</p>
      <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>20% de descuento en servicio de mantenimiento</h3>
        <p>Incluye:</p>
        <ul>
          <li>Limpieza profunda</li>
          <li>Revisión completa del sistema</li>
          <li>Calibración de temperatura</li>
          <li>Revisión de sellos y piezas</li>
        </ul>
        <p><strong>Válido hasta:</strong> ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-AR')}</p>
      </div>
    </div>`
  }
};

export default function EmailModal({ customers, onClose }: EmailModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('welcome');
  const [subject, setSubject] = useState(emailTemplates.welcome.subject);
  const [body, setBody] = useState(emailTemplates.welcome.html);
  const [loading, setLoading] = useState(false);

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
    setSubject(emailTemplates[template as keyof typeof emailTemplates].subject);
    setBody(emailTemplates[template as keyof typeof emailTemplates].html);
  };

  const handleSend = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customers: customers.map(c => ({ email: c.email, name: c.name })),
          subject,
          html: body
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar emails');
      }

      const result = await response.json();
      alert(`✅ ${result.success} emails enviados exitosamente`);
      onClose();
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Error al enviar los emails');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Enviar Email a {customers.length} cliente(s)</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalForm}>
          <div className={styles.emailList}>
            <strong>Destinatarios:</strong>
            {customers.map(customer => (
              <div key={customer.id} className={styles.emailItem}>
                {customer.name} ({customer.email})
              </div>
            ))}
          </div>

          <div className={styles.templateSelector}>
            <label>Plantilla de email:</label>
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className={styles.formSelect}
            >
              <option value="welcome">Bienvenida</option>
              <option value="followup">Seguimiento</option>
              <option value="promotion">Promoción</option>
            </select>
          </div>

          <div className={styles.emailEditor}>
            <div className={styles.emailField}>
              <label>Asunto:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div className={styles.emailField}>
              <label>Contenido HTML:</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={10}
                className={styles.formTextarea}
              />
            </div>

            <div className={styles.previewSection}>
              <h4>Vista previa:</h4>
              <div 
                className={styles.previewContent}
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            <button 
              type="button" 
              className={styles.submitButton} 
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Emails'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
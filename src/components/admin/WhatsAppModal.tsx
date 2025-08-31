'use client';

import { useState } from 'react';
import { CustomerData } from '@/types/customer';
import { HelpCircle } from 'lucide-react';
import styles from './modals.module.css';

const whatsappTemplates = {
  greeting: {
    name: 'Saludo inicial',
    message: `¡Hola! Soy de AEG Hornos, el servicio técnico especializado en hornos AEG. ¿En qué puedo ayudarte con tu equipo?`
  },
  service: {
    name: 'Agendar servicio',
    message: `¡Hola! Veo que nos contactaste sobre tu horno AEG. ¿Te gustaría agendar una visita técnica? Estoy disponible para coordinar el día y horario que mejor te convenga.`
  },
  followup: {
    name: 'Seguimiento',
    message: `¡Hola! Quería hacer un seguimiento sobre tu consulta. ¿Has decidido avanzar con el servicio técnico para tu horno AEG? Estoy aquí para ayudarte.`
  },
  promotion: {
    name: 'Promoción',
    message: `¡Hola! Tenemos una promoción especial de 20% de descuento en mantenimiento de hornos AEG. ¿Te interesaría conocer más detalles?`
  }
};

interface AdminCustomer extends CustomerData {
  id: string;
}

interface WhatsAppModalProps {
  customers: AdminCustomer[];
  onClose: () => void;
}

export default function WhatsAppModal({ customers, onClose }: WhatsAppModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('greeting');
  const [customMessage, setCustomMessage] = useState(whatsappTemplates.greeting.message);
  const [individualMode, setIndividualMode] = useState(customers.length === 1);
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(customers[0] || null);

  const generateWhatsAppLink = (telefono: string, message: string) => {
    const cleanPhone = telefono.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  };

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
    setCustomMessage(whatsappTemplates[template as keyof typeof whatsappTemplates].message);
  };

  const handleSendIndividual = () => {
    if (selectedCustomer && selectedCustomer.telefono) {
      const link = generateWhatsAppLink(selectedCustomer.telefono, customMessage);
      window.open(link, '_blank');
    }
  };

  const handleSendBulk = () => {
    customers.forEach((customer, index) => {
      if (customer.telefono) {
        setTimeout(() => {
          const link = generateWhatsAppLink(customer.telefono, customMessage);
          window.open(link, '_blank');
        }, index * 1000); // Delay para evitar bloqueo de spam
      }
    });
    
    alert(`${customers.length} enlaces de WhatsApp generados. Se abrirán en ventanas separadas.`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Enviar WhatsApp a {customers.length === 1 ? customers[0].nombre : `${customers.length} cliente(s)`}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
          <button 
            type="button" 
            onClick={() => alert(`📱 Información de WhatsApp:\n\n• Se abren pestañas separadas para cada cliente\n• Funciona en modo individual (1 cliente) o masivo (varios)\n• Requiere que el cliente tenga número de teléfono registrado\n• Mensajes predefinidos personalizables\n• Compatible con WhatsApp Web y WhatsApp Desktop\n\n💡 Tip: Para envío masivo, se abrirá una pestaña por cada cliente seleccionado.`)} 
            style={{background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px'}}
            title="Ver información sobre WhatsApp"
          >
            <HelpCircle size={16} />
          </button>
        </div>

        <div className={styles.modalForm}>
          <div className={styles.emailList}>
            <strong>Clientes con teléfono:</strong>
            {customers.map(customer => (
              <div key={customer.id} className={styles.emailItem}>
                {customer.nombre} ({customer.telefono})
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label>
              <input
                type="checkbox"
                checked={individualMode}
                onChange={(e) => setIndividualMode(e.target.checked)}
              />
              {' '}Enviar individualmente
            </label>
          </div>

          {individualMode && (
            <div style={{ marginBottom: '16px' }}>
              <label>Seleccionar cliente:</label>
              <select
                value={selectedCustomer?.id || ''}
                onChange={(e) => setSelectedCustomer(customers.find(c => c.id === e.target.value) || null)}
                className={styles.formSelect}
              >
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.nombre} - {customer.telefono}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className={styles.templateSelector}>
            <label>Plantilla de mensaje:</label>
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className={styles.formSelect}
            >
              {Object.entries(whatsappTemplates).map(([key, template]) => (
                <option key={key} value={key}>{template.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.emailField}>
            <label>Mensaje personalizado:</label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={4}
              className={styles.formTextarea}
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>

          <div className={styles.previewSection}>
            <h4>Vista previa:</h4>
            <div className={styles.previewContent}>
              <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{customMessage}</p>
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            
            {individualMode ? (
              <button 
                type="button" 
                className={styles.submitButton} 
                onClick={handleSendIndividual}
                disabled={!selectedCustomer || !selectedCustomer.telefono}
              >
                Enviar a {selectedCustomer?.nombre}
              </button>
            ) : (
              <button 
                type="button" 
                className={styles.submitButton} 
                onClick={handleSendBulk}
              >
                Enviar a todos ({customers.length})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
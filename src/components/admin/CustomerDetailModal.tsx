'use client';

import { CustomerData } from '@/types/customer';
import { X, Mail, Phone, MapPin, Calendar, MessageCircle } from 'lucide-react';
import styles from './CustomerDetailModal.module.css';

interface AdminCustomer extends CustomerData {
  id: string;
}

interface CustomerDetailModalProps {
  customer: AdminCustomer | null;
  isOpen: boolean;
  onClose: () => void;
  onSendEmail: (customer: AdminCustomer) => void;
  onSendWhatsApp: (customer: AdminCustomer) => void;
}

export default function CustomerDetailModal({
  customer,
  isOpen,
  onClose,
  onSendEmail,
  onSendWhatsApp
}: CustomerDetailModalProps) {
  if (!isOpen || !customer) return null;

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'AMBA': return '#0c5460';
      case 'CABA': return '#155724';
      case 'Interior': return '#856404';
      case 'AMBA+CABA': return '#721c24';
      default: return '#6c757d';
    }
  };

  const getZoneBackground = (zone: string) => {
    switch (zone) {
      case 'AMBA': return '#d1ecf1';
      case 'CABA': return '#d4edda';
      case 'Interior': return '#fff3cd';
      case 'AMBA+CABA': return '#f8d7da';
      default: return '#e9ecef';
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Detalles del Cliente</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3>Información Personal</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <strong>Nombre:</strong>
                <span>{customer.nombre}</span>
              </div>
              <div className={styles.infoItem}>
                <strong>Email:</strong>
                <a href={`mailto:${customer.email}`} className={styles.link}>
                  {customer.email}
                </a>
              </div>
              <div className={styles.infoItem}>
                <strong>Teléfono:</strong>
                <a href={`tel:${customer.telefono}`} className={styles.link}>
                  {customer.telefono || 'No proporcionado'}
                </a>
              </div>
              <div className={styles.infoItem}>
                <strong>Zona:</strong>
                <span 
                  className={styles.zoneBadge}
                  style={{
                    backgroundColor: getZoneBackground(customer.zona),
                    color: getZoneColor(customer.zona)
                  }}
                >
                  {customer.zona}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Información del Servicio</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <strong>Dirección:</strong>
                <span>{customer.direccion}</span>
              </div>
              <div className={styles.infoItem}>
                <strong>Fecha de contacto:</strong>
                <span>{formatDate(customer.fechaContacto)}</span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Servicios Solicitados</h3>
            <div className={styles.servicesList}>
              {customer.selectedServices?.length > 0 ? (
                customer.selectedServices.map((service: string, index: number) => (
                  <span key={index} className={styles.serviceTag}>
                    {service}
                  </span>
                ))
              ) : (
                <span className={styles.noServices}>No especificó servicios</span>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <h3>Descripción del Problema</h3>
            <div className={styles.problemBox}>
              {customer.descripcionProblema || 'No proporcionó descripción'}
            </div>
          </div>

          {customer.notas && (
            <div className={styles.section}>
              <h3>Notas Adicionales</h3>
              <div className={styles.notesBox}>
                {customer.notas}
              </div>
            </div>
          )}

          {customer.fotoUrls && customer.fotoUrls.length > 0 && (
            <div className={styles.section}>
              <h3>Fotos Adjuntas</h3>
              <div className={styles.photoGrid}>
                  {customer.fotoUrls.map((url: string, index: number) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Foto ${index + 1}`}
                      className={styles.photo}
                      onClick={() => window.open(url, '_blank')}
                    />
                  ))}
                </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button
            className={styles.actionButton}
            onClick={() => {
              onSendEmail(customer);
              onClose();
            }}
          >
            <Mail size={16} />
            Enviar Email
          </button>
          {customer.telefono && (
            <button
              className={styles.actionButton}
              onClick={() => {
                onSendWhatsApp(customer);
                onClose();
              }}
            >
              <MessageCircle size={16} />
              Enviar WhatsApp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
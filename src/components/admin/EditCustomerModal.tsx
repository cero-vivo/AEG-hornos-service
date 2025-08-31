'use client';

import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CustomerData } from '@/types/customer';
import styles from './modals.module.css';

interface EditCustomerModalProps {
  customer: CustomerData & { id: string };
  onClose: () => void;
  onSuccess: () => void;
}

const AVAILABLE_SERVICES = [
  'Diagnóstico Profesional',
  'Mantenimiento Premium',
  'Reparación Integral',
  'Asesoría Virtual',
  'Instalación Completa'
];

export default function EditCustomerModal({ customer, onClose, onSuccess }: EditCustomerModalProps) {
  const [formData, setFormData] = useState({
    nombre: customer.nombre || '',
    email: customer.email || '',
    telefono: customer.telefono || '',
    zona: customer.zona || 'CABA',
    direccion: customer.direccion || '',
    descripcionProblema: customer.descripcionProblema || '',
    selectedServices: customer.selectedServices || [] as string[]
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateDoc(doc(db, 'customers', customer.id), {
        ...formData,
        updatedAt: new Date()
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Error al actualizar cliente');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service]
    }));
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Editar Cliente</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>Nombre completo *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Zona *</label>
            <select
              name="zona"
              value={formData.zona}
              onChange={handleChange}
              required
              className={styles.formSelect}
            >
              <option value="CABA">CABA</option>
              <option value="AMBA">AMBA</option>
              <option value="Interior">Interior</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Descripción del problema</label>
            <textarea
              name="descripcionProblema"
              value={formData.descripcionProblema}
              onChange={handleChange}
              rows={4}
              className={styles.formTextarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Servicios seleccionados</label>
            <div className={styles.servicesContainer}>
              {AVAILABLE_SERVICES.map(service => (
                <label key={service} className={styles.serviceCheckbox}>
                  <input
                    type="checkbox"
                    checked={formData.selectedServices.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Actualizando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
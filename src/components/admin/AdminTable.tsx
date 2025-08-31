'use client';

import { useState } from 'react';
import { CustomerData } from '@/types/customer';
import { Mail, MessageCircle, Trash2 } from 'lucide-react';
import CustomerDetailModal from './CustomerDetailModal';
import styles from '@/app/admin/admin.module.css';

interface AdminCustomer extends CustomerData {
  id: string;
}

interface AdminTableProps {
  customers: AdminCustomer[];
  loading: boolean;
  selectedCustomers: Set<string>;
  onSelectAll: () => void;
  onSelectCustomer: (id: string) => void;
  onDelete: (id: string) => void;
  onSendEmail: (customer: AdminCustomer) => void;
  onSendWhatsApp: (customer: AdminCustomer) => void;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function AdminTable({
  customers,
  loading,
  selectedCustomers,
  onSelectAll,
  onSelectCustomer,
  onDelete,
  onSendEmail,
  onSendWhatsApp,
  currentPage,
  totalPages,
  onPageChange
}: AdminTableProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const getZoneClass = (zone: string) => {
    switch (zone) {
      case 'AMBA': return styles.zoneAMBA;
      case 'CABA': return styles.zoneCABA;
      case 'Interior': return styles.zoneInterior;
      case 'AMBA+CABA': return styles.zoneAMBA_CABA;
      default: return '';
    }
  };

  const formatDate = (date: Date | { toDate: () => Date } | string | undefined) => {
    if (!date) return 'N/A';
    const d = typeof date === 'object' && 'toDate' in date ? date.toDate() : new Date(date);
    return d.toLocaleDateString('es-AR');
  };

  if (loading) {
    return <div className={styles.loading}>Cargando clientes...</div>;
  }

  if (customers.length === 0) {
    return <div className={styles.empty}>No se encontraron clientes</div>;
  }

  const handleRowClick = (customer: AdminCustomer) => {
    setSelectedCustomer(customer);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectedCustomers.size === customers.length && customers.length > 0}
                  onChange={onSelectAll}
                />
              </th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Zona</th>
              <th>Dirección</th>
              <th>Problema</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr 
                key={customer.id}
                className={styles.clickableRow}
                onClick={() => handleRowClick(customer)}
              >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedCustomers.has(customer.id)}
                      onChange={() => onSelectCustomer(customer.id)}
                    />
                  </td>
                  <td>{customer.nombre}</td>
                  <td>{customer.email}</td>
                  <td>{customer.telefono || 'N/A'}</td>
                  <td>
                    <span className={`${styles.zoneBadge} ${getZoneClass(customer.zona)}`}>
                      {customer.zona}
                    </span>
                  </td>
                  <td>{customer.direccion}</td>
                  <td>{customer.descripcionProblema?.substring(0, 50)}...</td>
                  <td>{formatDate(customer.fechaContacto)}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.actionButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSendEmail(customer);
                        }}
                        title="Enviar email"
                      >
                        <Mail size={16} />
                      </button>
                      {customer.telefono && (
                        <button
                          className={styles.actionButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSendWhatsApp(customer);
                          }}
                          title="Enviar WhatsApp"
                        >
                          <MessageCircle size={16} />
                        </button>
                      )}
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(customer.id);
                        }}
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => onPageChange(i + 1)}
                className={currentPage === i + 1 ? styles.active : ''}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      <CustomerDetailModal
        customer={selectedCustomer}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onSendEmail={onSendEmail}
        onSendWhatsApp={onSendWhatsApp}
      />
    </>
  );
}
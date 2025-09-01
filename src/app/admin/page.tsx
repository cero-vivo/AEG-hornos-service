'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CustomerData } from '@/types/customer';
import AdminTable from '@/components/admin/AdminTable';
import AddCustomerModal from '@/components/admin/AddCustomerModal';
import EditCustomerModal from '@/components/admin/EditCustomerModal';
import EmailModal from '@/components/admin/EmailModal';
import WhatsAppModal from '@/components/admin/WhatsAppModal';
import InfoModal from '@/components/admin/InfoModal';
import styles from './admin.module.css';

interface AdminCustomer extends CustomerData {
    id: string;
}

export default function AdminPanel() {
    const [customers, setCustomers] = useState<AdminCustomer[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<(CustomerData & { id: string }) | null>(null);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [filters, setFilters] = useState({
        address: '',
        zone: '',
        sortOrder: 'desc',
        hasPhone: false,
        service: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    const ITEMS_PER_PAGE = 20;

    const loadCustomers = useCallback(async () => {
        try {
            setLoading(true);
            // Primero obtenemos todos los clientes sin límite
            const q = query(collection(db, 'customers'), orderBy('fechaContacto', filters.sortOrder === 'asc' ? 'asc' : 'desc'));

            const snapshot = await getDocs(q);
            console.log("🚀 ~ loadCustomers ~ snapshot:", snapshot)
            let customerData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as AdminCustomer));
            console.log("🚀 ~ loadCustomers ~ customerData:", customerData)

            console.log('Total customers loaded:', customerData.length);

            // Aplicar filtros
            if (filters.address) {
                customerData = customerData.filter(c =>
                    c.direccion?.toLowerCase().includes(filters.address.toLowerCase())
                );
            }

            if (filters.zone) {
                if (filters.zone === 'AMBA+CABA') {
                    customerData = customerData.filter(c => c.zona === 'AMBA' || c.zona === 'CABA');
                } else {
                    customerData = customerData.filter(c => c.zona === filters.zone);
                }
            }

            if (filters.hasPhone) {
                customerData = customerData.filter(c => c.telefono && c.telefono.trim() !== '');
            }

            if (filters.service) {
                customerData = customerData.filter(c => 
                    c.selectedServices?.includes(filters.service)
                );
            }

            if (searchTerm) {
                customerData = customerData.filter(c =>
                    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    c.zona?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    c.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setTotalItems(customerData.length);
            setTotalPages(Math.ceil(customerData.length / ITEMS_PER_PAGE));

            // Paginación manual
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const paginatedData = customerData.slice(startIndex, endIndex);
            setCustomers(paginatedData);

            console.log('Showing customers:', startIndex, 'to', endIndex, 'of', customerData.length);
            console.log('Current page items:', paginatedData.length);
        } catch (error) {
            console.error('Error loading customers:', error);
        } finally {
            setLoading(false);
        }
    }, [filters, searchTerm, currentPage]);

    useEffect(() => {
        loadCustomers();
    }, [loadCustomers]);

    useEffect(() => {
        setCurrentPage(1); // Reset to first page when filters change
    }, [filters, searchTerm]);

    useEffect(() => {
        // Clear selected customers that are no longer in the filtered list
        const availableCustomerIds = new Set(customers.map(c => c.id));
        setSelectedCustomers(prev => prev.filter(id => availableCustomerIds.has(id)));
    }, [customers]);

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
            try {
                await deleteDoc(doc(db, 'customers', id));
                loadCustomers();
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    const handleEdit = (customer: CustomerData & { id: string }) => {
        setEditingCustomer(customer);
        setShowEditModal(true);
    };

    const handleSelectAll = () => {
        if (selectedCustomers.length === customers.length) {
            setSelectedCustomers([]);
        } else {
            setSelectedCustomers(customers.map(c => c.id));
        }
    };

    const handleSelectCustomer = (id: string) => {
        setSelectedCustomers(prev =>
            prev.includes(id)
                ? prev.filter(c => c !== id)
                : [...prev, id]
        );
    };

    const getSelectedCustomersData = () => {
        return customers.filter(c => selectedCustomers.includes(c.id));
    };

    const BATCH_LIMIT = parseInt(process.env.NEXT_PUBLIC_EMAIL_BATCH_LIMIT || '50', 10);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <div className={styles.logo}>AEG</div>
                    <h1>Panel de Administración</h1>
                </div>
                <div className={styles.actions}>
                    <button
                        className={styles.button}
                        onClick={() => setShowAddModal(true)}
                    >
                        Agregar Cliente
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => setShowEmailModal(true)}
                        disabled={selectedCustomers.length === 0 || selectedCustomers.length > BATCH_LIMIT}
                        title={selectedCustomers.length > BATCH_LIMIT ? `Máximo ${BATCH_LIMIT} destinatarios` : ''}
                    >
                        Enviar Email ({selectedCustomers.length})
                        {selectedCustomers.length > BATCH_LIMIT && <span style={{color: '#ff6b6b'}}> ⚠️</span>}
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => setShowWhatsAppModal(true)}
                        disabled={selectedCustomers.filter(id =>
                            customers.find(c => c.id === id)?.telefono
                        ).length === 0}
                    >
                        WhatsApp ({selectedCustomers.filter(id =>
                            customers.find(c => c.id === id)?.telefono
                        ).length})
                    </button>
                    <button
                        className={`${styles.button} ${styles.profileButton}`}
                        onClick={() => window.location.href = '/admin/profile'}
                        title="Configurar información del perfil"
                    >
                        Perfil
                    </button>
                    <button
                        className={`${styles.button} ${styles.helpButton}`}
                        onClick={() => setShowHelpModal(true)}
                        title="Ayuda - Cómo funciona el panel"
                    >
                        ?
                    </button>
                </div>
            </header>

            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Buscar por email, nombre o zona..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <input
                    type="text"
                    placeholder="Filtrar por dirección..."
                    value={filters.address}
                    onChange={(e) => setFilters({ ...filters, address: e.target.value })}
                    className={styles.filterInput}
                />
                <select
                    value={filters.zone}
                    onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
                    className={styles.filterSelect}
                >
                    <option value="">Todas las zonas</option>
                    <option value="AMBA">AMBA</option>
                    <option value="CABA">CABA</option>
                    <option value="Interior">Interior</option>
                    <option value="AMBA+CABA">AMBA+CABA</option>
                </select>
                <select
                    value={filters.service}
                    onChange={(e) => setFilters({ ...filters, service: e.target.value })}
                    className={styles.filterSelect}
                >
                    <option value="">Todos los servicios</option>
                    <option value="Diagnóstico Profesional">Diagnóstico Profesional</option>
                    <option value="Mantenimiento Premium">Mantenimiento Premium</option>
                    <option value="Reparación Integral">Reparación Integral</option>
                    <option value="Asesoría Virtual">Asesoría Virtual</option>
                    <option value="Instalación Completa">Instalación Completa</option>
                </select>
                <select
                    value={filters.sortOrder}
                    onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
                    className={styles.filterSelect}
                >
                    <option value="desc">Fecha más reciente</option>
                    <option value="asc">Fecha más antigua</option>
                </select>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={filters.hasPhone}
                        onChange={(e) => setFilters({ ...filters, hasPhone: e.target.checked })}
                    />
                    Con teléfono
                </label>
                <button
                    onClick={() => {
                        setFilters({ address: '', zone: '', sortOrder: 'desc', hasPhone: false, service: '' });
                        setSearchTerm('');
                    }}
                    className={styles.button}
                >
                    Limpiar Filtros
                </button>
            </div>
            <AdminTable
                customers={customers}
                loading={loading}
                selectedCustomers={new Set(selectedCustomers)}
                onSelectAll={handleSelectAll}
                onSelectCustomer={handleSelectCustomer}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSendEmail={(customer) => {
                    setSelectedCustomers([customer.id]);
                    setShowEmailModal(true);
                }}
                onSendWhatsApp={(customer) => {
                    setSelectedCustomers([customer.id]);
                    setShowWhatsAppModal(true);
                }}
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={totalItems}
                onPageChange={setCurrentPage}
            />

            {showAddModal && (
                <AddCustomerModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => {
                        setShowAddModal(false);
                        loadCustomers();
                    }}
                />
            )}

            {showEditModal && editingCustomer && (
                <EditCustomerModal
                    customer={editingCustomer}
                    onClose={() => {
                        setShowEditModal(false);
                        setEditingCustomer(null);
                    }}
                    onSuccess={() => {
                        setShowEditModal(false);
                        setEditingCustomer(null);
                        loadCustomers();
                    }}
                />
            )}

            {showEmailModal && (
                <EmailModal
                    customers={getSelectedCustomersData()}
                    onClose={() => setShowEmailModal(false)}
                />
            )}

            {showWhatsAppModal && (
                <WhatsAppModal
                    customers={getSelectedCustomersData().filter(c => c.telefono)}
                    onClose={() => setShowWhatsAppModal(false)}
                />
            )}

            {showHelpModal && (
                <InfoModal
                    title="Cómo funciona el Panel de Administración"
                    content={
                        <div>
                            <h3>📋 Gestión de Clientes</h3>
                            <ul>
                                <li><strong>Agregar Cliente:</strong> Crea nuevos registros de clientes con todos sus datos y servicios</li>
                                <li><strong>Editar Cliente:</strong> Modifica cualquier información del cliente haciendo clic en el botón ✏️</li>
                                <li><strong>Eliminar Cliente:</strong> Borra registros permanentemente con el botón 🗑️</li>
                            </ul>

                            <h3>🔍 Filtros y Búsqueda</h3>
                            <ul>
                                <li><strong>Búsqueda general:</strong> Busca por email, nombre o zona</li>
                                <li><strong>Filtro por dirección:</strong> Filtra clientes por dirección específica</li>
                                <li><strong>Filtro por zona:</strong> Muestra solo clientes de AMBA, CABA, Interior o AMBA+CABA</li>
                                <li><strong>Filtro por servicio:</strong> Muestra clientes que solicitaron servicios específicos (Diagnóstico, Mantenimiento, Reparación, etc.)</li>
                                <li><strong>Filtro por teléfono:</strong> Muestra solo clientes que tienen número de teléfono</li>
                                <li><strong>Ordenamiento:</strong> Ordena por fecha más reciente o más antigua</li>
                            </ul>

                            <h3>📧 Comunicación Masiva</h3>
                            <ul>
                                <li><strong>Email:</strong> Selecciona clientes con la casilla de verificación y envíales emails</li>
                                <li><strong>WhatsApp:</strong> Envía mensajes por WhatsApp solo a clientes con número registrado</li>
                                <li><strong>Límite de emails:</strong> Máximo 50 destinatarios por limite del proveedor</li>
                            </ul>

                            <h3>🎯 Selección de Clientes</h3>
                            <ul>
                                <li><strong>Selección individual:</strong> Marca/desmarca clientes con las casillas individuales</li>
                                <li><strong>Selección total:</strong> Usa la casilla del encabezado para seleccionar todos los visibles</li>
                                <li><strong>Contador:</strong> Los botones muestran cuántos clientes seleccionados son elegibles</li>
                            </ul>

                            <h3>📊 Información Adicional</h3>
                            <ul>
                                <li><strong>Detalles del cliente:</strong> Haz clic en cualquier fila para ver información completa</li>
                                <li><strong>Paginación:</strong> Navega entre páginas con los controles inferiores</li>
                                <li><strong>Estadísticas:</strong> Muestra cuántos clientes hay en total y cuántos se están mostrando</li>
                            </ul>
                        </div>
                    }
                    onClose={() => setShowHelpModal(false)}
                />
            )}
        </div>
    );
}
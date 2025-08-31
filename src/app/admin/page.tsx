'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CustomerData } from '@/types/customer';
import AdminTable from '@/components/admin/AdminTable';
import AddCustomerModal from '@/components/admin/AddCustomerModal';
import EmailModal from '@/components/admin/EmailModal';
import WhatsAppModal from '@/components/admin/WhatsAppModal';
import styles from './admin.module.css';

interface AdminCustomer extends CustomerData {
    id: string;
}

export default function AdminPanel() {
    const [customers, setCustomers] = useState<AdminCustomer[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [filters, setFilters] = useState({
        address: '',
        zone: '',
        sortOrder: 'desc'
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
                customerData = customerData.filter(c => c.zona === filters.zone);
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

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Panel de Administración</h1>
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
                        disabled={selectedCustomers.length === 0}
                    >
                        Enviar Email ({selectedCustomers.length})
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
                    value={filters.sortOrder}
                    onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
                    className={styles.filterSelect}
                >
                    <option value="desc">Fecha más reciente</option>
                    <option value="asc">Fecha más antigua</option>
                </select>
                <button
                    onClick={() => {
                        setFilters({ address: '', zone: '', sortOrder: 'desc' });
                        setSearchTerm('');
                    }}
                    className={styles.button}
                >
                    Limpiar Filtros
                </button>
            </div>

            <div className={styles.customerCount}>
                {loading ? 'Cargando...' : `Mostrando ${customers.length} de ${totalItems} clientes`}
            </div>
            <AdminTable
                customers={customers}
                loading={loading}
                selectedCustomers={new Set(selectedCustomers)}
                onSelectAll={handleSelectAll}
                onSelectCustomer={handleSelectCustomer}
                onDelete={handleDelete}
                onSendEmail={(customer) => setShowEmailModal(true)}
                onSendWhatsApp={(customer) => setShowWhatsAppModal(true)}
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
        </div>
    );
}
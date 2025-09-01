'use client';

import { useState, useEffect } from 'react';
import { useProfile, ProfileData, ServiceData } from '@/hooks/useProfile';
import styles from './ProfilePage.module.css';
import { ArrowLeftIcon } from 'lucide-react';

export default function ProfilePage() {
  const { data, loading, error, updateProfile, createProfile } = useProfile();
  const [formData, setFormData] = useState<ProfileData>({});
  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleInputChange = (field: keyof ProfileData, value: string | ServiceData) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error de JSON si existe
    if (field.startsWith('servicio_') && jsonErrors[field]) {
      setJsonErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateJson = (field: string, value: unknown): boolean => {
    if (!value) return true;
    
    // Si ya es un objeto, está válido
    if (typeof value === 'object' && value !== null) {
      return true;
    }
    
    // Si es string, validar que sea JSON válido
    if (typeof value === 'string') {
      if (!value.trim()) return true;
      
      try {
        JSON.parse(value);
        return true;
      } catch {
        setJsonErrors(prev => ({ ...prev, [field]: 'JSON inválido' }));
        return false;
      }
    }
    
    return true;
  };

  const handleSave = async () => {
    // Validar campos JSON
      const jsonFields = ['servicio_asesoria', 'servicio_diagnostico', 'servicio_instalacion', 'servicio_mantenimiento', 'servicio_reparacion'];
    let hasErrors = false;

    for (const field of jsonFields) {
      const value = formData[field as keyof ProfileData];
      if (value && !validateJson(field, value)) {
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setSaveMessage('Por favor corrige los errores de JSON');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    try {
      setIsSaving(true);
      setSaveMessage('');

      // Procesar campos JSON: convertir strings a objetos si es necesario
      const processedData: ProfileData = { ...formData };
      for (const field of jsonFields) {
        const value = formData[field as keyof ProfileData];
        if (typeof value === 'string' && value.trim()) {
          try {
            const parsedValue = JSON.parse(value);
            (processedData as Record<string, unknown>)[field] = parsedValue;
          } catch {
            // Si no es JSON válido, mantener como string
            (processedData as Record<string, unknown>)[field] = value;
          }
        } else if (typeof value === 'object' && value !== null) {
          // Ya es un objeto, mantenerlo así
          (processedData as Record<string, unknown>)[field] = value;
        }
      }

      if (data) {
        await updateProfile(processedData);
      } else {
        await createProfile(processedData);
      }

      setSaveMessage('Perfil guardado exitosamente');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch {
      setSaveMessage('Error al guardar el perfil');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };



  const getServiceData = (serviceKey: string): ServiceData => {
    const service = formData[serviceKey as keyof ProfileData];
    if (typeof service === 'object' && service !== null) {
      return service as ServiceData;
    }
    return {
      titulo: '',
      descripcion: '',
      duracion: '',
      precio: '',
      garantia: ''
    };
  };

  const updateServiceData = (serviceKey: string, field: string, value: string) => {
    const currentService = getServiceData(serviceKey);
    const updatedService = { ...currentService, [field]: value };
    handleInputChange(serviceKey as keyof ProfileData, updatedService);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <div className={styles.loading}>
              <div className={styles.skeleton}>
                <div className={`${styles.skeletonText} ${styles.skeleton}`} style={{width: '25%', marginBottom: '1rem'}}></div>
                <div className={styles.skeletonInput}></div>
                <div className={styles.skeletonInput}></div>
                <div className={styles.skeletonTextarea}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <h2 className={styles.errorTitle}>Error</h2>
          <p className={styles.errorText}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
                <div className={styles.logoContainer}>
                  <button className={styles.backButton} onClick={() => window.history.back()}>
                    <ArrowLeftIcon className={styles.backIcon} />
                  </button>
                    <div className={styles.logo}>AEG</div>
                    <h1>Perfil</h1>
                </div>
              </div>

          <div className={styles.cardContent}>
            <div className={styles.section}>
              {/* Información de Contacto */}
              <div>
                <h3 className={styles.sectionTitle}>Información de Contacto</h3>
                <div className={styles.grid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Email de Contacto
                      <small style={{ display: 'block', color: 'var(--accent)', marginTop: '0.25rem', fontWeight: 'normal' }}>
                        Correo principal para consultas de clientes
                      </small>
                    </label>
                    <input
                      type="email"
                      value={formData.email_contacto || ''}
                      onChange={(e) => handleInputChange('email_contacto', e.target.value)}
                      className={styles.input}
                      placeholder="contacto@aeg-hornos.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Teléfono
                      <small style={{ display: 'block', color: 'var(--accent)', marginTop: '0.25rem', fontWeight: 'normal' }}>
                        Línea directa de atención al cliente
                      </small>
                    </label>
                    <input
                      type="tel"
                      value={formData.numero_tel || ''}
                      onChange={(e) => handleInputChange('numero_tel', e.target.value)}
                      className={styles.input}
                      placeholder="+54 11 1234-5678"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      WhatsApp
                      <small style={{ display: 'block', color: 'var(--accent)', marginTop: '0.25rem', fontWeight: 'normal' }}>
                        Atención rápida y personalizada
                      </small>
                    </label>
                    <input
                      type="tel"
                      value={formData.numero_wsp || ''}
                      onChange={(e) => handleInputChange('numero_wsp', e.target.value)}
                      className={styles.input}
                      placeholder="+54 9 11 1234-5678"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Usuario Instagram
                      <small style={{ display: 'block', color: 'var(--accent)', marginTop: '0.25rem', fontWeight: 'normal' }}>
                        Red social para mostrar trabajos y testimonios
                      </small>
                    </label>
                    <input
                      type="text"
                      value={formData.usuario_instagram || ''}
                      onChange={(e) => handleInputChange('usuario_instagram', e.target.value)}
                      className={styles.input}
                      placeholder="@aeg_hornos_servicio"
                    />
                  </div>
                </div>
              </div>

              {/* Servicios */}
              <div>
                <h3 style={{ marginBottom: '1rem' }} className={styles.sectionTitle}>Servicios</h3>
                <div className={styles.section}>
                  {[
                    { key: 'servicio_asesoria', label: 'Asesoría Virtual' },
                    { key: 'servicio_diagnostico', label: 'Diagnóstico Profesional' },
                    { key: 'servicio_instalacion', label: 'Instalación Completa' },
                    { key: 'servicio_mantenimiento', label: 'Mantenimiento Premium' },
                    { key: 'servicio_reparacion', label: 'Reparación Integral' },
                  ].map(({ key, label }) => {
                     const service = getServiceData(key);
                     return (
                       <div key={key} className={styles.serviceCard}>
                         <div className={styles.serviceGrid}>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>{label} - Título</label>
                            <input
                              type="text"
                              value={service.titulo || ''}
                              onChange={(e) => updateServiceData(key, 'titulo', e.target.value)}
                              className={styles.input}
                              placeholder="Ingrese el título del servicio"
                            />
                          </div>
                          
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Icono</label>
                            <input
                              type="text"
                              value={service.icono || ''}
                              onChange={(e) => updateServiceData(key, 'icono', e.target.value)}
                              className={styles.input}
                              placeholder="Ej: Video, Search, Settings, Sparkles, Wrench"
                            />
                          </div>
                          
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Precio</label>
                            <input
                              type="text"
                              value={service.precio || ''}
                              onChange={(e) => updateServiceData(key, 'precio', e.target.value)}
                              className={styles.input}
                              placeholder="Ej: 20000, 35000, Consultar"
                            />
                          </div>
                          
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Duración</label>
                            <input
                              type="text"
                              value={service.duracion || ''}
                              onChange={(e) => updateServiceData(key, 'duracion', e.target.value)}
                              className={styles.input}
                              placeholder="Ej: 30 minutos, 1h, 2-3 horas"
                            />
                          </div>
                          
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Ubicación</label>
                            <input
                              type="text"
                              value={service.ubicacion || ''}
                              onChange={(e) => updateServiceData(key, 'ubicacion', e.target.value)}
                              className={styles.input}
                              placeholder="Ej: Sólo en CABA y AMBA, Vamos a domicilio"
                            />
                          </div>
                          
                          <div className={styles.formGroup}>
                            <label className={styles.label}>CTA (Call to Action)</label>
                            <input
                              type="text"
                              value={service.cta || ''}
                              onChange={(e) => updateServiceData(key, 'cta', e.target.value)}
                              className={styles.input}
                              placeholder="Ej: Agendar videollamada, Solicitar análisis"
                            />
                          </div>
                          
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Garantía</label>
                            <input
                              type="text"
                              value={service.garantia || ''}
                              onChange={(e) => updateServiceData(key, 'garantia', e.target.value)}
                              className={styles.input}
                              placeholder="Ej: 6 meses, 1 año"
                            />
                          </div>
                        </div>
                        
                        <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                          <label className={styles.label}>Descripción completa</label>
                          <textarea
                            value={service.descripcion || ''}
                            onChange={(e) => updateServiceData(key, 'descripcion', e.target.value)}
                            className={styles.textarea}
                            placeholder="Descripción detallada del servicio..."
                            rows={4}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mensajes y botón guardar */}
            <div className={styles.buttonGroup}>
              {saveMessage && (
                <div className={`${styles.message} ${
                  saveMessage.includes('Error') ? styles.messageError : styles.messageSuccess
                }`}>
                  {saveMessage}
                </div>
              )}
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`${styles.button} ${styles.buttonPrimary}`}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  minWidth: '200px',
                  justifyContent: 'center'
                }}
              >
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>

            <div style={{ 
              marginTop: '2rem', 
              paddingTop: '1.5rem', 
              borderTop: '1px solid rgba(234, 88, 12, 0.1)',
              textAlign: 'center',
              color: 'var(--accent)',
              fontSize: '0.875rem'
            }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
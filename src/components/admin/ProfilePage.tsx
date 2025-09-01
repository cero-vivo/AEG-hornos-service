'use client';

import { useState, useEffect } from 'react';
import { useProfile, ProfileData } from '@/hooks/useProfile';
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

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error de JSON si existe
    if (field.startsWith('servicio_') && jsonErrors[field]) {
      setJsonErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateJson = (field: string, value: any): boolean => {
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
      } catch (e) {
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
            processedData[field as keyof ProfileData] = JSON.parse(value) as any;
          } catch {
            // Si no es JSON válido, mantener como string
            processedData[field as keyof ProfileData] = value;
          }
        } else if (typeof value === 'object' && value !== null) {
          // Ya es un objeto, mantenerlo así
          processedData[field as keyof ProfileData] = value;
        }
      }

      if (data) {
        await updateProfile(processedData);
      } else {
        await createProfile(processedData);
      }

      setSaveMessage('Perfil guardado exitosamente');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error al guardar el perfil');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const formatJsonValue = (value: any): string => {
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return value || '';
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
                <h3 className={styles.sectionTitle}>Servicios</h3>
                <div className={styles.section}>
                  {[
                    { key: 'servicio_asesoria', label: 'Asesoría', description: 'Consultoría experta en hornos industriales' },
                    { key: 'servicio_diagnostico', label: 'Diagnóstico', description: 'Evaluación técnica completa de equipos' },
                    { key: 'servicio_instalacion', label: 'Instalación', description: 'Instalación profesional de hornos' },
                    { key: 'servicio_mantenimiento', label: 'Mantenimiento', description: 'Mantenimiento preventivo y correctivo' },
                    { key: 'servicio_reparacion', label: 'Reparación', description: 'Reparación integral de fallas técnicas' },
                  ].map(({ key, label, description }) => (
                    <div key={key} className={styles.formGroup}>
                      <label className={styles.label}>
                        {label}
                        <small style={{ display: 'block', color: 'var(--accent)', marginTop: '0.25rem', fontWeight: 'normal' }}>
                          {description}
                        </small>
                      </label>
                      <textarea
                        value={formatJsonValue(formData[key as keyof ProfileData])}
                        onChange={(e) => handleInputChange(key as keyof ProfileData, e.target.value)}
                        className={`${styles.textarea} ${
                          jsonErrors[key] ? styles.textareaError : ''
                        }`}
                        placeholder={`{
  "titulo": "${label} AEG",
  "descripcion": "${description} con los más altos estándares de calidad y experiencia.",
  "duracion": "2-4 horas",
  "precio": "Consultar",
  "garantia": "6 meses"
}`}
                        rows={8}
                      />
                      {jsonErrors[key] && (
                        <p className={styles.error}>{jsonErrors[key]}</p>
                      )}
                    </div>
                  ))}
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
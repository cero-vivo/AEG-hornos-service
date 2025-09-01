'use client';

import { useState } from 'react';
import { useSuggestions } from '@/hooks/useSuggestions';
import { SuggestionCategory } from '@/types/suggestion';
import { MessageSquare, Bug, Lightbulb, HelpCircle, AlertCircle, Send, X, CheckCircle } from 'lucide-react';
import styles from './SuggestionForm.module.css';

interface SuggestionFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

const categoryOptions: { value: SuggestionCategory; label: string; icon: React.ElementType; description: string }[] = [
  { value: 'bug', label: 'Reportar Bug', icon: Bug, description: 'Error o problema en la aplicación' },
  { value: 'suggestion', label: 'Sugerencia', icon: Lightbulb, description: 'Mejora o nueva funcionalidad' },
  { value: 'feature', label: 'Nueva Característica', icon: MessageSquare, description: 'Agregar algo completamente nuevo' },
  { value: 'question', label: 'Pregunta', icon: HelpCircle, description: 'Duda o consulta sobre el sistema' },
  { value: 'other', label: 'Otro', icon: AlertCircle, description: 'Cualquier otro tipo de comentario' },
];

export default function SuggestionForm({ onClose, onSuccess }: SuggestionFormProps) {
  const { addSuggestion } = useSuggestions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'suggestion' as SuggestionCategory,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (formData.description.length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }
    

    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await addSuggestion({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        priority: 'medium',
        status: 'pending',
        metadata: {
          browser: navigator.userAgent,
          url: window.location.href,
        },
      });
      
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'suggestion',
      });
    } catch (error) {
      console.error('Error submitting suggestion:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {showSuccess ? (
          <div className={styles.successMessage}>
            <div className={styles.successContent}>
              <CheckCircle className={styles.successIcon} />
              <h3 className={styles.successTitle}>¡Sugerencia Enviada!</h3>
              <p className={styles.successText}>Tu sugerencia ha sido enviada exitosamente. Gracias por tu aporte.</p>
              <button
                type="button"
                className={styles.okButton}
                onClick={() => {
                  setShowSuccess(false);
                  onSuccess?.();
                  onClose?.();
                }}
              >
                OK
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h2 className={styles.title}>
                <MessageSquare className={styles.icon} />
                Enviar Sugerencia o Reporte
              </h2>
              {onClose && (
                <button onClick={onClose} className={styles.closeButton}>
                  <X className={styles.closeIcon} />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tipo de mensaje</label>
            <div className={styles.categoryGrid}>
              {categoryOptions.map(({ value, label, icon: Icon, description }) => (
                <label key={value} className={styles.categoryOption}>
                  <input
                    type="radio"
                    name="category"
                    value={value}
                    checked={formData.category === value}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={styles.radio}
                  />
                  <div className={styles.categoryContent}>
                    <Icon className={styles.categoryIcon} />
                    <div>
                      <div className={styles.categoryLabel}>{label}</div>
                      <div className={styles.categoryDescription}>{description}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Título
              <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`${styles.input} ${errors.title ? styles.error : ''}`}
              placeholder="Breve descripción del tema"
              maxLength={100}
            />
            {errors.title && <span className={styles.errorText}>{errors.title}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Descripción
              <span className={styles.required}>*</span>
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
              placeholder="Describe en detalle el problema, sugerencia o pregunta..."
              rows={5}
              maxLength={1000}
            />
            {errors.description && <span className={styles.errorText}>{errors.description}</span>}
            <div className={styles.charCount}>{formData.description.length}/1000</div>
          </div>



          <div className={styles.actions}>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelButton}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner} />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className={styles.submitIcon} />
                  Enviar Mensaje
                </>
              )}
            </button>
          </div>
        </form>
          </>
        )}
      </div>
    </div>
  );
}
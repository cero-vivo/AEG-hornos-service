'use client';

import { useState } from 'react';
import SuggestionForm from './SuggestionForm';
import SuggestionsManager from './SuggestionsManager';
import { MessageSquare, Plus } from 'lucide-react';
import { useSuggestions } from '@/hooks/useSuggestions';
import styles from './SuggestionsPanel.module.css';

export default function SuggestionsPanel() {
  const [showForm, setShowForm] = useState(false);
  const { suggestions, loading, error, refreshSuggestions } = useSuggestions();

  const handleFormSuccess = () => {
    setShowForm(false);
    // Actualizar la lista automáticamente después de enviar
    refreshSuggestions();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <MessageSquare className={styles.icon} />
          Centro de Sugerencias y Reportes
        </h1>
        <p className={styles.subtitle}>
          Gestiona las sugerencias, reportes de bugs y mejoras del sistema
        </p>
      </div>

      {/* Lista de sugerencias - siempre visible y actualizable */}
      <div className={styles.content}>
        <SuggestionsManager 
          suggestions={suggestions}
          loading={loading}
          error={error}
          onRefresh={refreshSuggestions}
        />
      </div>

      {/* Floating action button for quick access */}
      <button
        className={styles.fab}
        onClick={() => setShowForm(true)}
        title="Enviar sugerencia rápida"
      >
        <Plus className={styles.fabIcon} />
      </button>

      {/* Modal for quick form */}
      {showForm && (
        <SuggestionForm 
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
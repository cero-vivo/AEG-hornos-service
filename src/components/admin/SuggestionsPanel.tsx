'use client';

import { useState } from 'react';
import SuggestionForm from './SuggestionForm';
import SuggestionsManager from './SuggestionsManager';
import { MessageSquare, Settings, Plus } from 'lucide-react';
import styles from './SuggestionsPanel.module.css';

export default function SuggestionsPanel() {
  const [showForm, setShowForm] = useState(false);

  const handleFormSuccess = () => {
    setShowForm(false);
    // Optionally refresh the list
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

      {/* Lista de sugerencias - siempre visible */}
      <div className={styles.content}>
        <SuggestionsManager />
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
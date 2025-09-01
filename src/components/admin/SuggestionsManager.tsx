'use client';

import { useState } from 'react';
import { useSuggestions } from '@/hooks/useSuggestions';
import { Suggestion, SuggestionCategory, SuggestionStatus } from '@/types/suggestion';
import { 
  MessageSquare, 
  Bug, 
  Lightbulb, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Trash2, 
  Edit, 
  Save, 
  X,
  Filter,
  ChevronDown
} from 'lucide-react';
import styles from './SuggestionsManager.module.css';

const categoryIcons = {
  bug: Bug,
  suggestion: Lightbulb,
  feature: MessageSquare,
  question: HelpCircle,
  other: AlertCircle,
};

const statusConfig = {
  pending: { label: 'Pendiente', icon: Clock, color: '#f59e0b' },
  in_progress: { label: 'En Progreso', icon: Clock, color: '#3b82f6' },
  resolved: { label: 'Resuelto', icon: CheckCircle, color: '#10b981' },
  rejected: { label: 'Rechazado', icon: XCircle, color: '#ef4444' },
};

const categoryLabels = {
  bug: 'Bug',
  suggestion: 'Sugerencia',
  feature: 'Característica',
  question: 'Pregunta',
  other: 'Otro',
};

interface SuggestionsManagerProps {
  onClose?: () => void;
}

export default function SuggestionsManager({ onClose }: SuggestionsManagerProps) {
  const { suggestions, loading, error, updateSuggestion, deleteSuggestion } = useSuggestions();
  const [filterCategory, setFilterCategory] = useState<SuggestionCategory | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<SuggestionStatus | 'all'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredSuggestions = suggestions.filter(suggestion => {
    const categoryMatch = filterCategory === 'all' || suggestion.category === filterCategory;
    const statusMatch = filterStatus === 'all' || suggestion.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const handleStatusChange = async (id: string, newStatus: SuggestionStatus) => {
    try {
      await updateSuggestion(id, { status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta sugerencia?')) {
      try {
        await deleteSuggestion(id);
      } catch (error) {
        console.error('Error deleting suggestion:', error);
      }
    }
  };

  const startEditingNotes = (suggestion: Suggestion) => {
    setEditingId(suggestion.id || null);
    setEditingNotes(suggestion.adminNotes || '');
  };

  const saveNotes = async (id: string) => {
    try {
      await updateSuggestion(id, { adminNotes: editingNotes });
      setEditingId(null);
      setEditingNotes('');
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando sugerencias...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <AlertCircle className={styles.errorIcon} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gestión de Sugerencias y Reportes</h2>
        {onClose && (
          <button onClick={onClose} className={styles.closeButton}>
            <X className={styles.closeIcon} />
          </button>
        )}
      </div>

      <div className={styles.filters}>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={styles.filterToggle}
        >
          <Filter className={styles.filterIcon} />
          Filtros
          <ChevronDown className={`${styles.chevron} ${showFilters ? styles.open : ''}`} />
        </button>
        
        {showFilters && (
          <div className={styles.filterOptions}>
            <div className={styles.filterGroup}>
              <label>Categoría:</label>
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value as SuggestionCategory | 'all')}
                className={styles.select}
              >
                <option value="all">Todas</option>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label>Estado:</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value as SuggestionStatus | 'all')}
                className={styles.select}
              >
                <option value="all">Todos</option>
                {Object.entries(statusConfig).map(([value, { label }]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{suggestions.length}</div>
          <div className={styles.statLabel}>Total</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{suggestions.filter(s => s.status === 'pending').length}</div>
          <div className={styles.statLabel}>Pendientes</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{suggestions.filter(s => s.status === 'resolved').length}</div>
          <div className={styles.statLabel}>Resueltos</div>
        </div>
      </div>

      <div className={styles.suggestionsList}>
        {filteredSuggestions.length === 0 ? (
          <div className={styles.empty}>
            <MessageSquare className={styles.emptyIcon} />
            <p>No hay sugerencias que coincidan con los filtros seleccionados.</p>
          </div>
        ) : (
          filteredSuggestions.map((suggestion) => {
            const CategoryIcon = categoryIcons[suggestion.category];
            const statusInfo = statusConfig[suggestion.status];
            const StatusIcon = statusInfo.icon;

            return (
              <div key={suggestion.id} className={styles.suggestionCard}>
                <div className={styles.suggestionHeader}>
                  <div className={styles.suggestionInfo}>
                    <div className={styles.categoryBadge}>
                      <CategoryIcon className={styles.categoryIcon} />
                      <span>{categoryLabels[suggestion.category]}</span>
                    </div>
                    <div className={styles.priorityIndicator} style={{ backgroundColor: getPriorityColor(suggestion.priority) }} />
                    <select
                      value={suggestion.status}
                      onChange={(e) => handleStatusChange(suggestion.id!, e.target.value as SuggestionStatus)}
                      className={styles.statusSelect}
                      style={{ color: statusInfo.color }}
                    >
                      {Object.entries(statusConfig).map(([value, { label }]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.actions}>
                    <button
                      onClick={() => handleDelete(suggestion.id!)}
                      className={styles.deleteButton}
                      title="Eliminar"
                    >
                      <Trash2 className={styles.actionIcon} />
                    </button>
                  </div>
                </div>

                <div className={styles.suggestionContent}>
                  <h3 className={styles.suggestionTitle}>{suggestion.title}</h3>
                  <p className={styles.suggestionDescription}>{suggestion.description}</p>
                  
                  {(suggestion.userEmail || suggestion.userName) && (
                    <div className={styles.userInfo}>
                      {suggestion.userName && <span className={styles.userName}>{suggestion.userName}</span>}
                      {suggestion.userEmail && <span className={styles.userEmail}>{suggestion.userEmail}</span>}
                    </div>
                  )}

                  <div className={styles.suggestionMeta}>
                    <span className={styles.date}>
                      {suggestion.createdAt.toLocaleDateString('es-AR')}
                    </span>
                    <span className={styles.date}>
                      {suggestion.createdAt.toLocaleTimeString('es-AR')}
                    </span>
                  </div>
                </div>

                <div className={styles.notesSection}>
                  {editingId === suggestion.id ? (
                    <div className={styles.notesEdit}>
                      <textarea
                        value={editingNotes}
                        onChange={(e) => setEditingNotes(e.target.value)}
                        className={styles.notesInput}
                        placeholder="Agregar notas administrativas..."
                        rows={3}
                      />
                      <div className={styles.notesActions}>
                        <button
                          onClick={() => setEditingId(null)}
                          className={styles.cancelNotes}
                        >
                          <X className={styles.actionIcon} />
                        </button>
                        <button
                          onClick={() => saveNotes(suggestion.id!)}
                          className={styles.saveNotes}
                        >
                          <Save className={styles.actionIcon} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className={styles.notesDisplay}
                      onClick={() => startEditingNotes(suggestion)}
                    >
                      {suggestion.adminNotes ? (
                        <p>{suggestion.adminNotes}</p>
                      ) : (
                        <p className={styles.noNotes}>Agregar notas...</p>
                      )}
                      <Edit className={styles.editIcon} />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
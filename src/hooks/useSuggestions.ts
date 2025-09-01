import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Suggestion, SuggestionCategory, SuggestionStatus } from '@/types/suggestion';

interface UseSuggestionsReturn {
  suggestions: Suggestion[];
  loading: boolean;
  error: string | null;
  addSuggestion: (suggestion: Omit<Suggestion, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateSuggestion: (id: string, data: Partial<Suggestion>) => Promise<void>;
  deleteSuggestion: (id: string) => Promise<void>;
  getSuggestionsByCategory: (category: SuggestionCategory) => Promise<Suggestion[]>;
  getSuggestionsByStatus: (status: SuggestionStatus) => Promise<Suggestion[]>;
  refreshSuggestions: () => Promise<void>;
}

export const useSuggestions = (): UseSuggestionsReturn => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const collectionRef = collection(db, 'suggestions');

  const refreshSuggestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const q = query(collectionRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const suggestionsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Suggestion;
      });
      
      setSuggestions(suggestionsData);
    } catch (err) {
      setError('Error al cargar las sugerencias');
      console.error('Error loading suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSuggestions();
  }, []);

  const addSuggestion = async (suggestion: Omit<Suggestion, 'id' | 'createdAt' | 'updatedAt' | 'userName' | 'userEmail'>): Promise<string> => {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collectionRef, {
        ...suggestion,
        userName: null,
        userEmail: null,
        status: 'pending',
        createdAt: now,
        updatedAt: now,
      });
      
      await refreshSuggestions();
      return docRef.id;
    } catch (err) {
      setError('Error al agregar la sugerencia');
      console.error('Error adding suggestion:', err);
      throw err;
    }
  };

  const updateSuggestion = async (id: string, data: Partial<Suggestion>): Promise<void> => {
    try {
      const docRef = doc(collectionRef, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
      
      await refreshSuggestions();
    } catch (err) {
      setError('Error al actualizar la sugerencia');
      console.error('Error updating suggestion:', err);
      throw err;
    }
  };

  const deleteSuggestion = async (id: string): Promise<void> => {
    try {
      const docRef = doc(collectionRef, id);
      await deleteDoc(docRef);
      
      await refreshSuggestions();
    } catch (err) {
      setError('Error al eliminar la sugerencia');
      console.error('Error deleting suggestion:', err);
      throw err;
    }
  };

  const getSuggestionsByCategory = async (category: SuggestionCategory): Promise<Suggestion[]> => {
    try {
      const q = query(collectionRef, where('category', '==', category), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Suggestion;
      });
    } catch (err) {
      setError('Error al filtrar sugerencias por categoría');
      console.error('Error filtering by category:', err);
      throw err;
    }
  };

  const getSuggestionsByStatus = async (status: SuggestionStatus): Promise<Suggestion[]> => {
    try {
      const q = query(collectionRef, where('status', '==', status), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Suggestion;
      });
    } catch (err) {
      setError('Error al filtrar sugerencias por estado');
      console.error('Error filtering by status:', err);
      throw err;
    }
  };

  return {
    suggestions,
    loading,
    error,
    addSuggestion,
    updateSuggestion,
    deleteSuggestion,
    getSuggestionsByCategory,
    getSuggestionsByStatus,
    refreshSuggestions,
  };
};
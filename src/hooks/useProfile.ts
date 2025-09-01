import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface ServiceData {
  titulo?: string;
  descripcion?: string;
  duracion?: string;
  precio?: string;
  garantia?: string;
  icono?: string;
  cta?: string;
  ubicacion?: string;
}

export interface ProfileData {
  email_contacto?: string;
  numero_tel?: string;
  numero_wsp?: string;
  usuario_instagram?: string;
  servicio_asesoria?: ServiceData | string;
  servicio_diagnostico?: ServiceData | string;
  servicio_instalacion?: ServiceData | string;
  servicio_mantenimiento?: ServiceData | string;
  servicio_reparacion?: ServiceData | string;
}

interface UseProfileReturn {
  data: ProfileData | null;
  loading: boolean;
  error: string | null;
  getProfile: () => Promise<void>;
  createProfile: (data: ProfileData) => Promise<void>;
  updateProfile: (data: Partial<ProfileData>) => Promise<void>;
  deleteProfile: () => Promise<void>;
}

export const useProfile = (): UseProfileReturn => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const PROFILE_DOC_PATH = 'profile/main';

  const getProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const docRef = doc(db, PROFILE_DOC_PATH);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setData(docSnap.data() as ProfileData);
      } else {
        setData(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener perfil');
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (newData: ProfileData) => {
    try {
      setLoading(true);
      setError(null);
      
      const docRef = doc(db, PROFILE_DOC_PATH);
      await setDoc(docRef, newData);
      setData(newData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear perfil');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updateData: Partial<ProfileData>) => {
    try {
      setLoading(true);
      setError(null);
      
      const docRef = doc(db, PROFILE_DOC_PATH);
      await updateDoc(docRef, updateData);
      
      setData(prev => ({ ...prev, ...updateData }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar perfil');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const docRef = doc(db, PROFILE_DOC_PATH);
      await deleteDoc(docRef);
      
      setData(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar perfil');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return {
    data,
    loading,
    error,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
  };
};
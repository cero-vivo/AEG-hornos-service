import { useProfile } from './useProfile';

export const useNumeroWsp = () => {
  const { data, loading, error } = useProfile();
  
  return { 
    numeroWsp: data?.numero_wsp || '', 
    loading, 
    error 
  };
};
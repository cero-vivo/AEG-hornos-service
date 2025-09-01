import { useProfile } from './useProfile';

export const useInstagram = () => {
  const { data, loading, error } = useProfile();
  
  return { 
    usuarioInstagram: data?.usuario_instagram || '', 
    loading, 
    error 
  };
};
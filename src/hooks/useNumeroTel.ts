import { useProfile } from './useProfile';

export const useNumeroTel = () => {
  const { data, loading, error } = useProfile();
  
  return { 
    numeroTel: data?.numero_tel || '', 
    loading, 
    error 
  };
};
import { useProfile } from './useProfile';

export const useEmailContacto = () => {
  const { data, loading, error } = useProfile();
  
  return { 
    emailContacto: data?.email_contacto || '', 
    loading, 
    error 
  };
};
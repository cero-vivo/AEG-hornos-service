import { useEffect, useState } from 'react';
import { remoteConfig } from '@/lib/firebase';
import { getValue, fetchAndActivate } from 'firebase/remote-config';

export function useEmailContacto() {
  const [emailContacto, setEmailContacto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmail() {
      remoteConfig.settings.minimumFetchIntervalMillis = 1000 * 60; // 1 minuto
      await fetchAndActivate(remoteConfig);
      const value = getValue(remoteConfig, 'email_contacto').asString();
      setEmailContacto(value || null);
      setLoading(false);
    }
    fetchEmail();
  }, []);

  return { emailContacto, loading };
} 
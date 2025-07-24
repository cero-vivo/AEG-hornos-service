import { useEffect, useState } from 'react';
import { remoteConfig } from '@/lib/firebase';
import { getValue, fetchAndActivate } from 'firebase/remote-config';

export function useNumeroWsp() {
  const [numeroWsp, setNumeroWsp] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNumero() {
      remoteConfig.settings.minimumFetchIntervalMillis = 1000 * 60; // 1 minuto
      await fetchAndActivate(remoteConfig);
      const value = getValue(remoteConfig, 'numero_wsp').asString();
      setNumeroWsp(value || null);
      setLoading(false);
    }
    fetchNumero();
  }, []);

  return { numeroWsp, loading };
} 
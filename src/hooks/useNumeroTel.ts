import { useEffect, useState } from 'react';
import { remoteConfig } from '@/lib/firebase';
import { getValue, fetchAndActivate } from 'firebase/remote-config';

export function useNumeroTel() {
  const [numeroTel, setNumeroTel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNumero() {
      remoteConfig.settings.minimumFetchIntervalMillis = 1000 * 60; // 1 minuto
      await fetchAndActivate(remoteConfig);
      const value = getValue(remoteConfig, 'numero_tel').asString();
      setNumeroTel(value || null);
      setLoading(false);
    }
    fetchNumero();
  }, []);

  return { numeroTel, loading };
} 
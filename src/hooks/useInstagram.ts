import { useEffect, useState } from 'react';
import { getValue, fetchAndActivate } from 'firebase/remote-config';
import { remoteConfig } from '@/lib/firebase';

export function useInstagram() {
  const [usuarioInstagram, setUsuarioInstagram] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstagram() {
      try {
        remoteConfig.settings.minimumFetchIntervalMillis = 1000 * 60;
        await fetchAndActivate(remoteConfig);
        const value = getValue(remoteConfig, 'usuario_instagram').asString();
        setUsuarioInstagram(value || null);
      } catch (error) {
        console.error('Error fetching Instagram usuario:', error);
        setUsuarioInstagram(null);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagram();
  }, []);

  return { usuarioInstagram, loading };
} 
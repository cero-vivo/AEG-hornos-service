import { useEffect, useState } from 'react';
import { remoteConfig } from '@/lib/firebase';
import { getValue, fetchAndActivate } from 'firebase/remote-config';

export interface Servicio {
  titulo: string;
  descripcion: string;
  precio: string;
  imagen: string;
  icono: string;
  cta: string;
  duracion?: string;
  ubicacion?: string;
}

const KEYS = [
  'servicio_diagnostico',
  'servicio_mantenimiento',
  'servicio_reparacion',
  'servicio_asesoria',
  'servicio_instalacion'
];

export function useServicios() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServicios() {
      remoteConfig.settings.minimumFetchIntervalMillis = 1000 * 60; // 1 minuto
      await fetchAndActivate(remoteConfig);

      const result: Servicio[] = [];
      for (const key of KEYS) {
        const value = getValue(remoteConfig, key).asString();
        if (value) {
          try {
            result.push(JSON.parse(value));
          } catch (e) {
            // Si el JSON está mal, lo ignora
          }
        }
      }
      setServicios(result);
      setLoading(false);
    }
    fetchServicios();
  }, []);

  return { servicios, loading };
} 
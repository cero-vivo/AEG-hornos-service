import { useProfile } from './useProfile';

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
  const { data, loading } = useProfile();

  const servicios: Servicio[] = [];
  
  if (data) {
    for (const key of KEYS) {
      const value = data[key as keyof typeof data];
      if (value && typeof value === 'object') {
        servicios.push(value as Servicio);
      }
    }
  }

  return { servicios, loading };
}
export interface CustomerData {
  id?: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  zona: 'CABA' | 'AMBA' | 'Interior';
  descripcionProblema: string;
  selectedServices: string[];
  fechaContacto: Date;
  estado: 'nuevo' | 'contactado' | 'en_proceso' | 'completado';
  notas?: string;
  fotoUrls?: string[];
}

export interface CustomerFormData {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  zona: 'CABA' | 'AMBA' | 'Interior';
  descripcionProblema: string;
  selectedServices: string[];
}
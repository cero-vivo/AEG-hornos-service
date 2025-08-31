export interface CustomerData {
  id?: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  zona: 'caba' | 'amba' | 'interior';
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
  zona: 'caba' | 'amba' | 'interior';
  descripcionProblema: string;
  selectedServices: string[];
}
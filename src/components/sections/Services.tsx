import ServiceCard from "../ui/ServiceCard";
import styles from "../../app/landing.module.css";
import { useServicios } from '@/hooks/useServicios';

interface ServicesProps {
  selectedServices: string[];
  onToggleService: (serviceTitle: string) => void;
}

type IconType = "Search" | "Sparkles" | "Wrench" | "Video" | "Settings";

export default function Services({ selectedServices, onToggleService }: ServicesProps) {
  const { servicios, loading } = useServicios();

  if (loading) return <div className={styles.cards}>Cargando servicios...</div>;

  return (
    <section id="servicios" className={styles.services}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>Nuestros Servicios</span>
        <h2>Elegí el plan perfecto para tu horno</h2>
        <p className={styles.sectionSubtitle}>
          Desde diagnósticos rápidos hasta reparaciones completas. <strong>Seleccioná uno o más servicios</strong> y te contactamos en 24hs.
        </p>
      </div>
      <div className={styles.cards}>
        {servicios.map((servicio) => (
          <ServiceCard
            key={servicio.titulo}
            icon={servicio.icono as IconType}
            title={servicio.titulo}
            description={servicio.descripcion}
            duration={servicio.duracion}
            location={servicio.ubicacion}
            price={servicio.precio}
            ctaText={servicio.cta}
            isSelected={selectedServices.includes(servicio.titulo)}
            onToggle={() => onToggleService(servicio.titulo)}
            imageUrl={servicio.imagen}
          />
        ))}
      </div>
    </section>
  );
} 
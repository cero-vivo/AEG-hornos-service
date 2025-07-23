import ServiceCard from "../ui/ServiceCard";
import styles from "../../app/landing.module.css";
import content from "../../data/content.json";

interface ServicesProps {
  selectedServices: string[];
  onToggleService: (serviceTitle: string) => void;
}

// Tipo para mapear los iconos del JSON a los tipos de ServiceCard
type IconType = "Search" | "Sparkles" | "Wrench" | "Video" | "Settings";

export default function Services({ selectedServices, onToggleService }: ServicesProps) {
  const { services } = content;

  return (
    <section id="servicios" className={styles.services}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>{services.badge}</span>
        <h2>{services.title}</h2>
        <p className={styles.sectionSubtitle}>
          {services.subtitle.split('**').map((text, index) => 
            index % 2 === 1 ? <strong key={index}>{text}</strong> : text
          )}
        </p>
      </div>
      <div className={styles.cards}>
        {services.items.map((service) => (
          <ServiceCard 
            key={service.title} 
            icon={service.icon as IconType}
            title={service.title}
            description={service.description}
            duration={service.duration}
            location={service.location}
            price={service.price}
            ctaText={service.ctaText}
            isSelected={selectedServices.includes(service.title)}
            onToggle={() => onToggleService(service.title)}
          />
        ))}
      </div>
    </section>
  );
} 
import styles from "./ServiceCard.module.css";

interface ServiceCardProps {
  icon?: string;
  title: string;
  description: string;
  duration?: string;
  location?: string;
  price: string;
  ctaText?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  duration,
  location,
  price,
  ctaText = "Solicitar",
}: ServiceCardProps) {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <h3 className={styles.title}>{title}</h3>
      </header>
      <p className={styles.price}>{price}</p>
      <p className={styles.description}>{description}</p>
      <ul className={styles.details}>
        {duration && <li>🕐 {duration}</li>}
        {location && <li>📍 {location}</li>}
      </ul>
      <button className={styles.cta}>{ctaText}</button>
    </div>
  );
} 
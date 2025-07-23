"use client";

import { useState } from "react";
import styles from "./ServiceCard.module.css";
import { Search, Sparkles, Wrench, Video, Settings, Clock, MapPin } from "lucide-react";

const iconMap = {
  Search,
  Sparkles, 
  Wrench,
  Video,
  Settings,
};

interface ServiceCardProps {
  icon?: keyof typeof iconMap;
  title: string;
  description: string;
  duration?: string;
  location?: string;
  price: string;
  ctaText?: string;
  isSelected?: boolean;
  onToggle?: () => void;
}

export default function ServiceCard({
  icon,
  title,
  description,
  duration,
  location,
  price,
  ctaText = "Solicitar",
  isSelected: externalSelected,
  onToggle,
}: ServiceCardProps) {
  const [internalSelected, setInternalSelected] = useState(false);
  const isSelected = externalSelected !== undefined ? externalSelected : internalSelected;
  const IconComponent = icon ? iconMap[icon as keyof typeof iconMap] : null;

  const handleClick = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalSelected(!internalSelected);
    }
  };

  return (
    <div 
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <header className={styles.header}>
        {IconComponent && <IconComponent className={styles.icon} size={24} />}
        <h3 className={styles.title}>{title}</h3>
      </header>
      <p className={styles.price}>{price}</p>
      <p className={styles.description}>{description}</p>
      <ul className={styles.details}>
        {duration && (
          <li>
            <Clock size={14} />
            <span>{duration}</span>
          </li>
        )}
        {location && (
          <li>
            <MapPin size={14} />
            <span>{location}</span>
          </li>
        )}
      </ul>
      <button className={styles.cta}>
        {isSelected ? "¡Seleccionado!" : ctaText}
      </button>
    </div>
  );
} 
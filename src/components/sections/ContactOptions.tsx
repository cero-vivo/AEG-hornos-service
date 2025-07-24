"use client";

import { useState } from "react";
import { 
  Phone, 
  MessageSquare, 
  Calendar, 
  Zap, 
  Edit, 
  Target, 
  Lightbulb, 
  AlertCircle, 
  Clock 
} from "lucide-react";
import styles from "../../app/landing.module.css";
import content from "../../data/content.json";
import Modal from "../ui/Modal";
import CalendarBooking from "../ui/Calendar";
import { useNumeroWsp } from '@/hooks/useNumeroWsp';

const iconMap = {
  Phone,
  MessageSquare,
  Calendar,
  Zap,
  Edit,
  Target,
  Lightbulb,
  AlertCircle,
  Clock,
};

type IconType = keyof typeof iconMap;

interface ContactOptionsProps {
  selectedServices: string[];
  generateWhatsAppMessage: () => string;
}

export default function ContactOptions({ selectedServices, generateWhatsAppMessage }: ContactOptionsProps) {
  const { contactOptions, company } = content;
  const { numeroWsp, loading: loadingWsp } = useNumeroWsp();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleOpenCalendar = () => {
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
  };

  return (
    <section id="contacto" className={styles.contactOptions}>
      <div className={styles.contactHeader}>
        <h2>{contactOptions.title}</h2>
        <p>{contactOptions.subtitle}</p>
      </div>
      
      <div className={styles.optionsGrid}>
        {contactOptions.options.map((option, index) => {
          const OptionIcon = iconMap[option.icon as IconType];
          
          return (
            <div 
              key={index} 
              className={`${styles.option} ${option.priority ? styles.priority : ''}`}
            >
              {option.priority && (
                <div className={styles.priorityBadge}>
                  <Zap size={12} />
                  <span>{option.priorityBadge}</span>
                </div>
              )}
              
              <div className={styles.optionIcon}>
                <OptionIcon size={32} />
              </div>
              
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              
              <ul className={styles.optionFeatures}>
                {option.features.map((feature, featureIndex) => {
                  const FeatureIcon = iconMap[feature.icon as IconType];
                  return (
                    <li key={featureIndex}>
                      <FeatureIcon size={14} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent)' }} />
                      {feature.text}
                    </li>
                  );
                })}
              </ul>
              
              {/* Acciones específicas para contacto inmediato */}
              {option.type === 'immediate' && option.actions && (
                <div className={styles.quickActions}>
                  {option.actions.map((action, actionIndex) => {
                    const ActionIcon = iconMap[action.icon as IconType];
                    
                    if (action.type === 'whatsapp') {
                      return (
                        <a 
                          key={actionIndex}
                          href={numeroWsp ? `https://wa.me/${numeroWsp.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage()}` : undefined}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.whatsappButton}
                          style={loadingWsp || !numeroWsp ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                        >
                          <ActionIcon size={16} /> {loadingWsp ? 'Cargando...' : action.text}
                        </a>
                      );
                    } else if (action.type === 'call') {
                      return (
                        <a 
                          key={actionIndex}
                          href={`tel:${company.phone}`}
                          className={styles.callButton}
                        >
                          <ActionIcon size={16} /> {action.text}
                        </a>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
              
              {/* Acción para formulario */}
              {option.type === 'form' && option.action && (
                <button 
                  className={styles.optionButton}
                  onClick={() => {
                    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {(() => {
                    const ButtonIcon = iconMap[option.action.icon as IconType];
                    return <ButtonIcon size={18} />;
                  })()}
                  <span>{option.action.text}</span>
                </button>
              )}
              
              {/* Acción para agendar */}
              {option.type === 'schedule' && option.action && (
                <button 
                  className={styles.optionButton}
                  onClick={handleOpenCalendar}
                >
                  {(() => {
                    const ButtonIcon = iconMap[option.action.icon as IconType];
                    return <ButtonIcon size={18} />;
                  })()}
                  <span>{option.action.text}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal del calendario */}
      <Modal isOpen={isCalendarOpen} onClose={handleCloseCalendar}>
        <CalendarBooking
          selectedServices={selectedServices}
          onClose={handleCloseCalendar}
        />
      </Modal>
    </section>
  );
} 
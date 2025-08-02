import { Phone, MessageSquare, Mail, Instagram } from "lucide-react";
import styles from "../../app/landing.module.css";
import content from "../../data/content.json";
import { useNumeroWsp } from '@/hooks/useNumeroWsp';
import { useEffect, useState } from 'react';
import { getValue, fetchAndActivate } from 'firebase/remote-config';
import { remoteConfig } from '@/lib/firebase';
import { useNumeroTel } from "@/hooks/useNumeroTel";

const iconMap = {
  Phone,
  MessageSquare,
  Mail,
  Instagram,
};

type IconType = keyof typeof iconMap;

interface FooterProps {
  generateWhatsAppMessage: () => string;
  generateContactMessage: () => string;
}

function useEmailContacto() {
  const [emailContacto, setEmailContacto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchEmail() {
      remoteConfig.settings.minimumFetchIntervalMillis = 1000 * 60;
      await fetchAndActivate(remoteConfig);
      const value = getValue(remoteConfig, 'email_contacto').asString();
      setEmailContacto(value || null);
      setLoading(false);
    }
    fetchEmail();
  }, []);
  return { emailContacto, loading };
}

export default function Footer({ generateWhatsAppMessage, generateContactMessage }: FooterProps) {
  const { numeroWsp, loading: loadingWsp } = useNumeroWsp();
  const { numeroTel, loading: loadingTel } = useNumeroTel();
  const { emailContacto, loading: loadingEmail } = useEmailContacto();
  const { footer, company } = content;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerBrand}>
          <div className={styles.logo}>{company.name}</div>
          <p>{footer.description}</p>
        </div>
        
        <div className={styles.footerContact}>
          <h4>{footer.contact.title}</h4>
          <div className={styles.contactLinks}>
            {footer.contact.links.map((link, index) => {
              const LinkIcon = iconMap[link.icon as IconType];
              let href = link.href || '';
              
              // Generar href dinámico según el tipo
              if (link.type === 'whatsapp') {
                href = numeroWsp ? `https://wa.me/${numeroWsp.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage()}` : '';
              } else if (link.type === 'email') {
                href = emailContacto ? `mailto:${emailContacto}?subject=${encodeURIComponent(content.messages.emailSubject)}&body=${encodeURIComponent(generateContactMessage())}` : '';
              } else if (link.type === 'instagram') {
                href = company.instagramUrl;
              } else if (link.type === 'phone') {
                href = numeroTel ? `tel:${numeroTel.replace(/[^0-9]/g, '')}` : '';
              }
              
              return (
                <a
                  key={index}
                  href={href}
                  target={link.type === 'whatsapp' || link.type === 'instagram' ? '_blank' : undefined}
                  rel={link.type === 'whatsapp' || link.type === 'instagram' ? 'noopener noreferrer' : undefined}
                  className={styles.contactLink}
                  title={link.type === 'instagram' ? generateContactMessage() : undefined}
                  style={link.type === 'whatsapp' && (loadingWsp || !numeroWsp) ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                >
                  <LinkIcon size={16} />
                  <span>
                    {link.type === 'whatsapp' && loadingWsp ? 'Cargando...' :
                     link.type === 'email' && loadingEmail ? 'Cargando...' :
                     link.type === 'phone' && loadingTel ? 'Cargando...' :
                     link.type === 'email' ? (emailContacto || company.email) :
                     link.type === 'phone' ? (numeroTel || company.phone) :
                     link.type === 'instagram' ? company.instagram :
                     link.text}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
        
        <div className={styles.footerZones}>
          <h4>{footer.zones.title}</h4>
          <ul>
            {footer.zones.list.map((zone, index) => (
              <li key={index}>{zone}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p dangerouslySetInnerHTML={{ 
          __html: footer.copyright.replace('{year}', currentYear.toString()) 
        }} />
      </div>
    </footer>
  );
} 
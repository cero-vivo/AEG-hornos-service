import { Phone, MessageSquare, Mail, Instagram } from "lucide-react";
import styles from "../../app/landing.module.css";
import content from "../../data/content.json";

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

export default function Footer({ generateWhatsAppMessage, generateContactMessage }: FooterProps) {
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
                href = `https://wa.me/${company.phone.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage()}`;
              } else if (link.type === 'email') {
                href = `mailto:${company.email}?subject=${encodeURIComponent(content.messages.emailSubject)}&body=${encodeURIComponent(generateContactMessage())}`;
              } else if (link.type === 'instagram') {
                href = company.instagramUrl;
              }
              
              return (
                <a
                  key={index}
                  href={href}
                  target={link.type === 'whatsapp' || link.type === 'instagram' ? '_blank' : undefined}
                  rel={link.type === 'whatsapp' || link.type === 'instagram' ? 'noopener noreferrer' : undefined}
                  className={styles.contactLink}
                  title={link.type === 'instagram' ? generateContactMessage() : undefined}
                >
                  <LinkIcon size={16} />
                  <span>
                    {link.type === 'phone' ? company.phone : 
                     link.type === 'email' ? company.email :
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
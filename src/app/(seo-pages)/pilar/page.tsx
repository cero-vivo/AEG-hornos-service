import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Service de Hornos Cerámicos en Pilar | Reparación y Mantenimiento",
  description: "Servicio técnico especializado en reparación de hornos cerámicos en Pilar, Buenos Aires. Atención en Pilar centro, Manuel Alberti, Del Viso, Presidente Derqui. Técnicos certificados.",
  keywords: [
    "reparación hornos cerámica Pilar",
    "service hornos Pilar",
    "técnico hornos Manuel Alberti",
    "reparación hornos Del Viso",
    "service hornos Presidente Derqui",
    "mantenimiento hornos Pilar",
    "arreglo hornos cerámica Zona Norte",
    "service técnico hornos Pilar"
  ]
};

const pilarNeighborhoods = [
  "Pilar Centro", "Manuel Alberti", "Del Viso", "Presidente Derqui", 
  "Trujui", "Zelaya", "Fátima", "San Isidro Labrador", "La Lonja", 
  "Los Cardales", "Zapiola", "Villa Rosa", "Manzanares", "Tortuguitas"
];

const services = [
  "Reparación de hornos cerámicos",
  "Mantenimiento preventivo",
  "Diagnóstico técnico completo",
  "Instalación profesional",
  "Cambio de repuestos originales",
  "Calibración de temperatura",
  "Revisión de aislamiento térmico"
];

export default function PilarPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Service de Hornos Cerámicos en Pilar
          </h1>
          <p className={styles.description}>
            Servicio técnico especializado en reparación y mantenimiento de hornos 
            cerámicos en Pilar y todas sus localidades. Técnicos certificados con 
            cobertura completa en el partido.
          </p>
        </div>

        <div className={styles.highlightSection}>
          <div className={styles.highlightCard}>
            <h2 className={styles.highlightTitle}>🎯 Cobertura Total en Pilar</h2>
            <p className={styles.highlightText}>
              Atendemos todas las zonas de Pilar con técnicos locales que conocen 
              la zona y pueden llegar rápidamente a tu domicilio.
            </p>
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Servicios Ofrecidos</h3>
            <ul className={styles.serviceList}>
              {services.map((service, index) => (
                <li key={index} className={styles.serviceItem}>
                  <span className={styles.serviceIcon}>✓</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Zonas de Atención</h3>
            <div className={styles.locationsGrid}>
              {pilarNeighborhoods.map((neighborhood) => (
                <div key={neighborhood} className={styles.locationItem}>
                  <span className={styles.locationCheck}>📍</span>
                  <span>{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.grid3}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚗</div>
            <h4 className={styles.featureTitle}>Service a Domicilio</h4>
            <p className={styles.featureText}>
              Nos desplazamos sin cargo a tu domicilio en cualquier zona de Pilar
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h4 className={styles.featureTitle}>Atención Rápida</h4>
            <p className={styles.featureText}>
              Turnos disponibles dentro de las 24-48 horas en Pilar
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛡️</div>
            <h4 className={styles.featureTitle}>Garantía Escrita</h4>
            <p className={styles.featureText}>
              Todos nuestros trabajos incluyen garantía de 6 meses
            </p>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>¿Por qué elegirnos en Pilar?</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h4>Expertos en la Zona</h4>
              <p>Conocemos las particularidades de cada barrio de Pilar y los modelos más comunes de hornos en la zona.</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Repuestos Originales</h4>
              <p>Contamos con stock de repuestos originales para hornos cerámicos de todas las marcas.</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Precios Transparentes</h4>
              <p>Presupuesto sin compromiso con desglose detallado antes de iniciar cualquier trabajo.</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Técnicos Certificados</h4>
              <p>Equipo de técnicos matriculados y con años de experiencia en reparación de hornos.</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaContainer}>
          <a 
            href="/" 
            className={styles.ctaButton}
          >
            Solicitar Service en Pilar
          </a>
          <p className={styles.ctaSubtext}>
            Atención inmediata en Pilar y zonas aledañas
          </p>
        </div>
      </div>
    </div>
  );
}
import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Service de Hornos Cerámicos en Palermo | CABA | Reparación Profesional",
  description: "Servicio técnico especializado en reparación de hornos cerámicos en Palermo, CABA. Atención en Palermo Soho, Palermo Hollywood, Palermo Chico, Las Cañitas. Técnicos certificados con service urgente.",
  keywords: [
    "reparación hornos cerámica Palermo",
    "service hornos Palermo",
    "técnico hornos Palermo Soho",
    "reparación hornos Palermo Hollywood",
    "service hornos Las Cañitas",
    "mantenimiento hornos Palermo Chico",
    "arreglo hornos cerámica CABA",
    "service urgente hornos Buenos Aires"
  ]
};

const palermoNeighborhoods = [
  "Palermo Soho", "Palermo Hollywood", "Palermo Chico", "Palermo Viejo",
  "Las Cañitas", "Palermo Botánico", "Palermo Park", "Bajo Palermo",
  "Alto Palermo", "Villa Freud", "Palermo Norte", "Palermo Sur"
];

const nearbyAreas = [
  "Belgrano", "Recoleta", "Villa Crespo", "Almagro", "Barrio Norte", 
  "Tribunales", "Retiro", "Microcentro"
];

const services = [
  "Reparación urgente de hornos cerámicos",
  "Mantenimiento preventivo programado",
  "Diagnóstico técnico express",
  "Instalación profesional en departamentos",
  "Cambio de repuestos originales",
  "Calibración de temperatura",
  "Revisión de seguridad eléctrica",
  "Limpieza profunda de hornos"
];

export default function PalermoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Service de Hornos Cerámicos en Palermo
          </h1>
          <p className={styles.description}>
            Servicio técnico especializado en reparación y mantenimiento de hornos 
            cerámicos en Palermo, CABA. Atención express en todos los barrios de Palermo 
            con técnicos certificados.
          </p>
        </div>

        <div className={styles.highlightSection}>
          <div className={styles.highlightCard}>
            <h2 className={styles.highlightTitle}>🚀 Service Express en Palermo</h2>
            <p className={styles.highlightText}>
              Atención urgente en 2-4 horas en Palermo y barrios aledaños. 
              Servicio especializado para departamentos y casas.
            </p>
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Servicios Express</h3>
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
            <h3 className={styles.cardTitle}>Barrios de Palermo</h3>
            <div className={styles.locationsGrid}>
              {palermoNeighborhoods.map((neighborhood) => (
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
            <div className={styles.featureIcon}>⚡</div>
            <h4 className={styles.featureTitle}>Service Urgente</h4>
            <p className={styles.featureText}>
              Atención en 2-4 horas en Palermo para casos urgentes
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏢</div>
            <h4 className={styles.featureTitle}>Especialistas Deptos</h4>
            <p className={styles.featureText}>
              Experiencia en reparación de hornos en departamentos
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💳</div>
            <h4 className={styles.featureTitle}>Pago Flexible</h4>
            <p className={styles.featureText}>
              Efectivo, tarjeta o transferencia - como prefieras
            </p>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Servicio Especializado en Palermo</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h4>Conocimiento Local</h4>
              <p>Conocemos las características específicas de los edificios y casas en Palermo, optimizando el servicio.</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Horarios Flexibles</h4>
              <p>Atendemos de lunes a domingo, incluyendo feriados, con horarios que se adaptan a tu rutina.</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Seguridad Garantizada</h4>
              <p>Técnicos identificados y con seguro para trabajar en cualquier tipo de propiedad.</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Asesoramiento Personalizado</h4>
              <p>Te ayudamos a elegir el mejor horno para tu espacio y necesidades específicas.</p>
            </div>
          </div>
        </div>

        <div className={styles.coverageSection}>
          <h2 className={styles.sectionTitle}>También Atendemos</h2>
          <div className={styles.coverageGrid}>
            {nearbyAreas.map((area) => (
              <div key={area} className={styles.coverageItem}>
                <span className={styles.coverageCheck}>✓</span>
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctaContainer}>
          <a 
            href="/" 
            className={styles.ctaButton}
          >
            Solicitar Service Urgente en Palermo
          </a>
          <p className={styles.ctaSubtext}>
            Atención express en Palermo y barrios de CABA
          </p>
        </div>
      </div>
    </div>
  );
}
import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Service de Hornos Cerámicos en Zona Norte | Pilar, San Isidro, Tigre",
  description: "Servicio técnico de hornos cerámicos en Zona Norte: Pilar, San Isidro, Vicente López, Tigre, Escobar, San Fernando. Técnicos certificados con atención rápida.",
  keywords: [
    "reparación hornos cerámica Zona Norte",
    "service hornos cerámica Pilar",
    "técnico hornos San Isidro",
    "reparación hornos Vicente López",
    "service hornos Tigre",
    "mantenimiento hornos Escobar",
    "arreglo hornos San Fernando"
  ]
};

const zonaNorteLocations = [
  "Pilar", "San Isidro", "Vicente López", "Tigre", "Escobar", 
  "San Fernando", "Martínez", "Olivos", "Florida", "Munro", 
  "Carapachay", "Villa Adelina", "General Pacheco", "Benavídez"
];

export default function ZonaNortePage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Service de Hornos Cerámicos en Zona Norte
          </h1>
          <p className={styles.description}>
            Servicio técnico especializado en reparación y mantenimiento de hornos 
            cerámicos en toda la Zona Norte del Gran Buenos Aires. Cobertura completa 
            con técnicos locales en cada localidad.
          </p>
        </div>

        <div className={styles.grid3}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Pilar</h3>
            <p className={styles.cardText}>
              Service técnico en Pilar centro, Manuel Alberti, Del Viso, 
              Presidente Derqui y zonas aledañas.
            </p>
            <div className={styles.cardBadge}>📍 Atención en el día</div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>San Isidro</h3>
            <p className={styles.cardText}>
              Técnicos especializados en San Isidro, Martínez, Beccar y 
              alrededores con atención rápida.
            </p>
            <div className={styles.cardBadge}>📍 Service urgente</div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Vicente López</h3>
            <p className={styles.cardText}>
              Cobertura en Olivos, Florida, Munro, Carapachay y 
              toda la municipalidad.
            </p>
            <div className={styles.cardBadge}>📍 Presupuesto gratis</div>
          </div>
        </div>

        <div className={styles.cardLarge}>
          <h2 className={styles.cardTitleLarge}>
            Localidades que atendemos en Zona Norte
          </h2>
          <div className={styles.locationsGrid}>
            {zonaNorteLocations.map((location) => (
              <div key={location} className={styles.locationItem}>
                <span className={styles.locationCheck}>✓</span>
                <span>{location}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.highlightBlue}>
            <h2 className={styles.highlightTitle}>
              Servicios disponibles
            </h2>
            <ul className={styles.serviceList}>
              <li>🔧 Reparación de hornos cerámicos</li>
              <li>🛠️ Mantenimiento preventivo</li>
              <li>📋 Diagnóstico técnico</li>
              <li>⚡ Instalación profesional</li>
              <li>🔄 Cambio de repuestos originales</li>
            </ul>
          </div>

          <div className={styles.highlightGreen}>
            <h2 className={styles.highlightTitle}>
              Beneficios Zona Norte
            </h2>
            <ul className={styles.serviceList}>
              <li>🚗 Service a domicilio sin cargo</li>
              <li>⏰ Atención en 24-48 horas</li>
              <li>💰 Presupuesto transparente</li>
              <li>🛡️ Garantía de 6 meses</li>
              <li>👨‍🔧 Técnicos matriculados</li>
            </ul>
          </div>
        </div>

        <div className={styles.ctaContainer}>
          <a 
            href="/" 
            className={styles.ctaButton}
          >
            Solicitar service en Zona Norte
          </a>
        </div>
      </div>
    </div>
  );
}
import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Reparación de Hornos Cerámicos | Service Técnico Especializado",
  description: "Servicio técnico especializado en reparación de hornos cerámicos. Técnicos certificados, atención en CABA, Zona Norte y AMBA. Presupuesto gratis. Garantía 6 meses.",
  keywords: [
    "reparación hornos cerámicos",
    "service hornos cerámica",
    "técnico hornos eléctricos",
    "arreglo hornos AEG",
    "mantenimiento hornos cerámicos",
    "horno cerámico no calienta",
    "reparación hornos CABA",
    "service técnico hornos"
  ]
};

const commonProblems = [
  {
    problem: "Horno no calienta",
    solution: "Revisión de resistencias, termostato y cableado",
    time: "1-2 horas"
  },
  {
    problem: "Calentamiento irregular",
    solution: "Ajuste de termostato y revisión de sensores",
    time: "45-90 minutos"
  },
  {
    problem: "Puerta no cierra bien",
    solution: "Ajuste de bisagras y sellado de junta",
    time: "30-60 minutos"
  },
  {
    problem: "Ventilador no funciona",
    solution: "Revisión de motor y conexiones eléctricas",
    time: "1 hora"
  }
];

const brands = ["AEG", "Whirlpool", "Electrolux", "Samsung", "LG", "Philco", "Domec", "Siam"];
const coverageAreas = ["CABA", "Zona Norte", "AMBA", "Pilar", "San Isidro", "Vicente López", "Tigre", "Belgrano", "Palermo"];

export default function ReparacionHornosCeramicaPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Reparación de Hornos Cerámicos
          </h1>
          <p className={styles.heroDescription}>
            Servicio técnico especializado en reparación y mantenimiento de hornos 
            cerámicos de todas las marcas. Técnicos certificados con más de 15 años 
            de experiencia. Atención inmediata en CABA, Zona Norte y AMBA.
          </p>
          <div className={styles.heroFeatures}>
            <span className={styles.feature}>✓ Presupuesto sin cargo</span>
            <span className={styles.feature}>✓ Garantía 6 meses</span>
            <span className={styles.feature}>✓ Service a domicilio</span>
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Problemas Comunes</h2>
            <div className={styles.problemsList}>
              {commonProblems.map((item, index) => (
                <div key={index} className={styles.problemItem}>
                  <div className={styles.problemHeader}>
                    <span className={styles.problemName}>{item.problem}</span>
                    <span className={styles.timeBadge}>{item.time}</span>
                  </div>
                  <p className={styles.problemSolution}>{item.solution}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Marcas que Atendemos</h2>
            <div className={styles.brandsGrid}>
              {brands.map((brand) => (
                <div key={brand} className={styles.brandItem}>
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.cardLarge}>
          <h2 className={styles.cardTitleLarge}>Nuestro Proceso de Reparación</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Contacto</h3>
              <p className={styles.stepText}>Llamanos o completá el formulario online</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Diagnóstico</h3>
              <p className={styles.stepText}>Evaluación gratuita del problema</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Presupuesto</h3>
              <p className={styles.stepText}>Cotización transparente sin compromiso</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h3 className={styles.stepTitle}>Reparación</h3>
              <p className={styles.stepText}>Service profesional con garantía</p>
            </div>
          </div>
        </div>

        <div className={styles.cardLarge}>
          <h2 className={styles.cardTitleLarge}>Zonas de Cobertura</h2>
          <p className={styles.coverageText}>
            Atendemos en toda el área metropolitana de Buenos Aires:
          </p>
          <div className={styles.coverageGrid}>
            {coverageAreas.map((area) => (
              <div key={area} className={styles.coverageItem}>
                <span className={styles.coverageCheck}>📍</span>
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>¿Necesitás reparar tu horno cerámico?</h2>
            <p className={styles.ctaText}>
              Contactanos hoy mismo para un diagnóstico gratuito y presupuesto 
              sin compromiso. Atención inmediata en tu zona.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/" className={styles.ctaPrimary}>
                Solicitar Service
              </a>
              <a href="tel:+541140001234" className={styles.ctaSecondary}>
                Llamar Ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
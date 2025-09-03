import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Service de Hornos Cerámicos en CABA | Reparación y Mantenimiento",
  description: "Especialistas en reparación de hornos cerámicos en CABA. Servicio técnico profesional en Palermo, Belgrano, Recoleta, Núñez, Caballito y todas las zonas de Capital Federal. Técnicos certificados.",
  keywords: [
    "reparación hornos cerámica CABA",
    "service hornos cerámica Capital Federal",
    "técnico hornos Palermo",
    "service hornos Belgrano",
    "reparación hornos Recoleta",
    "mantenimiento hornos Núñez",
    "arreglo hornos Caballito",
    "service técnico hornos CABA"
  ]
};

const locations = [
  "Palermo", "Belgrano", "Recoleta", "Núñez", "Caballito", "Flores", 
  "Villa Urquiza", "Villa Devoto", "Villa del Parque", "Almagro", 
  "Balvanera", "San Cristóbal", "Boedo", "Parque Patricios", 
  "Barracas", "Liniers", "Mataderos", "Parque Chacabuco"
];

export default function CABALocationPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Service de Hornos Cerámicos en CABA
          </h1>
          <p className={styles.description}>
            Servicio técnico especializado en reparación, mantenimiento e instalación 
            de hornos cerámicos en todas las zonas de Capital Federal. Técnicos certificados 
            con más de 15 años de experiencia.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              Servicios en CABA
            </h2>
            <ul className={styles.serviceList}>
              <li>✓ Diagnóstico gratuito</li>
              <li>✓ Reparación de hornos cerámicos</li>
              <li>✓ Mantenimiento preventivo</li>
              <li>✓ Instalación profesional</li>
              <li>✓ Repuestos originales</li>
              <li>✓ Garantía escrita</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              Zonas de cobertura en CABA
            </h2>
            <div className={styles.locationsGrid}>
              {locations.map((location) => (
                <div key={location} className={styles.locationItem}>
                  • {location}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.highlightSection}>
          <h2 className={styles.highlightTitle}>
            ¿Por qué elegirnos en CABA?
          </h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <h3>Rápido servicio</h3>
              <p>Atención en el día en Capital Federal</p>
            </div>
            <div className={styles.benefitItem}>
              <h3>Precios transparentes</h3>
              <p>Presupuesto sin cargo antes de reparar</p>
            </div>
            <div className={styles.benefitItem}>
              <h3>Garantía total</h3>
              <p>6 meses de garantía en todas las reparaciones</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaContainer}>
          <a 
            href="/" 
            className={styles.ctaButton}
          >
            Solicitar service en CABA
          </a>
        </div>
      </div>
    </div>
  );
}
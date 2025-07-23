import Image from "next/image";
import styles from "./landing.module.css";
import ServiceCard from "../components/ServiceCard";
import ContactForm from "../components/ContactForm";

export default function Home() {
  const services = [
    {
      icon: "🔍",
      title: "Diagnóstico a domicilio",
      description:
        "Te visitamos, revisamos el horno y te damos el informe con recomendaciones. Ideal si el horno no enciende, baja temperatura o hace cortes.",
      duration: "1h",
      location: "Sólo en CABA y AMBA",
      price: "Desde $XX.XXX",
      ctaText: "Solicitar diagnóstico",
    },
    {
      icon: "🧽",
      title: "Mantenimiento preventivo",
      description:
        "Limpieza interna, control de resistencias, sensores y calibración. Evitá que el horno se dañe o te deje a mitad de cocción.",
      duration: "Recomendado cada 6 meses",
      location: "Vamos a domicilio",
      price: "Desde $XX.XXX",
      ctaText: "Programar mantenimiento",
    },
    {
      icon: "⚙️",
      title: "Reparación completa",
      description:
        "¿Tu horno dejó de funcionar? Lo reparamos en el lugar (o retiramos si hace falta). Incluye diagnóstico, repuestos y prueba final.",
      location: "Servicio técnico especializado en cerámica",
      price: "Consultar según modelo y falla",
      ctaText: "Solicitar reparación",
    },
    {
      icon: "📞",
      title: "Videollamada técnica",
      description:
        "¿Vivís fuera de Buenos Aires? Te ayudamos a distancia con diagnóstico, consejos y guía paso a paso.",
      duration: "30 minutos",
      price: "$X.XXX",
      ctaText: "Agendar videollamada",
    },
  ];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.logo}>AEG</div>
            
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>🔥</span>
              <span>+5 años en el rubro</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Tu horno de cerámica
              <span className={styles.highlight}> siempre perfecto</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Mantenimiento profesional, reparaciones especializadas y diagnósticos precisos. 
              <strong> Garantía escrita</strong> en todos nuestros trabajos.
            </p>
            
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Hornos reparados</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>24h</span>
                <span className={styles.statLabel}>Respuesta máxima</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Garantizado</span>
              </div>
            </div>
            
            <div className={styles.heroActions}>
              <a href="#contacto" className={styles.ctaPrimary}>
                <span>Solicitar diagnóstico</span>
                <span className={styles.ctaIcon}>→</span>
              </a>
              <a href="#servicios" className={styles.ctaSecondary}>
                Ver planes
              </a>
            </div>
            
            <div className={styles.heroFooter}>
              <div className={styles.trust}>
                <span className={styles.trustIcon}>🛡️</span>
                <span>Repuestos originales • Técnicos certificados • Zona CABA y AMBA</span>
              </div>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.imageContainer}>
              <Image
                src="/hero-horno.jpg"
                alt="Técnico profesional reparando horno de cerámica"
                width={500}
                height={600}
                className={styles.heroImage}
              />
              <div className={styles.floatingCard}>
                <div className={styles.cardIcon}>✓</div>
                <div className={styles.cardText}>
                  <strong>Diagnóstico gratuito</strong>
                  <span>En tu domicilio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className={styles.services}>
        <h2>Planes y servicios</h2>
        <div className={styles.cards}>
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>

      <section className={styles.about}>
        <h2>¿Por qué elegir AEG?</h2>
        <p>Trabajamos exclusivamente con hornos de cerámica y utilizamos repuestos originales.</p>
        <p>Garantía escrita en todos nuestros trabajos y atención personalizada.</p>
      </section>

      <section id="contacto" className={styles.contact}>
        <h2>Contacto</h2>
        <ContactForm />
      </section>
    </>
  );
}

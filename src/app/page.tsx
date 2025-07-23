"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./landing.module.css";
import ServiceCard from "../components/ServiceCard";
import ContactForm from "../components/ContactForm";
import { Flame, Shield, Check, ShoppingCart } from "lucide-react";

export default function Home() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (serviceTitle: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceTitle)
        ? prev.filter(s => s !== serviceTitle)
        : [...prev, serviceTitle]
    );
  };

  const services = [
    {
      icon: "Search",
      title: "Diagnóstico Profesional",
      description:
        "Análisis técnico completo en tu domicilio. Identificamos fallas, medimos temperaturas y evaluamos resistencias con equipos especializados.",
      duration: "1h",
      location: "Sólo en CABA y AMBA",
      price: "Desde $25.000",
      ctaText: "Solicitar análisis",
    },
    {
      icon: "Sparkles",
      title: "Mantenimiento Premium",
      description:
        "Limpieza profunda, calibración de sensores, inspección de resistencias y ajuste de termostatos. Prolonga la vida útil de tu horno.",
      duration: "Recomendado cada 6 meses",
      location: "Vamos a domicilio",
      price: "Desde $35.000",
      ctaText: "Programar mantenimiento",
    },
    {
      icon: "Wrench",
      title: "Reparación Integral",
      description:
        "Reparación total con repuestos originales. Incluye diagnóstico, mano de obra, repuestos y garantía escrita de 6 meses.",
      location: "Servicio técnico especializado en cerámica",
      price: "Consultar según falla",
      ctaText: "Solicitar reparación",
    },
    {
      icon: "Video",
      title: "Asesoría Virtual",
      description:
        "Soporte técnico remoto para clientes del interior. Diagnóstico visual, guías paso a paso y resolución de problemas básicos.",
      duration: "30 minutos",
      price: "$8.000",
      ctaText: "Agendar videollamada",
    },
    {
      icon: "Settings",
      title: "Instalación Completa",
      description:
        "Instalación profesional de hornos nuevos o reubicación. Incluye conexión eléctrica, nivelación, calibración inicial y capacitación de uso.",
      duration: "2-3 horas",
      location: "CABA y AMBA",
      price: "Desde $40.000",
      ctaText: "Solicitar instalación",
    },
  ];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.logo}>AEG</div>
            
            <div className={styles.badge}>
              <Flame className={styles.badgeIcon} size={16} />
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
                <Shield className={styles.trustIcon} size={16} />
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
                <div className={styles.cardIcon}>
                  <Check size={20} />
                </div>
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
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Nuestros Servicios</span>
          <h2>Elegí el plan perfecto para tu horno</h2>
          <p className={styles.sectionSubtitle}>
            Desde diagnósticos rápidos hasta reparaciones completas. 
            <strong> Seleccioná uno o más servicios</strong> y te contactamos en 24hs.
          </p>
        </div>
        <div className={styles.cards}>
          {services.map((s) => (
            <ServiceCard 
              key={s.title} 
              {...s} 
              isSelected={selectedServices.includes(s.title)}
              onToggle={() => toggleService(s.title)}
            />
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
        <ContactForm selectedServices={selectedServices} />
      </section>

      {/* Botón flotante de servicios seleccionados */}
      {selectedServices.length > 0 && (
        <div className={styles.floatingCart}>
          <button 
            className={styles.cartButton}
            onClick={() => {
              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ShoppingCart size={20} />
            <span>Contratar {selectedServices.length} servicio{selectedServices.length > 1 ? 's' : ''}</span>
          </button>
        </div>
      )}
    </>
  );
}

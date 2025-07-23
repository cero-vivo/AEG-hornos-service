"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./landing.module.css";
import ServiceCard from "../components/ServiceCard";
import ContactForm from "../components/ContactForm";
import { Flame, Shield, Check, ShoppingCart, Award, Wrench, FileCheck, Star, Users, Clock, Calendar, MessageSquare, Phone, Zap, Edit, Target, Lightbulb, AlertCircle } from "lucide-react";

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
                src="/hornos/horno1.jpg"
                alt="Horno de cerámica profesional - Reparación AEG"
                width={500}
                height={600}
                className={styles.heroImage}
              />
              <div className={styles.floatingCard}>
                <div className={styles.cardIcon}>
                  <Check size={20} />
                </div>
                <div className={styles.cardText}>
                  <strong>Reparación garantizada</strong>
                  <span>Hornos como nuevos</span>
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
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <div className={styles.aboutBadge}>
              <Star className={styles.aboutBadgeIcon} size={16} />
              <span>Especialistas Certificados</span>
            </div>
            <h2>La diferencia AEG en cada reparación</h2>
            <p className={styles.aboutLead}>
              No somos técnicos genéricos. Somos <strong>especialistas exclusivos en hornos de cerámica</strong> 
              con más de 5 años perfeccionando nuestro oficio.
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <Award size={20} />
                </div>
                <div className={styles.featureContent}>
                  <strong>Experiencia comprobada</strong>
                  <span>+500 hornos reparados con éxito</span>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <Wrench size={20} />
                </div>
                <div className={styles.featureContent}>
                  <strong>Repuestos originales</strong>
                  <span>Trabajamos solo con piezas certificadas</span>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <FileCheck size={20} />
                </div>
                <div className={styles.featureContent}>
                  <strong>Garantía extendida</strong>
                  <span>6 meses por escrito en cada servicio</span>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <Clock size={20} />
                </div>
                <div className={styles.featureContent}>
                  <strong>Respuesta rápida</strong>
                  <span>Te contactamos en menos de 24hs</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.resultsGallery}>
            <h3>Resultados de nuestro trabajo</h3>
            <p className={styles.gallerySubtext}>
              Cada pieza perfecta es testimonio de un horno reparado con excelencia
            </p>
            <div className={styles.galleryGrid}>
              <Image
                src="/hornos/piezas1.jpg"
                alt="Piezas cerámicas cocidas perfectamente"
                width={200}
                height={150}
                className={styles.galleryImage}
              />
              <Image
                src="/hornos/piezas0.jpg"
                alt="Cerámica terminada con acabado profesional"
                width={200}
                height={150}
                className={styles.galleryImage}
              />
              <Image
                src="/hornos/piezas2.jpg"
                alt="Trabajos en cerámica realizados con hornos reparados"
                width={200}
                height={150}
                className={styles.galleryImage}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contactOptions}>
        <div className={styles.contactHeader}>
          <h2>¿Cómo prefieres que te contactemos?</h2>
          <p>Elegí la opción que más te convenga. Todos los caminos llevan a la misma excelencia en el servicio.</p>
        </div>
        
        <div className={styles.optionsGrid}>
          <div className={`${styles.option} ${styles.priority}`}>
            <div className={styles.priorityBadge}>
              <Zap size={12} />
              <span>MÁS RÁPIDO</span>
            </div>
            <div className={styles.optionIcon}>
              <Phone size={32} />
            </div>
            <h3>Contacto inmediato</h3>
            <p>¿Necesitás una respuesta ya? Hablemos por WhatsApp o llamanos directamente.</p>
            <ul className={styles.optionFeatures}>
              <li><MessageSquare size={14} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent)' }} /> WhatsApp directo</li>
              <li><Phone size={14} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent)' }} /> Llamada inmediata</li>
              <li><AlertCircle size={14} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent)' }} /> Ideal para urgencias</li>
            </ul>
            <div className={styles.quickActions}>
              <a 
                href="https://wa.me/5491123456789?text=Hola! Tengo un problema con mi horno de cerámica y necesito ayuda." 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.whatsappButton}
              >
                <MessageSquare size={16} /> WhatsApp
              </a>
              <a 
                href="tel:+5491123456789" 
                className={styles.callButton}
              >
                <Phone size={16} /> Llamar
              </a>
            </div>
          </div>

          <div className={styles.option}>
            <div className={styles.optionIcon}>
              <MessageSquare size={32} />
            </div>
            <h3>Contanos tu problema</h3>
            <p>Describí en detalle qué le pasa a tu horno. Preparamos una solución personalizada.</p>
            <ul className={styles.optionFeatures}>
              <li><Edit size={14} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent)' }} /> Formulario detallado</li>
              <li><Target size={14} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent)' }} /> Diagnóstico preciso</li>
              <li><Lightbulb size={14} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent)' }} /> Solución personalizada</li>
            </ul>
            <button 
              className={styles.optionButton}
              onClick={() => {
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <MessageSquare size={18} />
              <span>Completar formulario</span>
            </button>
          </div>

          <div className={styles.option}>
            <div className={styles.optionIcon}>
              <Calendar size={32} />
            </div>
            <h3>Agendar llamada</h3>
            <p>Elegí día y horario que te convenga. Te llamamos puntual para coordinar la visita.</p>
            <ul className={styles.optionFeatures}>
              <li><Calendar size={14} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent)' }} /> Calendario en tiempo real</li>
              <li><Clock size={14} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent)' }} /> Horarios disponibles</li>
              <li><Phone size={14} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent)' }} /> Llamada confirmada</li>
            </ul>
            <button className={styles.optionButton}>
              <Calendar size={18} />
              <span>Agendar ahora</span>
            </button>
          </div>
        </div>
      </section>

      <section id="contacto" className={styles.contact}>
        <h2>Formulario de contacto</h2>
        <p className={styles.contactSubtext}>Contanos en detalle qué problema tiene tu horno</p>
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

import Image from "next/image";
import { Flame, Shield, Check } from "lucide-react";
import styles from "../../app/landing.module.css";
import content from "../../data/content.json";

export default function Hero() {
  const { hero, company } = content;
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - company.foundedYear;

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <div className={styles.logo}>{company.name}</div>
          
          <div className={styles.badge}>
            <Flame className={styles.badgeIcon} size={16} />
            <span>{hero.badge.text.replace('{years}', yearsInBusiness.toString())}</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            {hero.title}
            <span className={styles.highlight}>{hero.titleHighlight}</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            {hero.subtitle.split('**').map((text, index) => 
              index % 2 === 1 ? <strong key={index}>{text}</strong> : text
            )}
          </p>
          
          <div className={styles.stats}>
            {hero.stats.map((stat, index) => (
              <div key={index} className={styles.stat}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
          
          <div className={styles.heroActions}>
            <a href={hero.primaryCta.link} className={styles.ctaPrimary}>
              <span>{hero.primaryCta.text}</span>
              <span className={styles.ctaIcon}>→</span>
            </a>
            <a href={hero.secondaryCta.link} className={styles.ctaSecondary}>
              {hero.secondaryCta.text}
            </a>
          </div>
          
          <div className={styles.heroFooter}>
            <div className={styles.trust}>
              <Shield className={styles.trustIcon} size={16} />
              <span>{hero.trustBadge}</span>
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
                <strong>{hero.floatingCard.title}</strong>
                <span>{hero.floatingCard.subtitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
import Image from "next/image";
import { Star, Award, Wrench, FileCheck, Clock } from "lucide-react";
import styles from "../../app/landing.module.css";
import content from "../../data/content.json";

const iconMap = {
  Star,
  Award,
  Wrench,
  FileCheck,
  Clock,
};

type IconType = keyof typeof iconMap;

export default function About() {
  const { about } = content;

  return (
    <section className={styles.about}>
      <div className={styles.aboutContent}>
        <div className={styles.aboutText}>
          <div className={styles.aboutBadge}>
            {(() => {
              const BadgeIcon = iconMap[about.badge.icon as IconType];
              return <BadgeIcon className={styles.aboutBadgeIcon} size={16} />;
            })()}
            <span>{about.badge.text}</span>
          </div>
          <h2>{about.title}</h2>
          <p className={styles.aboutLead}>
            {about.subtitle.split('**').map((text, index) => 
              index % 2 === 1 ? <strong key={index}>{text}</strong> : text
            )}
          </p>
          <div className={styles.features}>
            {about.features.map((feature, index) => {
              const FeatureIcon = iconMap[feature.icon as IconType];
              return (
                <div key={index} className={styles.feature}>
                  <div className={styles.featureIcon}>
                    <FeatureIcon size={20} />
                  </div>
                  <div className={styles.featureContent}>
                    <strong>{feature.title}</strong>
                    <span>{feature.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.resultsGallery}>
          <h3>{about.gallery.title}</h3>
          <p className={styles.gallerySubtext}>
            {about.gallery.subtitle}
          </p>
          <div className={styles.galleryGrid}>
            {about.gallery.images.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                width={200}
                height={150}
                className={styles.galleryImage}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
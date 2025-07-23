import styles from "../../app/landing.module.css";
import content from "../../data/content.json";

export default function FloatingNav() {
  const { navigation, company } = content;

  const scrollToSection = (target: string) => {
    document.getElementById(target.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.floatingNav}>
      <div className={styles.navLogo}>{company.name}</div>
      <nav className={styles.navMenu}>
        {navigation.items.map((item, index) => (
          <button 
            key={index}
            onClick={() => scrollToSection(item.target)}
            className={styles.navItem}
            title={item.text}
          >
            <span>{item.text}</span>
          </button>
        ))}
      </nav>
    </div>
  );
} 
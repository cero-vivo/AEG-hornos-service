import ContactForm from "../ui/ContactForm";
import styles from "../../app/landing.module.css";
import content from "../../data/content.json";

interface ContactProps {
  selectedServices: string[];
}

export default function Contact({ selectedServices }: ContactProps) {
  const { contact } = content;

  return (
    <section id="formulario" className={styles.contact}>
      <h2>{contact.title}</h2>
      <p className={styles.contactSubtext}>{contact.subtitle}</p>
      <ContactForm selectedServices={selectedServices} />
    </section>
  );
} 
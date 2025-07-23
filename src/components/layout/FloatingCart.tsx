import { ShoppingCart } from "lucide-react";
import styles from "../../app/landing.module.css";
import content from "../../data/content.json";

interface FloatingCartProps {
  selectedServices: string[];
}

export default function FloatingCart({ selectedServices }: FloatingCartProps) {
  const { messages } = content;
  
  if (selectedServices.length === 0) return null;

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCartText = () => {
    if (selectedServices.length === 1) {
      return messages.floatingCart.single;
    } else {
      return messages.floatingCart.multiple.replace('{count}', selectedServices.length.toString());
    }
  };

  return (
    <div className={styles.floatingCart}>
      <button 
        className={styles.cartButton}
        onClick={scrollToContact}
      >
        <ShoppingCart size={20} />
        <span>{getCartText()}</span>
      </button>
    </div>
  );
} 
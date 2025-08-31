'use client';

import { X, HelpCircle } from 'lucide-react';
import styles from './modals.module.css';

interface InfoModalProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

export default function InfoModal({ title, content, onClose }: InfoModalProps) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalForm}>
          <div className={styles.infoContent}>
            {content}
          </div>
          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
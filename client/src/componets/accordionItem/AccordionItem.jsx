import React, { useState } from 'react';
import styles from './AccordionItem.module.css';

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles['accordion-item']}>
      <div className={styles['accordion-title']} onClick={() => setIsOpen(!isOpen)}>
        {title}
        <div className={`${styles.arrow} ${isOpen ? styles.open : ''}`}></div>
      </div>
      {isOpen && <div className={styles['accordion-content']}>{content}</div>}
    </div>
  );
};

export default AccordionItem;

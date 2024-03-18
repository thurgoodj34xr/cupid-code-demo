import React from 'react';
import styles from './Accordion.module.css';
import AccordionItem from '../accordionItem/AccordionItem';

const Accordion = ({ items }) => {
  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default Accordion;



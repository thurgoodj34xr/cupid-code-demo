import React, { useState } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ items }) => {
  const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="py-2 bg-white rounded p-4 shadow">
        <h2>
          <button
            className="flex items-center justify-between w-full text-left text-lg py-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls={`accordion-text-${title}`}
          >
            <span>{title}</span>
            <svg
              className={`fill-black-500 shrink-0 ml-8 transform origin-center transition duration-200 ease-out ${
                isOpen ? 'rotate-180' : ''
              }`}
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="7" width="16" height="2" rx="1" />
              <rect
                y="7"
                width="16"
                height="2"
                rx="1"
                className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </svg>
          </button>
        </h2>
        <div
          id={`accordion-text-${title}`}
          role="region"
          aria-labelledby={`accordion-title-${title}`}
          className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-y-auto max-h-80">
            <p className="pb-3">{content}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-2">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <AccordionItem title={item.title} content={item.content} />
          {index !== items.length - 1 && <div className="py-2" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Accordion;

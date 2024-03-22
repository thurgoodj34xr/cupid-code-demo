import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const AccordionItem = ({ title, content}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <h2>
          <button
            className="flex items-center bg-white text-black justify-between w-full text-left text-xl h-full p-6"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls={`accordion-text-${title}`}
          >
            <span>{title}</span>
            <svg
  className="fill-current shrink-0 ml-2 h-5 w-5 transform origin-center transition duration-200 ease-out"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect y="7" width="16" height="2" rx="1" />
  {!isOpen && (
    <rect
      x="7"
      width="2"
      height="16"
      rx="1"
    />
  )}
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
        </React.Fragment>
      ))}
    </div>
  );
};

export default Accordion;


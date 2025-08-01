import React, { useState, useEffect } from 'react';

const BackToTopArrow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > window.innerHeight * 1.2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-80">
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          className="
            p-3
            rounded-full
            bg-roxoClaro
            text-white
            shadow-lg
            hover:bg-roxoEscuro
            cursor-pointer
            focus:outline-none
            focus:ring-2
            focus:ring-white
            focus:ring-opacity-50
            transform
            duration-300
            ease-in-out
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 md:h-15 md:w-15"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BackToTopArrow;
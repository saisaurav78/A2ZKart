import { useState, useEffect } from 'react';

const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return isVisible ? (
    <button title='back to top'
      aria-label='back to top button'
      onClick={scrollToTop}
      className='fixed bottom-5 right-5 p-3 bg-customPalette-blue text-white rounded-full shadow-lg'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='size-6'
      >
        <path
          fillRule='evenodd'
          d='M11.47 10.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 12.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z'
          clipRule='evenodd'
        />
        <path
          fillRule='evenodd'
          d='M11.47 4.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z'
          clipRule='evenodd'
        />
      </svg>
    </button>
  ) : null;
};

export default ToTopButton;

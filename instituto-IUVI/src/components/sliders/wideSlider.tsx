import React, { useRef } from 'react';
import type { ReactNode } from 'react';
import { useSliderNavigation } from './hookLoops';
import Arrow from '../../assets/images/icons/arrow'; 

interface WideSliderProps {
  children: ReactNode;
  showArrows?: boolean;
  allowDrag?: boolean;
}

const WideSlider: React.FC<WideSliderProps> = ({ 
  children, 
  showArrows = true,
  allowDrag = true,
}) => {
  const childrenArray = React.Children.toArray(children);
  const { currentIndex, isTransitioning, navigate, slidesToRender } = useSliderNavigation(childrenArray.length);

  const dragRef = useRef({ isDown: false, startX: 0 });

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!allowDrag || isTransitioning) return;
    e.preventDefault();
    dragRef.current = { isDown: true, startX: e.pageX };
    e.currentTarget.style.cursor = 'grabbing';
  };
  
  const handleDragEnd = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!allowDrag || !dragRef.current.isDown) return;
    e.currentTarget.style.cursor = 'grab';

    const endX = e.pageX;
    const dx = endX - dragRef.current.startX;
    
    // Se o arrasto for maior que 50px, navega.
    if (Math.abs(dx) > 50) {
        navigate(dx > 0 ? 'prev' : 'next');
    }
    
    dragRef.current = { isDown: false, startX: 0 };
  };
  
  const handleDragLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      // Cancela o arrasto se o mouse sair da área do slider.
      if (dragRef.current.isDown) {
        handleDragEnd(e);
      }
  };

  return (
    <div className="relative w-full">
      <div 
        className="overflow-hidden"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragLeave}
        style={{ cursor: allowDrag ? 'grab' : 'default' }}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? "transform 500ms ease-in-out" : "none",
            userSelect: 'none',
          }}
        >
          {slidesToRender(childrenArray).map((child, idx) => (
            <div key={`slide-${idx}`} className="w-full flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            title="Anterior"
            onClick={() => navigate('prev')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 hover:scale-110 transition cursor-pointer"
          >
            <Arrow direction="left" className="w-8 h-8 md:w-15 md:h-15 xl:w-25 xl:h-25"/>
          </button>
          <button
            title="Próximo"
            onClick={() => navigate('next')}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 z-20 hover:scale-110 transition cursor-pointer"
          >
            <Arrow direction="right" className="w-8 h-8 md:w-15 md:h-15 xl:w-25 xl:h-25"/>
          </button>
        </>
      )}
    </div>
  );
};

export default WideSlider;
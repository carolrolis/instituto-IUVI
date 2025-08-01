import React, { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useSliderNavigation } from "./hookLoops";

interface LoopSliderProps {
  children: ReactNode;
  allowDrag?: boolean;
  showArrows?: boolean;
}

const LoopSlider: React.FC<LoopSliderProps> = ({
  children,
  allowDrag = true,
}) => {
  const childrenArray = React.Children.toArray(children);
  const { currentIndex, isTransitioning, navigate, slidesToRender } =
    useSliderNavigation(childrenArray.length);

  const slideRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    isDragging: false,
  });

  // Efeito para calcular a largura de um slide + gap.
  useEffect(() => {
    const calculateWidth = () => {
      if (slideRef.current) {
        const parentStyle = window.getComputedStyle(
          slideRef.current.parentElement!
        );
        const gap = parseFloat(parentStyle.gap) || 0;
        setSlideWidth(slideRef.current.offsetWidth + gap);
      }
    };
    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [childrenArray.length]);

  // Centralizar o item ativo.
  const transform =
    slideWidth > 0
      ? `translateX(calc(50% - ${slideWidth / 2}px - ${
          currentIndex * slideWidth
        }px))`
      : "translateX(0px)";

  // Função unificada para início do drag (mouse e touch)
  const startDrag = (clientX: number, clientY: number) => {
    if (!allowDrag || isTransitioning) return false;

    dragRef.current = {
      isDown: true,
      startX: clientX,
      startY: clientY,
      isDragging: false,
    };

    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
    return true;
  };

  // Função unificada para fim do drag
  const endDrag = (clientX: number) => {
    if (!allowDrag || !dragRef.current.isDown) return;

    if (containerRef.current) {
      containerRef.current.style.cursor = allowDrag ? "grab" : "default";
    }

    if (dragRef.current.isDragging) {
      const dx = clientX - dragRef.current.startX;

      // Arrastar por mais de 50px para acionar a navegação
      if (Math.abs(dx) > 50) {
        navigate(dx > 0 ? "prev" : "next");
      }
    }

    dragRef.current = {
      isDown: false,
      startX: 0,
      startY: 0,
      isDragging: false,
    };
  };

  // Função para detectar se é um movimento de drag horizontal
  const updateDragState = (clientX: number, clientY: number) => {
    if (!dragRef.current.isDown) return;

    const dx = Math.abs(clientX - dragRef.current.startX);
    const dy = Math.abs(clientY - dragRef.current.startY);

    // Se moveu mais horizontalmente que verticalmente e passou de um threshold
    if (dx > 10 && dx > dy) {
      dragRef.current.isDragging = true;
    }
  };

  // Event handlers para mouse
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (startDrag(e.pageX, e.pageY)) {
      e.preventDefault();
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    endDrag(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateDragState(e.pageX, e.pageY);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragRef.current.isDown) {
      endDrag(e.pageX);
    }
  };

  // Event handlers para touch - ADICIONADO O touchStart que estava faltando
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (startDrag(touch.clientX, touch.clientY)) {
      // Não previne o comportamento padrão aqui para permitir scroll vertical
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDown) return;

    const touch = e.touches[0];
    updateDragState(touch.clientX, touch.clientY);

    // Só previne o comportamento padrão se estivermos fazendo drag horizontal
    if (dragRef.current.isDragging) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDown) return;

    const touch = e.changedTouches[0];
    endDrag(touch.clientX);
  };

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="overflow-hidden touch-pan-y"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart} // ESTE EVENTO ESTAVA FALTANDO!
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: allowDrag ? "grab" : "default" }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            gap: "1.5rem",
            transform,
            transition: isTransitioning
              ? "transform 500ms ease-in-out"
              : "none",
            userSelect: "none",
          }}
        >
          {slidesToRender(childrenArray).map((child, idx) => (
            <div
              key={`slide-${idx}`}
              ref={idx === 1 ? slideRef : null}
              className="flex-shrink-0 w-[70%] md:w-[80%]"
            >
              {child}
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default LoopSlider;
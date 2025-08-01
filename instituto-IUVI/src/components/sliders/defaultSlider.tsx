import React, { useRef, useState, useEffect, useCallback } from "react";
import type { ReactNode, MouseEvent } from "react";
import Arrow from "../../assets/images/icons/arrow"; // Verifique se o caminho do ícone está correto

interface DefaultSliderProps {
  children: ReactNode;
  allowDrag?: boolean;
  showArrows?: boolean;
  oneAtATime?: boolean;
  // Ambas as props de largura agora coexistem
  slidesPerView?: number; 
  slideClassName?: string;
}

const DefaultSlider: React.FC<DefaultSliderProps> = ({
  children,
  allowDrag = true,
  showArrows = true,
  oneAtATime = false,
  slidesPerView, // Prop antiga mantida
  slideClassName, // Prop nova
}) => {
  const childArray = React.Children.toArray(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    isDragging: false,
    dragged: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // ... (Toda a lógica de setas e de drag and drop permanece exatamente a mesma) ...
  const updateArrowVisibility = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const tolerance = 2;
    setShowLeftArrow(scrollLeft > 5);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - tolerance);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateArrowVisibility, { passive: true });
    const observer = new ResizeObserver(updateArrowVisibility);
    observer.observe(container);
    updateArrowVisibility();
    return () => {
      container.removeEventListener("scroll", updateArrowVisibility);
      observer.disconnect();
    };
  }, [childArray, updateArrowVisibility]);

  const handleArrowScroll = (direction: "next" | "prev") => {
    if (!containerRef.current) return;
    const scrollAmount = oneAtATime
      ? containerRef.current.clientWidth
      : containerRef.current.clientWidth * 0.8;
    containerRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!allowDrag || !containerRef.current) return;
    e.preventDefault();
    dragRef.current = { isDragging: true, dragged: false, startX: e.pageX, startScrollLeft: containerRef.current.scrollLeft };
    containerRef.current.style.cursor = "grabbing";
    containerRef.current.style.scrollSnapType = "none";
  };

  const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
    const { isDragging, startX, startScrollLeft } = dragRef.current;
    if (!isDragging || !containerRef.current || !allowDrag) return;
    e.preventDefault();
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 5) dragRef.current.dragged = true;
    containerRef.current.scrollLeft = startScrollLeft - dx;
  }, [allowDrag]);

  const handleMouseUp = useCallback(() => {
    if (!allowDrag || !containerRef.current) return;
    dragRef.current.isDragging = false;
    containerRef.current.style.cursor = "grab";
    containerRef.current.style.scrollSnapType = "x mandatory";
    setTimeout(() => { dragRef.current.dragged = false; }, 100);
  }, [allowDrag]);

  useEffect(() => {
    const handleMove = (e: globalThis.MouseEvent) => {
      if (dragRef.current.isDragging) handleMouseMove(e);
    };
    const handleUp = () => {
      if (dragRef.current.isDragging) handleMouseUp();
    };
    if (allowDrag) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
    }
    return () => {
      if (allowDrag) {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
      }
    };
  }, [allowDrag, handleMouseMove, handleMouseUp]);
  // ... (Fim da lógica de setas e drag) ...


  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        // ALTERADO: Lógica de 'gap' ajustada para funcionar bem em todos os cenários
        className={`flex overflow-x-auto no-scrollbar snap-x snap-mandatory select-none ${
          oneAtATime || slidesPerView ? "gap-0 md:gap-4" : "gap-5"
        }`}
        style={{ cursor: allowDrag ? "grab" : "default" }}
        onMouseDown={handleMouseDown}
      >
        {React.Children.map(childArray, (child, index) => {
          // =================================================================
          // LÓGICA DE ESTILO HÍBRIDA PARA GARANTIR RETROCOMPATIBILIDADE
          // =================================================================
          const slideStyle: React.CSSProperties = { flexShrink: 0 };
          let slideWidthClass = "";

          if (oneAtATime) {
            // 1. Prioridade máxima: oneAtATime
            slideWidthClass = "w-full";
          } else if (slideClassName) {
            // 2. Prioridade: A nova prop 'slideClassName' para sliders responsivos
            slideWidthClass = slideClassName;
          } else if (slidesPerView) {
            // 3. Prioridade: A prop antiga 'slidesPerView'
            slideStyle.width = `calc(100% / ${slidesPerView})`;
            // Adiciona um padding para compensar o gap removido e criar espaçamento
            slideWidthClass = "pr-4"; 
          } else {
            // 4. Fallback: O comportamento original para sliders antigos
            slideWidthClass = "w-70 lg:w-80 xl:w-90";
          }

          return (
            <div
              key={index}
              style={slideStyle}
              className={`snap-center ${slideWidthClass}`}
              onClickCapture={(e) => {
                if (dragRef.current.dragged) {
                  e.stopPropagation();
                  e.preventDefault();
                }
              }}
            >
              {child}
            </div>
          );
        })}
      </div>

      {/* ... (Botões de seta permanecem iguais) ... */}
      {showArrows && showLeftArrow && (
        <button
          title="Anterior"
          onClick={() => handleArrowScroll("prev")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 hover:scale-110 transition cursor-pointer"
        >
          <Arrow direction="left" className="w-8 h-8 md:w-15 md:h-15" />
        </button>
      )}
      {showArrows && showRightArrow && (
        <button
          title="Próximo"
          onClick={() => handleArrowScroll("next")}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 z-20 hover:scale-110 transition cursor-pointer"
        >
          <Arrow direction="right" className="w-8 h-8 md:w-15 md:h-15" />
        </button>
      )}
    </div>
  );
};

export default DefaultSlider;
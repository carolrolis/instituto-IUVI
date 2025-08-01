import React, { useRef, useState, useEffect, useCallback } from "react";
import type { ReactNode, MouseEvent } from "react";
import Arrow from "../../assets/images/icons/arrow"; // Verifique se o caminho do ícone está correto

interface DefaultSliderProps {
  children: ReactNode;
  allowDrag?: boolean;
  showArrows?: boolean;
  oneAtATime?: boolean;
  // ADICIONADO: Nova prop para receber as classes de estilização do slide
  slideClassName?: string;
}

const DefaultSlider: React.FC<DefaultSliderProps> = ({
  children,
  allowDrag = true,
  showArrows = true,
  oneAtATime = false,
  slideClassName, // <-- Nova prop
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

  // Lógica para mostrar ou esconder as setas de navegação (com tolerância)
  const updateArrowVisibility = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const tolerance = 2;
    setShowLeftArrow(scrollLeft > 5);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - tolerance);
  }, []);

  // Adiciona listeners de scroll e redimensionamento no container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateArrowVisibility, {
      passive: true,
    });
    const observer = new ResizeObserver(updateArrowVisibility);
    observer.observe(container);
    updateArrowVisibility();
    return () => {
      container.removeEventListener("scroll", updateArrowVisibility);
      observer.disconnect();
    };
  }, [childArray, updateArrowVisibility]);

  // Função para o clique dos botões de seta
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

  // Funções para a lógica de arrastar (drag)
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!allowDrag || !containerRef.current) return;
    e.preventDefault();
    dragRef.current = {
      isDragging: true,
      dragged: false,
      startX: e.pageX,
      startScrollLeft: containerRef.current.scrollLeft,
    };
    containerRef.current.style.cursor = "grabbing";
    containerRef.current.style.scrollSnapType = "none";
  };

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      const { isDragging, startX, startScrollLeft } = dragRef.current;
      if (!isDragging || !containerRef.current || !allowDrag) return;

      e.preventDefault();
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 5) dragRef.current.dragged = true;
      containerRef.current.scrollLeft = startScrollLeft - dx;
    },
    [allowDrag]
  );

  const handleMouseUp = useCallback(() => {
    if (!allowDrag || !containerRef.current) return;
    dragRef.current.isDragging = false;
    containerRef.current.style.cursor = "grab";
    containerRef.current.style.scrollSnapType = "x mandatory";
    setTimeout(() => {
      dragRef.current.dragged = false;
    }, 100);
  }, [allowDrag]);

  // Adiciona listeners globais para o drag
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

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        // ALTERADO: A classe 'gap' agora é fixa e consistente, pois o espaçamento é controlado pelo padding dentro do slide se necessário.
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory select-none"
        style={{ cursor: allowDrag ? "grab" : "default" }}
        onMouseDown={handleMouseDown}
      >
        {React.Children.map(childArray, (child, index) => {
          // LÓGICA DE LARGURA TOTALMENTE REFEITA
          const slideStyle: React.CSSProperties = { flexShrink: 0 };
          
          // Se 'oneAtATime' for verdadeiro, ele tem prioridade e ocupa a tela toda.
          // Caso contrário, usa as classes que você passou via 'slideClassName'.
          // Se nenhuma classe for passada, ele usa um padrão de fallback.
          const finalClassName = oneAtATime
            ? "w-full"
            : slideClassName || "w-4/5 sm:w-1/2 md:w-1/3"; // Um padrão razoável

          return (
            <div
              key={index}
              style={slideStyle}
              // ALTERADO: Aplica as classes dinâmicas e responsivas
              className={`snap-center ${finalClassName}`}
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
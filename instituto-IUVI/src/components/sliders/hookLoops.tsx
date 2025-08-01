import { useState, useRef, useCallback, useEffect } from 'react';

export const useSliderNavigation = (totalItems: number) => {
  // O índice começa em 1 porque o slide 0 é o clone do último.
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);

  // Limpa o timeout se o componente for desmontado durante uma transição.
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Função de navegação que pode ser chamada por botões ou drag
  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const newIndex = currentIndex + (direction === 'next' ? 1 : -1);
    setCurrentIndex(newIndex);

    transitionTimeoutRef.current = setTimeout(() => {
      let finalIndex = newIndex;
      let needsReset = false;

      // Se chegamos no clone da direita, pulamos para o primeiro item real
      if (newIndex >= totalItems + 1) {
        finalIndex = 1;
        needsReset = true;
      // Se chegamos no clone da esquerda, pulamos para o último item real
      } else if (newIndex <= 0) {
        finalIndex = totalItems;
        needsReset = true;
      }

      if (needsReset) {
        setIsTransitioning(false); // Desliga a transição para o pulo ser instantâneo
        requestAnimationFrame(() => setCurrentIndex(finalIndex)); // Atualiza o índice
      } else {
        setIsTransitioning(false); // Apenas finaliza o estado de transição
      }
    }, 500);
  }, [currentIndex, isTransitioning, totalItems]);

  // Função auxiliar que cria o array com os clones
  const slidesToRender = (childrenArray: React.ReactNode[]) => {
      if (totalItems === 0) return [];
      const lastItem = childrenArray[totalItems - 1];
      const firstItem = childrenArray[0];
      return [lastItem, ...childrenArray, firstItem];
  };

  return {
    currentIndex,
    isTransitioning,
    navigate,
    slidesToRender
  };
};
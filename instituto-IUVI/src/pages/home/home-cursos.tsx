import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

import cursosCard1 from "../../assets/images/home/home-cursos/presencial.svg";
import cursosCard2 from "../../assets/images/home/home-cursos/ead.svg";
import cursosCard3 from "../../assets/images/home/home-cursos/pos.svg";
import Botao from "../../components/button";
import ScrollReveal from "../../components/scrollReveal";

interface CursoData {
  img: string;
  alt: string;
  title: string;
  subtitle?: string;
}

interface AnimationProps {
  y: MotionValue<string>;
  opacity: MotionValue<number>;
}

const cursosData: CursoData[] = [
  {
    img: cursosCard1,
    alt: "Bloco SMD",
    title: "Graduação Presencial",
    subtitle: "Sistemas e Mídias Digitais",
  },
  {
    img: cursosCard2,
    alt: "Planeta",
    title: "Graduação à Distância",
    subtitle: "Física, Matemática, Química, Letras, Pedagogia, Administração",
  },
  {
    img: cursosCard3,
    alt: "Chapéu de formatura",
    title: "Pós-Graduação",
    subtitle: "Tecnologia Educacional",
  },
];

const CursoCard = ({ img, alt, title, subtitle }: CursoData) => (
  <div className="p-5 flex flex-col items-center gap-2 rounded-2xl hover:scale-110 transform duration-300">
    <img src={img} alt={alt} className="mb-5 w-15 md:w-30 xl:w-fit" />
    <h1 className="text-lg md:text-2xl lg:text-3xl text-center font-semibold">
      {title}
    </h1>
    {subtitle && (
      <h2 className="hidden md:block text-md md:text-lg lg:text-xl text-center font-light">
        {subtitle}
      </h2>
    )}
  </div>
);

const HomeCursos = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [spacings, setSpacings] = useState<number[]>([130, 260, 390]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setSpacings([50, 100, 150]);
      else if (width < 1280) setSpacings([100, 200, 300]);
      else setSpacings([130, 260, 390]);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const inputRange = [0.1, 0.5];

  const animations: AnimationProps[] = spacings.map((spacing, i) => ({
    y: useTransform(scrollYProgress, inputRange, ["0px", `${spacing}px`]),
    opacity: useTransform(scrollYProgress, inputRange, [
      0,
      i === 0 ? 0.4 : 0.2,
    ]),
  }));

  return (
    <section
      ref={sectionRef}
      id="home-cursos"
      className="relative bg-preto py-25 xl:py-40 mt-10 w-full overflow-hidden"
    >
      <div className="luzRoxa z-30 w-100 h-100 md:w-140 md:h-140 2xl:w-180 2xl:h-180 absolute top-0 left-[-15rem]" />
      <ScrollReveal direction="left" delay={0.2}>
        <div
          id="home-cursos-conteudo"
          className="max-w-99/100 lg:max-w-95/100 px-5 md:px-20 xl:px-30 flex justify-between m-auto"
        >
          <div
            id="home-cursos-h1"
            className="flex flex-col max-w-fit justify-between"
          >
            <div className="relative w-fit font-grifter text-roxoClaro text-4xl md:text-7xl xl:text-[130px] text-left">
              {animations.map((anim, i) => (
                <motion.h1
                  key={i}
                  style={{ y: anim.y, opacity: anim.opacity }}
                  className="absolute top-0 left-0 w-fit"
                >
                  CURSOS
                </motion.h1>
              ))}
              <h1 className="relative z-10 w-fit">CURSOS</h1>
            </div>

            <Botao h1="Nossas formações" to="/cursos" />
          </div>

          <div
            id="home-cursos-cards"
            className="w-fit flex flex-col items-center gap-10 lg:gap-20 max-w-3/10"
          >
            {cursosData.map((curso, i) => (
              <CursoCard key={i} {...curso} />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default HomeCursos;

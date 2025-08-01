import { motion } from "framer-motion";
import parceiroImagem1 from "../../assets/images/home/home-parceiros/bematech.png";
import parceiroImagem2 from "../../assets/images/home/home-parceiros/capes.png";
import parceiroImagem3 from "../../assets/images/home/home-parceiros/dell.png";
import parceiroImagem4 from "../../assets/images/home/home-parceiros/ericsson.png";
import parceiroImagem5 from "../../assets/images/home/home-parceiros/fiocruz ceara.png";
import parceiroImagem6 from "../../assets/images/home/home-parceiros/hp.png";
import parceiroImagem7 from "../../assets/images/home/home-parceiros/huawey.png";
import parceiroImagem8 from "../../assets/images/home/home-parceiros/ifce.png";
import parceiroImagem9 from "../../assets/images/home/home-parceiros/lg.png";
import parceiroImagem10 from "../../assets/images/home/home-parceiros/ministerio da educação.png";
import parceiroImagem11 from "../../assets/images/home/home-parceiros/politecnico de leiria.png";
import parceiroImagem12 from "../../assets/images/home/home-parceiros/samsung.png";
import parceiroImagem13 from "../../assets/images/home/home-parceiros/unesco.png";
import parceiroImagem14 from "../../assets/images/home/home-parceiros/universidade nova de lisboa.png";
import ScrollReveal from "../../components/scrollReveal";

const HomeParceiros = () => {
  const images1 = [
    parceiroImagem1,
    parceiroImagem2,
    parceiroImagem3,
    parceiroImagem4,
    parceiroImagem5,
    parceiroImagem6,
    parceiroImagem7,
  ];

  const images2 = [
    parceiroImagem8,
    parceiroImagem9,
    parceiroImagem10,
    parceiroImagem11,
    parceiroImagem12,
    parceiroImagem13,
    parceiroImagem14,
  ];

  const triplicatedImages1 = [...images1, ...images1, ...images1];
  const triplicatedImages2 = [...images2, ...images2, ...images2];

  return (
    <section
      id="home-parceiros"
      className="relative bg-preto pb-25 xl:pb-40 mt-[-2px] w-full overflow-hidden"
    >
      <ScrollReveal direction="left" delay={0.2}>
        <div
          id="home-parceiros-h1"
          className="max-w-99/100 lg:max-w-95/100 px-5 md:px-20 xl:px-30 m-auto"
        >
          <h1 className="font-grifter text-roxoClaro text-4xl md:text-7xl xl:text-[130px] text-left">
            PARCEIROS
          </h1>
        </div>
      </ScrollReveal>
      
      <ScrollReveal direction="right" delay={0.2}>
        <div
          id="home-parceiros-sliders"
          className="flex flex-col justify-center gap-10 overflow-hidden mt-15"
        >
          <div
            id="home-parceiros-slider1"
            className="w-full h-20 overflow-hidden"
          >
            <motion.div
              className="flex gap-12 w-max h-full"
              animate={{ x: [0, "-33.333%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              }}
              style={{ willChange: "transform" }}
            >
              {triplicatedImages1.map((imgSrc, index) => (
                <div
                  key={`img1-${index}`}
                  className="w-fit h-full overflow-hidden flex-shrink-0"
                >
                  <img
                    src={imgSrc}
                    alt={`Parceiro ${(index % images1.length) + 1}`}
                    className="w-full h-full object-contain filter transition-all duration-300"
                    draggable={false}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div
            id="home-parceiros-slider2"
            className="w-full h-20 overflow-hidden"
          >
            <motion.div
              className="flex gap-12 w-max h-full"
              animate={{ x: ["-33.333%", 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              }}
              style={{ willChange: "transform" }}
            >
              {triplicatedImages2.map((imgSrc, index) => (
                <div
                  key={`img2-${index}`}
                  className="w-fit h-full overflow-hidden flex-shrink-0"
                >
                  <img
                    src={imgSrc}
                    alt={`Parceiro ${(index % images2.length) + 1}`}
                    className="w-full h-full object-contain filter transition-all duration-300"
                    draggable={false}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default HomeParceiros;
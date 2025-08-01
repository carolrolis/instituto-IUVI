import { useState, useEffect } from "react";
import homeGif from "../../assets/images/home/home-gif.gif";
import GradientHover from "../../components/gradientHover";

const HomeInicio = () => {
  const [blackTransform, setBlackTransform] = useState("translateY(0px)");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      const blackOffset = Math.min(scrollY, viewportHeight);
      setBlackTransform(`translateY(${-blackOffset}px)`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section id="home-inicio" className="fixed top-0 left-0 w-full h-full">
      <div
        id="home-black"
        className="absolute top-0 left-0 w-full h-full bg-preto z-20"
        style={{ transform: blackTransform }}
      />
      <div id="home-gif" className="w-full h-full z-10">
        <img
          src={homeGif}
          alt="Gif Instituto UFC Virtual"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="luzRoxa z-30 w-100 h-100 md:w-140 md:h-140 2xl:w-180 2xl:h-180 absolute top-0 left-[-15rem]" />
      <div className="luzRoxa z-30 w-100 h-100 md:w-140 md:h-140 2xl:w-180 2xl:h-180 absolute top-80 right-[-15rem]" />

      <span
        id="home-inicio-h1"
        className="absolute bottom-25 left-0 w-fit z-40 px-5 md:px-20 lg:px-25 xl:px-40"
      >
        <h1 className="font-grifter text-5xl sm:text-8xl xl:text-[150px] xl:leading-40">
          <GradientHover>
            Há 15 anos
            <br />
            inovando
          </GradientHover>
        </h1>
      </span>
    </section>
  );
};

export default HomeInicio;

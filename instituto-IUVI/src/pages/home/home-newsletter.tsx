import coverNewsletter from "../../assets/images/home/home-newsletter/newsletter-cover.png";
import Botao from "../../components/button";
import ScrollReveal from "../../components/scrollReveal";

const HomeNewsletter = () => {
  return (
    <section
      id="home-newsletter"
      className="relative bg-preto pb-25 xl:pb-40 mt-[-2px] w-full overflow-hidden"
    >
      <ScrollReveal direction="bottom" delay={0.2}>
        <div
          id="home-newsletter-conteudo"
          className="w-screen py-25 bg-cover bg-center bg-no-repeat flex flex-col items-center gap-10"
          style={{
            backgroundImage: `url(${coverNewsletter})`,
          }}
        >
          <div
            id="home-newsletter-texto"
            className="flex flex-col items-center gap-10"
          >
            <span id="home-newsletter-h1" className="max-w-fit">
              <h1 className="w-fit font-normal text-4xl md:text-6xl">
                Newsletter
              </h1>
            </span>
            <p className="text-xl md:text-3xl max-w-8/10 md:max-w-7/10 text-center">
              Fique por dentro de todos os acontecimentos e programações que
              acontecem no IUVI
            </p>
          </div>

          <form
            id="newsletter-form"
            className="flex flex-col md:flex-row w-full justify-center items-center gap-8"
          >
            <input
              type="email"
              name="email"
              placeholder="exemplo@exemplo.com"
              required
              className="text-md md:text-xl lg:text-3xl w-8/10 md:w-6/10 2xl:w-4/10 px-8 py-4 md:py-7 bg-white text-preto rounded-xl md:rounded-3xl focus:outline-none focus:ring-4 focus:ring-roxoEscuro transform duration-300"
            />
            <Botao
              h1="Participar"
              href="#"
              arrow={false}
              className="w-8/10 md:w-fit"
            />
          </form>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default HomeNewsletter;

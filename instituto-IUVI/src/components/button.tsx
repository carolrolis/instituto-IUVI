import type React from "react";
import { Link } from "react-router-dom";
import ButtonArrow from "../assets/images/icons/button-arrow";

interface BotaoProps {
  type?: "button" | "submit" | "reset";
  h1: string;
  to?: string;
  href?: string;
  className?: string;
  cinza?: boolean;
  arrow?: boolean;
  onClick?: () => void;
}

const Botao: React.FC<BotaoProps> = ({
  type = "button",
  h1,
  to,
  href,
  className = "",
  cinza = false,
  arrow = true,
  onClick,
}) => {
  const classes = cinza
    ? "text-xl lg:text-3xl flex items-center justify-center gap-2 m-auto w-full py-4 rounded-2xl bg-cinzaEscuro hover:bg-[#5e5e5e] cursor-pointer"
    : "transform duration-300 text-sm md:text-lg lg:text-2xl xl:text-3xl 2xl:text-3xl bg-roxoEscuro py-4 md:py-6 lg:py-8 px-3 md:px-9 rounded-2xl md:rounded-3xl flex items-center justify-center gap-0 md:gap-5 font-semibold cursor-pointer hover:bg-roxoClaro";

  const content = cinza ? (
    // Layout do botão cinza: SVG antes do texto
    <>
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.17157 3.17157C3 4.34315 3 6.22876 3 10V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V10C21 6.22876 21 4.34315 19.8284 3.17157C18.6569 2 16.7712 2 13 2H11C7.22876 2 5.34315 2 4.17157 3.17157ZM7.25 8C7.25 7.58579 7.58579 7.25 8 7.25H16C16.4142 7.25 16.75 7.58579 16.75 8C16.75 8.41421 16.4142 8.75 16 8.75H8C7.58579 8.75 7.25 8.41421 7.25 8ZM7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12ZM8 15.25C7.58579 15.25 7.25 15.5858 7.25 16C7.25 16.4142 7.58579 16.75 8 16.75H13C13.4142 16.75 13.75 16.4142 13.75 16C13.75 15.5858 13.4142 15.25 13 15.25H8Z"
          fill="#ffffff"
        ></path>
      </svg>
      <h1 className="font-bold">{h1}</h1>
    </>
  ) : (
    // Layout do botão roxo: texto antes do SVG
    <>
      <h1 className="w-fit">{h1}</h1>
      {arrow && <ButtonArrow />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="max-w-fit">
        <button
          title={h1}
          className={`${classes} ${className}`}
          onClick={onClick}
        >
          {content}
        </button>
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${classes} ${className}`}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      title={h1}
      type={type}
      className={`${classes} ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Botao;

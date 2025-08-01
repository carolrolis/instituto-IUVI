import type React from "react";

interface ButtonArrowProps {
  className?: string;
}

const ButtonArrow: React.FC<ButtonArrowProps> = ({
  className = "h-4 md:h-6 xl:h-8",
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
    >
      <path d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z" />
    </svg>
  );
};

export default ButtonArrow;

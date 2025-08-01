import { useEffect } from "react";
import logo from "../assets/images/logo.svg";

interface FirstLoadingProps {
  onComplete: () => void;
}

const FirstLoading: React.FC<FirstLoadingProps> = ({ onComplete }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      clearInterval(interval);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 w-full h-screen bg-preto flex items-center justify-center">
      <img className="w-40 md:w-60" alt="UFC VIRTUAL 15 Anos" src={logo} />
    </div>
  );
};

export default FirstLoading;

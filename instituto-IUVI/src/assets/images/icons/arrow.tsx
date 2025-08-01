import React from 'react';

interface ArrowProps {
  direction: 'left' | 'right';
  className?: string;
}

const Arrow: React.FC<ArrowProps> = ({
  direction,
  className = 'w-8 h-8 text-white',
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor" 
      transform={direction === 'left' ? 'matrix(-1, 0, 0, 1, 0, 0)' : ''}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="currentColor"
          d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"
        ></path>
      </g>
    </svg>
  );
};

export default Arrow;
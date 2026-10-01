import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const emblemSizes = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-14 w-auto'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official New Edge Emblem Image */}
      <img
        src="./images/logo-emblem.png"
        alt="New Edge 27:17 Ministries Emblem"
        className={`${emblemSizes[size]} object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300`}
      />

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-extrabold tracking-tight text-[#FDFBF7] ${textSizes[size]}`}>
            New Edge <span className="text-[#B66D44]">27:17</span>
          </span>
          <span className="text-[10px] tracking-widest text-[#94A3B8] uppercase font-bold">
            Ministries
          </span>
        </div>
      )}
    </div>
  );
};

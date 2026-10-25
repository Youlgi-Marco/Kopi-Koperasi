import React from 'react';
import logoMark from '../assets/images/koperasi-logo-mark.jpeg';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const KoperasiLogo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-[#20211F]' : 'text-[#F5F1E8]';
  const subColor = isDark ? 'text-[#6B4B3E]' : 'text-[#D8D3C8]';

  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 44 : 32;
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const taglineSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[11px]';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <span
        aria-hidden="true"
        className="shrink-0 rounded-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{
          width: iconSize,
          height: iconSize,
          backgroundImage: `url(${logoMark})`
        }}
      />

      <div className="flex flex-col leading-tight">
        <span
          className={`font-display font-extrabold tracking-tight uppercase ${titleSize} ${textColor}`}
        >
          KOPERASI
        </span>
        {showTagline && (
          <span
            className={`font-sans tracking-wide lowercase ${taglineSize} ${subColor} font-medium`}
          >
            kopi pertemanan dan relasi
          </span>
        )}
      </div>
    </div>
  );
};

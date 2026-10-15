import React from 'react';

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
  const iconStroke = isDark ? '#20211F' : '#F5F1E8';
  const accentColor = '#A8D83E';

  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 44 : 32;
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const taglineSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[11px]';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Hand-crafted Clinking Cups Icon from Moodboard */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Steam waves */}
        <path
          d="M17 6C17 6 15.5 8.5 17 11"
          stroke={iconStroke}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M21 4.5C21 4.5 19.5 7.5 21 10.5"
          stroke={iconStroke}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M31 6C31 6 32.5 8.5 31 11"
          stroke={iconStroke}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Cup Left */}
        <path
          d="M12 14H24L22.5 30C22.5 33 20 34.5 17 34.5C14 34.5 11.5 33 11.5 30L10 14H12Z"
          fill={isDark ? '#F5F1E8' : '#2A2C29'}
          stroke={iconStroke}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Cup Left Handle */}
        <path
          d="M10 18H7C5.5 18 4.5 19.5 5 21.5C5.5 23.5 7 24 8.5 24H10.5"
          stroke={iconStroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Left Cup Face: smile */}
        <circle cx="15" cy="21" r="1.2" fill={iconStroke} />
        <circle cx="19" cy="21" r="1.2" fill={iconStroke} />
        <path
          d="M15.5 24.5C16.5 26 17.5 26 18.5 24.5"
          stroke={iconStroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Cup Right */}
        <path
          d="M26 15H38L36.5 31C36.5 34 34 35.5 31 35.5C28 35.5 25.5 34 25.5 31L24 15H26Z"
          fill={isDark ? '#F5F1E8' : '#2A2C29'}
          stroke={iconStroke}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Cup Right Handle */}
        <path
          d="M38 19H41C42.5 19 43.5 20.5 43 22.5C42.5 24.5 41 25 39.5 25H37.5"
          stroke={iconStroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Right Cup Face: winking/smile */}
        <path
          d="M29 20.5L31 22"
          stroke={iconStroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="35" cy="21" r="1.2" fill={iconStroke} />
        <path
          d="M30.5 25C31.5 26.5 32.5 26.5 33.5 25"
          stroke={iconStroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Clink sparks (Olive Green accent) */}
        <path
          d="M23.5 12L25 9.5"
          stroke={accentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M22 39C24 41 27 41 29 39"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

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

import React from 'react';

export function BcpLogo({
  variant = 'light-bg',
  className = '',
}: {
  variant?: 'light-bg' | 'dark-bg';
  className?: string;
}) {
  const textColor = variant === 'dark-bg' ? '#FFFFFF' : '#002A8D';
  return (
    <div className={`inline-flex items-center select-none ${className}`} aria-label="BCP">
      <svg width="92" height="26" viewBox="0 0 92 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left Orange Swoosh > */}
        <path
          d="M3.5 5.5C5.2 5.5 11.8 10.8 12.6 12.6C13.2 13.9 7.8 19.3 3.2 21.2C2.1 21.6 1.2 20.5 2.0 19.6C4.8 16.8 7.3 14.3 7.5 13.0C7.7 11.7 4.7 8.9 2.4 7.1C1.5 6.4 2.3 5.5 3.5 5.5Z"
          fill="#FF7800"
        />
        {/* BCP Italic Bold Letters */}
        <text
          x="15"
          y="20.5"
          fill={textColor}
          fontFamily="'Flexo', 'Fira Sans', sans-serif"
          fontWeight="700"
          fontStyle="italic"
          fontSize="21"
          letterSpacing="-0.02em"
        >
          BCP
        </text>
        {/* Right Orange Swoosh > */}
        <path
          d="M64.5 5.5C66.2 5.5 72.8 10.8 73.6 12.6C74.2 13.9 68.8 19.3 64.2 21.2C63.1 21.6 62.2 20.5 63.0 19.6C65.8 16.8 68.3 14.3 68.5 13.0C68.7 11.7 65.7 8.9 63.4 7.1C62.5 6.4 63.3 5.5 64.5 5.5Z"
          fill="#FF7800"
        />
      </svg>
    </div>
  );
}

export function BcpAhorroEmblem() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 7C16.5 7 25 12.5 26 17.5C22.5 14 16 11.5 11 11.5C9.5 11.5 9 9 11 7Z"
        fill="#002A8D"
      />
      <path
        d="M26 17.5C26.5 21.8 18.5 28.5 9.5 29.5C7.5 29.7 7 27.5 8.8 26.2C14.5 22.5 18.5 19.5 19 16.2C19.3 14.2 16.2 12 13 10.5C18.5 11.5 25.5 14.2 26 17.5Z"
        fill="#FF7800"
      />
    </svg>
  );
}

export function BcpVisaEmblem() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 11H13.5L18 23.5L22.8 11H28L19.8 28H15.5L9.5 14L7 11Z" fill="#002A8D" />
      <path d="M6 11H12.5L14.5 16.2C13.2 13.5 10.2 11.8 6 11Z" fill="#FF7800" />
    </svg>
  );
}

export function InterbankLogo({
  variant = 'header-green',
  size = 'md',
}: {
  variant?: 'header-green' | 'white-bg';
  size?: 'md' | 'lg';
}) {
  const isHeader = variant === 'header-green';
  const wordColor = isHeader ? '#FFFFFF' : '#05BE50';
  const innerParallelogram = isHeader ? '#05BE50' : '#FFFFFF';
  const scale = size === 'lg' ? 1.22 : 1;

  return (
    <div
      className="inline-flex items-center gap-2 select-none font-interbank"
      style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
      aria-label="Interbank"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 3.5L25 1.5V24.5L2 26.5V3.5Z" fill="#0039A6" rx="2" />
        <path d="M7.5 8.5L20 7V19.5L7.5 21V8.5Z" fill={innerParallelogram} />
      </svg>
      <span
        style={{ color: wordColor }}
        className="font-bold text-[22px] tracking-tight leading-none"
      >
        Interbank
      </span>
    </div>
  );
}

export function PlinBubbleIcon({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Plin"
    >
      <defs>
        <linearGradient id="plinGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00E5C3" />
          <stop offset="55%" stopColor="#00C4E0" />
          <stop offset="100%" stopColor="#1B8AF3" />
        </linearGradient>
      </defs>
      <path
        d="M32 6C17.64 6 6 17.19 6 31C6 37.38 8.48 43.2 12.56 47.62C11.8 50.85 9.88 54.44 9.55 55.02C9.1 55.8 9.68 56.8 10.58 56.72C15.25 56.3 20.12 54.55 23.16 53.3C25.92 54.39 28.89 55 32 55C46.36 55 58 43.81 58 30C58 16.19 46.36 6 32 6Z"
        fill="url(#plinGrad)"
      />
      <text
        x="32"
        y="37"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="'Montserrat', sans-serif"
        fontWeight="800"
        fontSize="20"
        letterSpacing="-0.02em"
      >
        plin
      </text>
      <circle cx="36.3" cy="21.5" r="2.3" fill="#FF3B8B" />
    </svg>
  );
}

export function SipOperationTileIcon() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-1 select-none font-sip">
      {/* sip• */}
      <div className="flex items-start leading-none mb-1">
        <span className="text-[#0099F2] font-extrabold text-[15px] tracking-tighter">sip</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#111C2D] ml-0.5 mt-0.5" />
      </div>
      {/* yape + plin mini logos */}
      <div className="flex items-center gap-1">
        <span className="bg-[#742384] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">
          yape
        </span>
        <span className="bg-[#00C9D8] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">
          plin
        </span>
      </div>
    </div>
  );
}

export function SipCircleLogo({ size = 44 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-[#00A6F9] flex items-center justify-center shrink-0 select-none font-sip"
    >
      <div className="flex items-start leading-none">
        <span className="text-white font-extrabold text-[19px] tracking-tight">sip</span>
        <span className="w-2 h-2 rounded-full bg-[#141B26] ml-0.5 -mt-0.5" />
      </div>
    </div>
  );
}

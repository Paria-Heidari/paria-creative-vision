interface LogoProps {
  className?: string;
  compact?: boolean;
}

export default function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <svg
      viewBox="0 0 264 72"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Paria Creative Vision"
      role="img"
    >
      <defs>
        <linearGradient id="pcv-tech-warm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#252320" />
          <stop offset="55%" stopColor="#3B3631" />
          <stop offset="100%" stopColor="#5A5249" />
        </linearGradient>

        <linearGradient id="pcv-accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D6B188" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D6B188" stopOpacity="0.28" />
        </linearGradient>

        {/* Slight imperfection for handcrafted personality */}
        <filter id="pcv-grain" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="1"
            seed="17"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.42" />
        </filter>
      </defs>

      {/* Geometric-organic monogram: aperture + structured P */}
      <g transform="translate(11, 36) scale(1.6)">
        <path
          d="M 6,-16 L 6,16 M 6,-12 C 14,-16 25,-15 30,-9 C 34,-5 34,1 30,5 C 25,9 14,8 6,4"
          fill="none"
          stroke="url(#pcv-tech-warm)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#pcv-grain)"
        />

        <circle
          cx="18.5"
          cy="-4"
          r="6.5"
          fill="none"
          stroke="#B59B82"
          strokeWidth="1.15"
          opacity="0.82"
        />

        <path
          d="M 14,-7 L 24,-7 M 15,-1 L 23,-1"
          fill="none"
          stroke="#AE9277"
          strokeWidth="0.88"
          strokeLinecap="round"
          opacity="0.64"
        />

        <path
          d="M 35,-2 L 48,-5 L 56,0"
          fill="none"
          stroke="url(#pcv-accent)"
          strokeWidth="1.75"
          strokeLinecap="round"
          opacity="0.92"
        />
        <circle cx="35" cy="-2" r="1.75" fill="#D0AE87" opacity="0.86" />
        <circle cx="48" cy="-5" r="1.5" fill="#D0AE87" opacity="0.86" />
      </g>

      {/* Minimal editorial wordmark */}
      <g transform="translate(118, 0) scale(1.1)">
        <text
          x="0"
          y="36"
          fontFamily="'Syne', sans-serif"
          fontWeight="550"
          fontSize="27"
          letterSpacing="2.05"
          fill="#2A2825"
        >
          PARIA
        </text>

        <path
          d="M 0 41 C 52 40.8 132 41.4 204 41"
          fill="none"
          stroke="url(#pcv-accent)"
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity="0.78"
          filter="url(#pcv-grain)"
        />

        {!compact && (
          <text
            x="0"
            y="56"
            fontFamily="'Inter', sans-serif"
            fontWeight="400"
            fontSize="10"
            letterSpacing="2.9"
            fill="#68615A"
          >
            CREATIVE VISION
          </text>
        )}
      </g>
    </svg>
  );
}

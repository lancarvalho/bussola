import React from 'react';

interface LogoProps {
    size?: 'large' | 'medium' | 'small';
}

const Logo: React.FC<LogoProps> = ({ size = 'large' }) => {
    const dimensions = {
        large: { width: "80", height: "50", viewBox: "0 0 180 110" },
        medium: { width: "40", height: "25", viewBox: "0 0 180 110" },
        small: { width: "32", height: "20", viewBox: "0 0 180 110" },
    };

    const { width, height, viewBox } = dimensions[size];

    return (
        <svg width={width} height={height} viewBox={viewBox}>
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="20%" stopColor="#fb923c" />
                <stop offset="40%" stopColor="#facc15" />
                <stop offset="60%" stopColor="#4ade80" />
                <stop offset="80%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          <path
            d="M10 100 A 80 80 0 0 1 170 100"
            stroke="url(#logoGradient)"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
          />
           <g transform="rotate(25 90 90)">
            <line x1="90" y1="90" x2="90" y2="20" stroke="white" strokeWidth="8" strokeLinecap="round" />
            <circle cx="90" cy="90" r="12" fill="white" />
          </g>
        </svg>
    );
};

export default Logo;
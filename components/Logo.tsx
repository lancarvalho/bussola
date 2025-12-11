import React from 'react';

interface LogoProps {
    size?: 'large' | 'medium' | 'small';
}

const Logo: React.FC<LogoProps> = ({ size = 'large' }) => {
    // Ajustando dimensões para manter a proporção do SVG 1024x1024
    const dimensions = {
        large: { width: "100", height: "100" },
        medium: { width: "50", height: "50" },
        small: { width: "32", height: "32" },
    };

    const { width, height } = dimensions[size];

    return (
        <svg width={width} height={height} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoMsgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Fundo Squircle (opcional no componente inline, mas bom para consistência) */}
          {/* Se quiser o logo "solto" sem o quadrado escuro no header, remova o rect abaixo. 
              Mantendo para identidade visual forte. */}
          <rect x="0" y="0" width="1024" height="1024" rx="240" ry="240" fill="#0f172a" stroke="url(#logoMsgGradient)" strokeWidth="20" />

          {/* Anel */}
          <circle cx="512" cy="512" r="340" stroke="url(#logoMsgGradient)" strokeWidth="60" fill="none" strokeLinecap="round" />

          {/* Marcadores */}
          <path d="M512 132 L512 192 M512 832 L512 892 M132 512 L192 512 M832 512 L892 512" stroke="#334155" strokeWidth="30" strokeLinecap="round" />

          {/* Agulha */}
          <g transform="rotate(45 512 512)">
            <path d="M512 252 L602 512 L512 512 Z" fill="#f8fafc" />
            <path d="M512 252 L422 512 L512 512 Z" fill="#cbd5e1" />
            <path d="M512 772 L602 512 L512 512 Z" fill="#334155" />
            <path d="M512 772 L422 512 L512 512 Z" fill="#1e293b" />
            <circle cx="512" cy="512" r="40" fill="#06b6d4" stroke="#0f172a" strokeWidth="8"/>
          </g>
        </svg>
    );
};

export default Logo;
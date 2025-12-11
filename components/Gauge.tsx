
import React, { useState } from 'react';

interface GaugeProps {
  score: number;
}

const Gauge: React.FC<GaugeProps> = ({ score }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const clampedScore = Math.max(-50, Math.min(50, score));
  // Map score from [-50, 50] to angle [-90, 90] for rotation
  const angle = (clampedScore / 50) * 90;

  // Configuração dos rótulos com posições angulares e cores específicas combinando com os segmentos
  const labels = [
    { value: -50, text: "EXTREMA-ESQUERDA", angle: -90, color: "fill-red-900" },
    { value: -25, text: "ESQUERDA", angle: -45, color: "fill-red-500" },
    { value: 0, text: "CENTRO", angle: 0, color: "fill-slate-500" },
    { value: 25, text: "DIREITA", angle: 45, color: "fill-blue-500" },
    { value: 50, text: "PURO-SANGUE", angle: 90, color: "fill-blue-900" },
  ];

  // Definição dos segmentos de cor conforme especificação detalhada
  const segments = [
    // ESQUERDA (0 a -50)
    // 0 a -5: Amarelo
    { start: -9, end: 0, color: "stroke-yellow-400" }, 
    // -5 a -10: Laranja Claro (approx -9 a -18 graus)
    { start: -18, end: -9, color: "stroke-orange-400" },
    // -10 a -25: Vermelho Médio (approx -18 a -45 graus)
    { start: -45, end: -18, color: "stroke-red-500" },
    // -25 a -50: Vermelho Escuro (-45 a -90 graus)
    { start: -90, end: -45, color: "stroke-red-900" },

    // DIREITA (0 a +50)
    // 0 a +5: Verde Claro
    { start: 0, end: 9, color: "stroke-green-400" },
    // +5 a +10: Ciano (approx 9 a 18 graus)
    { start: 9, end: 18, color: "stroke-cyan-400" },
    // +10 a +25: Azul Médio (approx 18 a 45 graus)
    { start: 18, end: 45, color: "stroke-blue-500" },
    // +25 a +50: Azul Escuro (45 a 90 graus)
    { start: 45, end: 90, color: "stroke-blue-900" },
  ];

  const Arc: React.FC<{ startAngle: number, endAngle: number, color: string }> = ({ startAngle, endAngle, color }) => {
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      };
    };

    const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
      const start = polarToCartesian(x, y, radius, endAngle);
      const end = polarToCartesian(x, y, radius, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      const d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
      return d;
    };
    
    return <path d={describeArc(150, 150, 100, startAngle, endAngle)} strokeWidth="40" fill="none" className={color}/>;
  };

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col items-center">
      {/* ViewBox ajustado para acomodar textos externos sem cortes (0 -20 300 190) */}
      <svg viewBox="0 -20 300 190" className="w-full">
        <defs>
          <clipPath id="cut-off-bottom">
            <rect x="0" y="0" width="300" height="150" />
          </clipPath>
        </defs>

        {/* Arcs Segmentados */}
        <g clipPath="url(#cut-off-bottom)">
            {segments.map((seg, i) => (
                <Arc key={i} startAngle={seg.start} endAngle={seg.end} color={seg.color} />
            ))}
        </g>
        
        {/* Labels */}
        {labels.map((label) => {
          // Ajustes de raio para separar melhor números e texto
          const textRadius = 142; // Aumentado para afastar do arco
          const numberRadius = 75; // Reduzido levemente para centralizar na parte interna
          
          return (
            <g key={label.value}>
              {/* Texto Descritivo (Esquerda, Centro, etc) */}
              <text
                x={150 + Math.cos((label.angle - 90) * Math.PI / 180) * textRadius}
                y={150 + Math.sin((label.angle - 90) * Math.PI / 180) * textRadius}
                textAnchor="middle"
                dominantBaseline="central"
                // Fonte reduzida (text-[8px]) e espaçamento aumentado (tracking-wider) para legibilidade
                className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider ${label.color}`}
                transform={`rotate(${label.angle}, ${150 + Math.cos((label.angle - 90) * Math.PI / 180) * textRadius}, ${150 + Math.sin((label.angle - 90) * Math.PI / 180) * textRadius})`}
              >
                {label.text}
              </text>

              {/* Números (-50, -25, 0...) */}
              <text
                 x={150 + Math.cos((label.angle - 90) * Math.PI / 180) * numberRadius}
                 y={150 + Math.sin((label.angle - 90) * Math.PI / 180) * numberRadius}
                 textAnchor="middle"
                 dominantBaseline="central"
                 className={`text-xs font-bold ${label.color}`}
              >
                {label.value === 0 ? '0' : label.value > 0 ? `+${label.value}` : label.value}
              </text>
            </g>
          );
        })}

        {/* Center Score with Tooltip Trigger */}
        <g 
            onMouseEnter={() => setShowTooltip(true)} 
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
            className="cursor-help"
        >
             <text x="150" y="115" textAnchor="middle" className="text-4xl font-bold fill-slate-800 pointer-events-none">
                {score >= 0 ? '+' : ''}{Math.round(score)}
            </text>
            <circle cx="150" cy="115" r="25" fill="transparent" /> {/* Hit area invisible */}
        </g>
        
        {/* Tooltip rendered via foreignObject to handle HTML/Tailwind styling inside SVG coordinates */}
        <foreignObject x="50" y="125" width="200" height="60" className={`pointer-events-none transition-opacity duration-300 ${showTooltip ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-slate-800 text-slate-200 text-[10px] p-2 rounded shadow-lg text-center border border-slate-600">
                Pontuação cumulativa.<br/>
                <span className="text-red-400">-50 (Extrema-Esq)</span> a <span className="text-blue-400">+50 (Extrema-Dir)</span>
            </div>
        </foreignObject>

        {/* Needle */}
        <g 
            className="transition-transform duration-700 ease-out will-change-transform" 
            style={{ transform: `rotate(${angle}deg)`, transformOrigin: '150px 150px' }}
        >
            <circle cx="150" cy="150" r="8" fill="white" strokeWidth="3" className="stroke-slate-900" />
            <line x1="150" y1="150" x2="150" y2="40" className="stroke-slate-900" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

export default Gauge;


import React from 'react';

interface GaugeProps {
  score: number;
}

const Gauge: React.FC<GaugeProps> = ({ score }) => {
  const clampedScore = Math.max(-50, Math.min(50, score));
  // Map score from [-50, 50] to angle [-90, 90] for rotation
  const angle = (clampedScore / 50) * 90;

  // Configuração dos rótulos com posições angulares específicas
  const labels = [
    { value: -50, text: "EXTREMA-ESQUERDA", angle: -90 },
    { value: -25, text: "ESQUERDA", angle: -45 },
    { value: 0, text: "CENTRO", angle: 0 },
    { value: 25, text: "DIREITA", angle: 45 },
    { value: 50, text: "PURO-SANGUE", angle: 90 },
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
      <svg viewBox="0 0 300 185" className="w-full">
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
          // Ajustes de raio para posicionar texto
          const textRadius = 138; // Um pouco mais afastado para o texto curvo ficar bom
          const numberRadius = 80; // Raio para os números (dentro do arco)
          
          return (
            <g key={label.value}>
              {/* Texto Descritivo (Esquerda, Centro, etc) */}
              <text
                x={150 + Math.cos((label.angle - 90) * Math.PI / 180) * textRadius}
                y={150 + Math.sin((label.angle - 90) * Math.PI / 180) * textRadius}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[9px] font-bold fill-slate-500 uppercase tracking-tighter"
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
                 className="text-xs font-bold fill-slate-700" // Fonte reduzida (text-base -> text-xs)
              >
                {label.value === 0 ? '0' : label.value > 0 ? `+${label.value}` : label.value}
              </text>
            </g>
          );
        })}

        {/* Center Score */}
         <text x="150" y="115" textAnchor="middle" className="text-4xl font-bold fill-slate-800">
            {score >= 0 ? '+' : ''}{Math.round(score)}
        </text>

        {/* Needle */}
        <g className="transition-transform duration-1000 ease-out" style={{ transform: `rotate(${angle}deg)`, transformOrigin: '150px 150px' }}>
            <circle cx="150" cy="150" r="8" fill="white" strokeWidth="3" className="stroke-slate-900" />
            <line x1="150" y1="150" x2="150" y2="40" className="stroke-slate-900" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

export default Gauge;

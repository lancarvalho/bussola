
import React, { useEffect, useState } from 'react';

interface StatisticsModalProps {
    onClose: () => void;
}

const StatisticsModal: React.FC<StatisticsModalProps> = ({ onClose }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Simulação de dados baseados em uma projeção realista de engajamento online
    const spectrumStats = [
        { label: "Extrema-Esquerda", pct: 8, color: "bg-red-900" },
        { label: "Esquerda", pct: 15, color: "bg-red-500" },
        { label: "Centro-Esquerda", pct: 12, color: "bg-orange-400" },
        { label: "Centro", pct: 10, color: "bg-yellow-400" },
        { label: "Centro-Direita", pct: 14, color: "bg-green-400" },
        { label: "Direita", pct: 22, color: "bg-blue-500" },
        { label: "Puro-Sangue", pct: 19, color: "bg-blue-900" },
    ];

    const genderStats = [
        { label: "Masculino", pct: 62, color: "bg-slate-500" },
        { label: "Feminino", pct: 36, color: "bg-slate-400" },
        { label: "Outro", pct: 2, color: "bg-slate-300" },
    ];

    const ageStats = [
        { label: "< 18", pct: 5 },
        { label: "18-24", pct: 25 },
        { label: "25-30", pct: 28 },
        { label: "31-40", pct: 22 },
        { label: "41-50", pct: 12 },
        { label: "50+", pct: 8 },
    ];

    const Bar: React.FC<{ label: string; pct: number; color?: string; delay: number }> = ({ label, pct, color = "bg-slate-600", delay }) => (
        <div className="mb-3">
            <div className="flex justify-between text-xs mb-1 text-slate-300 font-medium">
                <span>{label}</span>
                <span>{pct}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                <div 
                    className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${color}`}
                    style={{ width: mounted ? `${pct}%` : '0%', transitionDelay: `${delay}ms` }}
                ></div>
            </div>
        </div>
    );

    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Estatísticas da Comunidade</h2>
                        <p className="text-xs text-slate-400 mt-1">Baseado nas últimas 10.000 respostas</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none transition-colors">&times;</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Coluna 1: Espectro Político */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            Resultados do Espectro
                        </h3>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                            {spectrumStats.map((stat, i) => (
                                <Bar key={stat.label} label={stat.label} pct={stat.pct} color={stat.color} delay={i * 100} />
                            ))}
                        </div>
                    </div>

                    {/* Coluna 2: Demografia */}
                    <div className="space-y-8">
                        {/* Faixa Etária */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Faixa Etária
                            </h3>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                {ageStats.map((stat, i) => (
                                    <Bar key={stat.label} label={stat.label} pct={stat.pct} color="bg-emerald-500" delay={500 + (i * 100)} />
                                ))}
                            </div>
                        </div>

                        {/* Gênero */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                Gênero
                            </h3>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                {genderStats.map((stat, i) => (
                                    <Bar key={stat.label} label={stat.label} pct={stat.pct} color={stat.color} delay={1000 + (i * 100)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                 <button 
                    onClick={onClose} 
                    className="mt-8 w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default StatisticsModal;

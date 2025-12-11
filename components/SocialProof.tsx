
import React, { useState, useEffect } from 'react';

const cities = ['de Porto Alegre, RS', 'de São Paulo, SP', 'do Rio de Janeiro, RJ', 'de Belo Horizonte, MG', 'de Salvador, BA', 'de Brasília, DF', 'de Curitiba, PR'];

const SocialProof: React.FC = () => {
    const [stats, setStats] = useState({
        live: 212,
        quizzes: 10522,
        shares: 8500,
    });
    const [lastShare, setLastShare] = useState(cities[0]);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const intervals = [
            setInterval(() => setStats(s => ({ ...s, live: Math.max(150, s.live + Math.floor(Math.random() * 11) - 5) })), 3000),
            setInterval(() => setStats(s => ({ ...s, quizzes: s.quizzes + 1 })), 2000),
            setInterval(() => {
                setStats(s => ({ ...s, shares: s.shares + 1 }));
                setLastShare(cities[Math.floor(Math.random() * cities.length)]);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 5000);
            }, 8000),
        ];
        return () => intervals.forEach(clearInterval);
    }, []);

    return (
        <>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 bg-slate-800/50 border border-slate-700 rounded-full py-3 px-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <strong>{stats.live}</strong> respondendo agora
                </div>
                <div className="hidden sm:block w-px h-4 bg-slate-600"></div>
                <div className="flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <strong>{stats.quizzes.toLocaleString('pt-BR')}</strong> quizzes respondidos
                </div>
                 <div className="hidden sm:block w-px h-4 bg-slate-600"></div>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
                    <strong>{stats.shares.toLocaleString('pt-BR')}</strong> compartilhamentos
                </div>
            </div>
            
            {/* Toast Notification - Moved to top right to avoid footer clash */}
            <div 
                className={`fixed top-24 right-4 max-w-xs bg-slate-800 border border-slate-700 text-slate-300 text-sm py-3 px-4 rounded-lg shadow-xl z-50 transition-all duration-500 ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
            >
                <div className="flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-full">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </div>
                    <span>Alguém {lastShare} acabou de compartilhar seu resultado!</span>
                </div>
            </div>
        </>
    );
};

export default SocialProof;

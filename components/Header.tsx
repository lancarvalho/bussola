
import React from 'react';
import Logo from './Logo';

interface HeaderProps {
    onAboutClick: () => void;
    onStatsClick: () => void;
    onSupportClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAboutClick, onStatsClick, onSupportClick }) => {
    return (
        <header className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Logo size="medium" />
                    <div className="flex flex-col justify-center">
                        {/* Usando texto com gradiente semelhante ao SVG gerado para acessibilidade e SEO, mas com o mesmo visual */}
                        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none">
                            <span className="text-slate-200">Bússola</span>
                            <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-500 to-blue-500">Política</span>
                        </h1>
                        <p className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide uppercase mt-0.5 hidden sm:block">
                            Analise suas convicções. Descubra sua posição.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-6">
                    <button onClick={onStatsClick} className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Estatísticas
                    </button>
                    <button onClick={onAboutClick} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Sobre
                    </button>
                    <button 
                        onClick={onSupportClick}
                        className="text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2 rounded-full hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap"
                    >
                        Apoiar
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

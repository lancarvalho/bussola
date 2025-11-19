
import React from 'react';
import Logo from './Logo';

interface HeaderProps {
    onAboutClick: () => void;
    onStatsClick: () => void;
    onSupportClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAboutClick, onStatsClick, onSupportClick }) => {
    return (
        <header className="sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Logo size="medium" />
                    <div>
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Espectro Político</h1>
                        <p className="text-xs text-slate-400 hidden sm:block">Analise suas convicções. Descubra sua posição.</p>
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
                        className="text-sm font-semibold text-white bg-gradient-to-r from-teal-400 to-cyan-500 px-3 sm:px-4 py-2 rounded-full hover:opacity-90 transition-opacity shadow-md shadow-teal-500/20 whitespace-nowrap"
                    >
                        Apoiar
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

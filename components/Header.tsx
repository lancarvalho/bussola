
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
                     <a 
                        href="https://github.com/lancarvalho/bussola" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors p-1"
                        aria-label="GitHub"
                        title="Ver código no GitHub"
                    >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                    </a>
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

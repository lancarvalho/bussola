
import React, { useState } from 'react';
import { usePwaInstall } from '../hooks/usePwaInstall';

const InstallButton: React.FC = () => {
  const { isSupported, isInstalled, installApp, isIOS } = usePwaInstall();
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  // Não mostrar se já estiver instalado
  if (isInstalled) return null;

  // Mostrar botão se for suportado (Android/Desktop) OU se for iOS (para mostrar tutorial)
  if (!isSupported && !isIOS) return null;

  const handleClick = () => {
    if (isIOS) {
      setShowIOSInstructions(true);
    } else {
      installApp();
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="group relative inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-all duration-300 border border-slate-700 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-500/20"
        aria-label="Instalar aplicativo"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span className="text-sm font-medium relative z-10">Instalar App</span>
      </button>

      {/* Modal de Instruções para iOS */}
      {showIOSInstructions && (
        <div 
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" 
            onClick={() => setShowIOSInstructions(false)}
        >
           <div 
                className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative mb-4 sm:mb-0" 
                onClick={e => e.stopPropagation()}
           >
              <button 
                onClick={() => setShowIOSInstructions(false)} 
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-slate-700 p-3 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Instalar no iPhone</h3>
                  <p className="text-slate-400 text-sm">
                    Adicione este app à sua tela de início para uma experiência em tela cheia.
                  </p>
                  <ol className="text-left text-sm text-slate-300 space-y-3 w-full bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                      <li className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-xs font-bold text-cyan-400">1</span>
                          <span>Toque no botão <strong>Compartilhar</strong> <span className="text-[10px] text-slate-500 ml-1">(ícone com seta pra cima)</span></span>
                      </li>
                      <li className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-xs font-bold text-cyan-400">2</span>
                          <span>Role para baixo e selecione <strong className="text-white">Adicionar à Tela de Início</strong></span>
                      </li>
                      <li className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-xs font-bold text-cyan-400">3</span>
                          <span>Confirme clicando em <strong>Adicionar</strong></span>
                      </li>
                  </ol>
                  <button onClick={() => setShowIOSInstructions(false)} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors">Entendi</button>
              </div>
           </div>
        </div>
      )}
    </>
  );
};

export default InstallButton;

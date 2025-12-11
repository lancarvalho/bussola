
import React from 'react';
import { usePwaInstall } from '../hooks/usePwaInstall';

const InstallButton: React.FC = () => {
  const { isSupported, isInstalled, installApp } = usePwaInstall();

  // Não mostrar se já estiver instalado ou se o navegador não disparou o evento (ex: Firefox desktop ou iOS Safari antigo sem suporte a prompt nativo via JS)
  // Nota: iOS Safari atual requer instruções manuais, mas focaremos no fluxo padrão de install prompt aqui.
  if (!isSupported || isInstalled) return null;

  return (
    <button
      onClick={installApp}
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
  );
};

export default InstallButton;

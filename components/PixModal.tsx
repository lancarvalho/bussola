
import React, { useState } from 'react';

interface PixModalProps {
    onClose: () => void;
}

const stripeUrl = "https://donate.stripe.com/fZudR95Qj7zxfA5eqFgMw03";
const pixKey = "00020126580014BR.GOV.BCB.PIX01362a0bcf75-870c-4630-8d6e-c8cf41b7e67a5204000053039865802BR5925LUIZ AUGUSTO NEVES CARVAL6014BELO HORIZONTE62250521Obrigadopelasuadoacao6304CB3F";
const randomKey = "2a0bcf75-870c-4630-8d6e-c8cf41b7e67a";

const PixModal: React.FC<PixModalProps> = ({ onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(pixKey).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-center" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                    <h2 className="text-xl font-bold text-white">Apoie o Projeto</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                
                <div className="space-y-4 pt-2">
                    {/* Opção Stripe - Destaque Principal */}
                    <a 
                        href={stripeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg shadow-indigo-500/30 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Apoiar via Cartão (Stripe)
                    </a>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase">
                            <span className="bg-slate-800 px-2 text-slate-500 font-bold tracking-widest">ou via PIX</span>
                        </div>
                    </div>

                    {/* QR Code PIX */}
                    <div className="flex flex-col items-center">
                        <div className="bg-white p-2 rounded-lg shadow-inner mb-3">
                            <img src="/qr-code.png" alt="PIX QR Code" className="w-40 h-40" />
                        </div>
                        
                        <div className="bg-slate-900/50 p-3 rounded-lg text-left w-full border border-slate-700">
                            <p className="text-[9px] text-slate-500 mb-1 font-bold uppercase tracking-wider">Chave Aleatória:</p>
                            <p className="text-[10px] font-mono break-all text-slate-400 leading-tight">{randomKey}</p>
                        </div>

                        <button 
                            onClick={handleCopy} 
                            className="mt-3 w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-4 rounded-lg transition-colors text-xs flex items-center justify-center gap-2"
                        >
                            {copied ? (
                                <span className="text-emerald-400 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Copiado!
                                </span>
                            ) : 'Copiar Código PIX'}
                        </button>
                    </div>
                </div>

                <p className="text-[10px] text-slate-500 mt-6 italic leading-relaxed">
                    "O Leãozinho existe para ajudar a Luinha a pensar e organizar suas ideias."<br/>
                    Sua contribuição ajuda a manter este projeto independente.
                </p>
            </div>
        </div>
    );
};

export default PixModal;

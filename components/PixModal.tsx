import React, { useState } from 'react';

interface PixModalProps {
    onClose: () => void;
}

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
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Apoie com PIX</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                <p className="text-slate-400 text-sm mb-4">Aponte a câmera do seu celular para o QR Code ou use o código abaixo.</p>
                <div className="flex justify-center my-4 bg-white p-2 rounded-lg">
                    <img src="/qr-code.png" alt="PIX QR Code" className="w-48 h-48" />
                </div>
                <div className="bg-slate-700 p-3 rounded-lg">
                    <p className="text-xs text-slate-400 mb-1">Chave aleatória:</p>
                    <p className="text-sm font-mono break-all text-slate-300">{randomKey}</p>
                </div>
                <button 
                  onClick={handleCopy} 
                  className="mt-4 w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
                >
                    {copied ? 'Copiado!' : 'Copiar Código PIX'}
                </button>
            </div>
        </div>
    );
};

export default PixModal;
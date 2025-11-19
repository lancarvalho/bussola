import React, { useState } from 'react';

interface ShareButtonsProps {
    category: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ category }) => {
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const shareText = `Meu resultado no Bússola Política foi "${category}". Descubra também o seu espectro político! #BussolaPolitica`;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                Compartilhar no X
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                WhatsApp
            </a>
            <button onClick={handleCopy} className="flex-1 bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">
                {copied ? 'Link Copiado!' : 'Copiar Link'}
            </button>
        </div>
    );
};

export default ShareButtons;
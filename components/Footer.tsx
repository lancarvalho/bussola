
import React from 'react';
import InstallButton from './InstallButton';

interface FooterProps {
    onAboutClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAboutClick }) => {
    return (
        <footer className="w-full mt-auto py-6">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-4">
                <InstallButton />
                
                <button 
                    onClick={onAboutClick}
                    className="text-xs font-medium text-slate-500 hover:text-cyan-400 transition-colors backdrop-blur-sm bg-slate-900/30 px-3 py-1 rounded-full"
                >
                    Sobre & Privacidade
                </button>
            </div>
        </footer>
    );
};

export default Footer;

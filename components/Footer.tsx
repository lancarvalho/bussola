import React from 'react';

interface FooterProps {
    onAboutClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAboutClick }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-center py-4 px-4 mt-auto">
            <div className="text-xs text-slate-500">
                <p>&copy; 2024-{currentYear} Espectro Político. Todos os direitos reservados.</p>
                <p className="mt-1">Feito com tecnologia IA by AI Studio.</p>
            </div>
        </footer>
    );
};

export default Footer;
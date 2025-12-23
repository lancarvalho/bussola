
import React from 'react';

interface AboutModalProps {
    onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
    const currentYear = new Date().getFullYear();

    return (
        <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Sobre o Espectro Político</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                
                <div className="text-slate-400 space-y-4 text-sm">
                    <section>
                        <h3 className="font-semibold text-slate-300 mb-1">Nosso Quiz</h3>
                        <p>Este quiz foi desenvolvido para oferecer uma perspectiva sobre seu posicionamento no espectro ideológico brasileiro, com base em temas atuais e relevantes. As questões foram formuladas para abranger debates sobre economia, sociedade, política externa e liberdades individuais.</p>
                    </section>
                    
                    <section>
                        <h3 className="font-semibold text-slate-300 mb-1">Metodologia e Isenção de Viés</h3>
                        <p>A pontuação é calculada com base em alinhamentos tradicionalmente associados a cada espectro político. As perguntas não possuem viés nem têm a intenção de provocar, mas sim de refletir as nuances do debate público. O questionário pode ser atualizado periodicamente para se manter relevante aos acontecimentos atuais.</p>
                    </section>
                    
                     <section>
                        <h3 className="font-semibold text-slate-300 mb-1">Aviso de Precisão</h3>
                        <p>O resultado é uma referência e não deve ser considerado um diagnóstico político definitivo. Opiniões, pessoas e contextos mudam, e nenhum método pode se declarar infalível. Use este quiz como uma ferramenta de reflexão e ponto de partida para mais pesquisas.</p>
                    </section>

                    <section>
                        <h3 className="font-semibold text-slate-300 mb-1">Privacidade</h3>
                        <p>Sua privacidade é fundamental. Este aplicativo não solicita, coleta ou armazena quaisquer dados pessoais ou respostas do quiz. Toda a interação acontece diretamente no seu navegador e é completamente anônima.</p>
                    </section>

                    <hr className="border-slate-700 my-4" />
                    
                    <section className="text-center text-xs text-slate-500 pt-2">
                        <p className="font-semibold">&copy; {currentYear} Bússola Política</p>
                        <p>by LancStudio.</p>
                    </section>
                </div>

                 <button 
                    onClick={onClose} 
                    className="mt-6 w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};

export default AboutModal;

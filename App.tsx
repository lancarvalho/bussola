
import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutModal from './components/AboutModal';
import StatisticsModal from './components/StatisticsModal';
import SocialProof from './components/SocialProof';
import PixModal from './components/PixModal';
import { quizQuestions } from './data/quizData';

const scorableQuestions = quizQuestions.filter(q => !q.isDemographic);
const demographicQuestions = quizQuestions.filter(q => q.isDemographic);
const orderedQuestions = [...demographicQuestions, ...scorableQuestions];

const App: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [quizState, setQuizState] = useState<'start' | 'quiz' | 'result'>('start');
    const [isAboutModalOpen, setAboutModalOpen] = useState(false);
    const [isStatsModalOpen, setStatsModalOpen] = useState(false);
    const [isPixModalOpen, setPixModalOpen] = useState(false);

    const handleAnswer = (score: number) => {
        if (!orderedQuestions[currentQuestionIndex].isDemographic) {
            setAnswers(prevAnswers => [...prevAnswers, score]);
        }

        if (currentQuestionIndex < orderedQuestions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setQuizState('result');
        }
    };

    const startQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setQuizState('quiz');
    };
    
    const retakeQuiz = () => {
        startQuiz();
    };

    const renderContent = () => {
        switch (quizState) {
            case 'quiz':
                return (
                    <Quiz
                        question={orderedQuestions[currentQuestionIndex]}
                        questionNumber={currentQuestionIndex + 1}
                        totalQuestions={orderedQuestions.length}
                        onAnswer={handleAnswer}
                    />
                );
            case 'result':
                return <Result answers={answers} onRetake={retakeQuiz} />;
            case 'start':
            default:
                return (
                     <div className="flex flex-col grow items-center justify-center p-4 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 mb-4">
                            Bem-vindo!
                        </h1>
                        <p className="text-slate-400 max-w-xl text-lg mb-8">
                            Descubra onde você se encaixa no espectro político respondendo a uma série de perguntas.
                        </p>
                        <SocialProof />
                        <button
                            onClick={startQuiz}
                            className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 shadow-lg shadow-teal-500/20 transition-all duration-300 text-lg mt-8"
                        >
                            Começar o Quiz
                        </button>
                        
                        <button
                            onClick={() => setStatsModalOpen(true)}
                            className="mt-4 text-slate-500 hover:text-cyan-400 text-sm font-medium transition-colors flex items-center gap-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            Ver estatísticas da comunidade
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-900">
            <Header 
                onAboutClick={() => setAboutModalOpen(true)}
                onStatsClick={() => setStatsModalOpen(true)}
                onSupportClick={() => setPixModalOpen(true)}
            />
            <main className="flex-grow flex flex-col">{renderContent()}</main>
            <Footer onAboutClick={() => setAboutModalOpen(true)} />
            {isAboutModalOpen && <AboutModal onClose={() => setAboutModalOpen(false)} />}
            {isStatsModalOpen && <StatisticsModal onClose={() => setStatsModalOpen(false)} />}
            {isPixModalOpen && <PixModal onClose={() => setPixModalOpen(false)} />}
        </div>
    );
};

export default App;

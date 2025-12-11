
import React, { useState, useEffect, useMemo } from 'react';
import Gauge from './Gauge';
import ShareButtons from './ShareButtons';
import { MIN_SCORE, MAX_SCORE, quizQuestions } from '../data/quizData';

interface ResultProps {
  answers: number[];
  onRetake: () => void;
}

const getResultCategory = (score: number): string => {
  if (score < -37) return "1A-Esquerda";
  if (score < -13) return "Esquerda";
  if (score <= 12) return "Centro";
  if (score <= 37) return "Direita";
  return "Direita Puro-Sangue";
};

const Result: React.FC<ResultProps> = ({ answers, onRetake }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'calculating' | 'done'>('calculating');
  const [showDetails, setShowDetails] = useState(false);

  // Mapear respostas para as questões correspondentes para análise
  // Filtramos as demográficas pois o array 'answers' só contem respostas pontuáveis
  const scorableQuestions = useMemo(() => quizQuestions.filter(q => !q.isDemographic), []);

  const finalRawScore = useMemo(() => answers.reduce((acc, score) => acc + score, 0), [answers]);
  
  const finalNormalizedScore = useMemo(() => {
    if (finalRawScore === 0) return 0;
    const scoreRange = finalRawScore > 0 ? MAX_SCORE : Math.abs(MIN_SCORE);
    if (scoreRange === 0) return 0;
    return (finalRawScore / scoreRange) * 50;
  }, [finalRawScore]);

  // Identificar questões que mais influenciaram o resultado (maior valor absoluto)
  const influentialQuestions = useMemo(() => {
    const scored = answers.map((score, index) => ({
      score,
      question: scorableQuestions[index],
      absScore: Math.abs(score)
    }));
    // Ordenar por impacto absoluto
    return scored.sort((a, b) => b.absScore - a.absScore).slice(0, 3);
  }, [answers, scorableQuestions]);

  useEffect(() => {
    let cumulativeRawScore = 0;
    const animationInterval = 100; // ms between each answer processing

    // This function normalizes the score on a linear scale from MIN_SCORE to MAX_SCORE for a smooth animation
    const normalizeForAnimation = (rawScore: number) => {
        const totalRange = MAX_SCORE - MIN_SCORE;
        if (totalRange === 0) return 0;
        const scoreAsPercent = (rawScore - MIN_SCORE) / totalRange;
        return scoreAsPercent * 100 - 50; // Map to -50 -> 50 scale
    };
    
    answers.forEach((score, index) => {
      setTimeout(() => {
        cumulativeRawScore += score;
        setDisplayScore(normalizeForAnimation(cumulativeRawScore));
      }, (index + 1) * animationInterval);
    });

    const totalAnimationTime = (answers.length + 1) * animationInterval;

    // After animation, snap to the final calculated score and show results
    setTimeout(() => {
        setDisplayScore(finalNormalizedScore);
        setTimeout(() => {
            setAnimationPhase('done');
        }, 400); // Brief pause on final score before showing text
    }, totalAnimationTime);
  }, [answers, finalNormalizedScore]);

  const category = getResultCategory(finalNormalizedScore);
  const roundedScore = Math.round(finalNormalizedScore);

  return (
    <div className="flex flex-col items-center justify-center flex-grow p-4 text-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Seu Resultado</h1>
            
            <Gauge score={displayScore} />

            <div className="mt-6 bg-slate-50 rounded-xl p-4 min-h-[118px] flex flex-col justify-center transition-opacity duration-500"
                 style={{ opacity: animationPhase === 'done' ? 1 : 0 }}
            >
                <p className="text-slate-600 text-lg">Seu Resultado:</p>
                <h2 className="text-3xl font-bold text-slate-800 mt-1">{category}</h2>
                <p className="text-slate-500 text-md mt-2">Pontuação total: {roundedScore >= 0 ? '+' : ''}{roundedScore}</p>
            </div>

            {/* Seção Expansível de Detalhes */}
            <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${animationPhase === 'done' ? 'visible' : 'invisible'}`}
                style={{ maxHeight: showDetails ? '500px' : '0px', opacity: showDetails ? 1 : 0 }}
            >
                <div className="mt-4 text-left bg-slate-100 rounded-lg p-4 text-sm border border-slate-200">
                    <h3 className="font-bold text-slate-700 mb-2">Por que este resultado?</h3>
                    <p className="text-slate-500 mb-3 text-xs">A pontuação varia de -50 (Extrema Esquerda) a +50 (Direita Puro-Sangue). Veja o que mais pesou na sua nota:</p>
                    <ul className="space-y-3">
                        {influentialQuestions.map((item, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                                <span className={`font-bold whitespace-nowrap px-2 py-0.5 rounded text-[10px] mt-0.5 ${item.score > 0 ? 'bg-blue-100 text-blue-700' : item.score < 0 ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-600'}`}>
                                    {item.score > 0 ? `+${item.score} Dir` : `${item.score} Esq`}
                                </span>
                                <div>
                                    <p className="text-slate-700 font-medium leading-tight">{item.question.question}</p>
                                    <p className="text-slate-500 text-xs italic mt-0.5">Sua resposta impactou rumo à {item.score > 0 ? 'direita' : item.score < 0 ? 'esquerda' : 'centro'}.</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <button
                onClick={() => setShowDetails(!showDetails)}
                className={`mt-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center justify-center gap-1 transition-opacity duration-500 ${animationPhase === 'done' ? 'opacity-100' : 'opacity-0'}`}
            >
                {showDetails ? 'Ocultar detalhes' : 'Entenda seu resultado'} 
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
             {animationPhase === 'calculating' && (
                <div className="absolute bottom-[100px] left-0 right-0 mx-auto">
                     <p className="text-slate-600 text-lg font-semibold animate-pulse">Lendo suas respostas...</p>
                </div>
            )}
            
            <div 
              className="mt-6 space-y-4 transition-all duration-500"
              style={{
                    opacity: animationPhase === 'done' ? 1 : 0,
                    transform: `translateY(${animationPhase === 'done' ? '0px' : '20px'})`,
                    visibility: animationPhase === 'done' ? 'visible' : 'hidden'
              }}
            >
              <ShareButtons category={category} />
              <hr className="border-slate-200" />
              <button
                  onClick={onRetake}
                  className="w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
              >
                  Refazer o Quiz
              </button>
            </div>
        </div>
    </div>
  );
};

export default Result;

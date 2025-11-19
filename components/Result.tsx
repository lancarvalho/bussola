import React, { useState, useEffect, useMemo } from 'react';
import Gauge from './Gauge';
import ShareButtons from './ShareButtons';
import { MIN_SCORE, MAX_SCORE } from '../data/quizData';

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

  const finalRawScore = useMemo(() => answers.reduce((acc, score) => acc + score, 0), [answers]);
  
  const finalNormalizedScore = useMemo(() => {
    if (finalRawScore === 0) return 0;
    const scoreRange = finalRawScore > 0 ? MAX_SCORE : Math.abs(MIN_SCORE);
    if (scoreRange === 0) return 0;
    return (finalRawScore / scoreRange) * 50;
  }, [finalRawScore]);

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
            
             {animationPhase === 'calculating' && (
                <div className="absolute bottom-[100px] left-0 right-0 mx-auto">
                     <p className="text-slate-600 text-lg font-semibold animate-pulse">Lendo suas respostas...</p>
                </div>
            )}
            
            <div 
              className="mt-8 space-y-4 transition-all duration-500"
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
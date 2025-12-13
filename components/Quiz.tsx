
import React, { useState, useEffect } from 'react';
import type { Question } from '../types';

interface QuizProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ question, questionNumber, totalQuestions, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question]);

  const handleSelectAnswer = (score: number, index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    setTimeout(() => {
      onAnswer(score);
    }, 500);
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div 
        className={`w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 transform transition-all duration-700 ease-out 
          ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-500 mb-2">
            Pergunta {questionNumber} de {totalQuestions}
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-slate-800 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <p className="text-slate-600 text-sm font-medium mb-2">{question.block}</p>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-8">{question.question}</h2>

        <div className="space-y-4">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(answer.score, index)}
              disabled={isAnswered}
              className={`w-full text-left p-4 border rounded-lg transition-all duration-300 group
                ${isAnswered && selectedAnswer !== index ? 'bg-slate-100 border-slate-200 text-slate-500' : ''}
                ${selectedAnswer === index ? 'bg-slate-800 text-white border-slate-800 scale-105 shadow-lg' : ''}
                ${!isAnswered && selectedAnswer !== index ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-700 hover:border-slate-500 hover:text-white' : ''}
                ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex justify-between items-center w-full">
                <span>{answer.text}</span>
                {isAnswered && selectedAnswer === index && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400 ml-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

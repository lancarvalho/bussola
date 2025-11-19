
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
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 transform transition-all duration-500">
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
              className={`w-full text-left p-4 border rounded-lg transition-all duration-300 text-slate-700
                ${isAnswered && selectedAnswer !== index ? 'bg-slate-100 border-slate-200 text-slate-500' : ''}
                ${selectedAnswer === index ? 'bg-slate-800 text-white border-slate-800 scale-105 shadow-lg' : 'bg-white border-slate-300 hover:bg-slate-50 hover:border-slate-400'}
                ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

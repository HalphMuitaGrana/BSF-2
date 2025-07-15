import React, { useState } from 'react';
import { Coins, Star, Trophy, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  coins: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual é o ingrediente principal do brigadeiro?",
    options: ["Chocolate em pó", "Cacau", "Nutella", "Achocolatado"],
    correct: 0,
    coins: 10
  },
  {
    id: 2,
    question: "O que deixa o brigadeiro cremoso?",
    options: ["Água", "Leite", "Leite condensado", "Creme de leite"],
    correct: 2,
    coins: 15
  },
  {
    id: 3,
    question: "Qual a vantagem do brigadeiro sem fogo?",
    options: ["Mais rápido", "Mais saudável", "Mais barato", "Todas as anteriores"],
    correct: 3,
    coins: 20
  }
];

interface QuizGameProps {
  onComplete: (totalCoins: number) => void;
}

export default function QuizGame({ onComplete }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [totalCoins, setTotalCoins] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    // Verificar se a resposta está correta e adicionar moedas
    if (answerIndex === questions[currentQuestion].correct) {
      setTotalCoins(prev => prev + questions[currentQuestion].coins);
    }

    // Mostrar resultado por 2 segundos antes de prosseguir
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
        setShowResult(false);
      } else {
        onComplete(totalCoins + (answerIndex === questions[currentQuestion].correct ? questions[currentQuestion].coins : 0));
      }
    }, 2000);

    setShowResult(true);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Header com progresso e moedas */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 mb-4 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-yellow-600">{totalCoins} moedas</span>
            </div>
            <div className="text-sm text-gray-600">
              {currentQuestion + 1} de {questions.length}
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Pergunta */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-semibold text-purple-600">
                +{currentQ.coins} moedas
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {currentQ.question}
            </h2>
          </div>

          {/* Opções de resposta */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ";
              
              if (!answered) {
                buttonClass += "border-gray-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer";
              } else {
                if (index === currentQ.correct) {
                  buttonClass += "border-green-500 bg-green-50 text-green-700";
                } else if (index === selectedAnswer && index !== currentQ.correct) {
                  buttonClass += "border-red-500 bg-red-50 text-red-700";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={answered}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {answered && index === currentQ.correct && (
                      <span className="text-green-600">✓</span>
                    )}
                    {answered && index === selectedAnswer && index !== currentQ.correct && (
                      <span className="text-red-600">✗</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback da resposta */}
          {showResult && (
            <div className="mt-6 p-4 rounded-xl text-center">
              {selectedAnswer === currentQ.correct ? (
                <div className="text-green-600">
                  <div className="text-2xl mb-2">🎉</div>
                  <p className="font-semibold">Correto! +{currentQ.coins} moedas</p>
                </div>
              ) : (
                <div className="text-red-600">
                  <div className="text-2xl mb-2">😅</div>
                  <p className="font-semibold">Ops! A resposta correta era: {currentQ.options[currentQ.correct]}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
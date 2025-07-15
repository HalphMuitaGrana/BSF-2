import React, { useState } from 'react';
import { Gift, Zap, Play, Gamepad2, Coins, Award } from 'lucide-react';
import QuizGame from './components/QuizGame';
import GameResult from './components/GameResult';

function App() {
  const [gameState, setGameState] = useState<'home' | 'playing' | 'result'>('home');
  const [finalCoins, setFinalCoins] = useState(0);

  const handleStartGame = () => {
    setGameState('playing');
  };

  const handleGameComplete = (totalCoins: number) => {
    setFinalCoins(totalCoins);
    setGameState('result');
  };

  const handleRestart = () => {
    setGameState('home');
    setFinalCoins(0);
  };

  if (gameState === 'playing') {
    return <QuizGame onComplete={handleGameComplete} />;
  }

  if (gameState === 'result') {
    return <GameResult totalCoins={finalCoins} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center mx-2">
        {/* Ícone Principal com Animação */}
        <div className="mb-6 relative">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl animate-pulse">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
            <Zap className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Título Principal */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
          Você consegue desbloquear a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            sobremesa mais fácil
          </span>{' '}
          do Brasil?
        </h1>

        {/* Descrição */}
        <p className="text-lg text-blue-100 mb-8 leading-relaxed">
          Responda perguntas simples, acumule moedas e desbloqueie bônus secretos —
          <span className="text-yellow-400 font-semibold"> quanto mais moedas, maior seu desconto no final!</span>
        </p>

        {/* Cards de Recursos */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-colors">
            <div className="text-2xl mb-1">
              <Gamepad2 className="w-6 h-6 mx-auto text-yellow-300" />
            </div>
            <p className="text-white text-xs">Quiz Interativo</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-colors">
            <div className="text-2xl mb-1">
              <Coins className="w-6 h-6 mx-auto text-yellow-300" />
            </div>
            <p className="text-white text-xs">Sistema de Moedas</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-colors">
            <div className="text-2xl mb-1">
              <Award className="w-6 h-6 mx-auto text-yellow-300" />
            </div>
            <p className="text-white text-xs">Bônus Exclusivos</p>
          </div>
        </div>

        {/* Botão Principal */}
        <button 
          onClick={handleStartGame}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-full text-xl font-bold hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 group active:scale-95"
        >
          <Play className="w-6 h-6 group-hover:animate-pulse" />
          COMEÇAR AGORA 🎮
        </button>

        {/* Informações Adicionais */}
        <div className="mt-6 text-blue-200 text-sm">
          <p>✅ Gratuito • ⏱️ 2 minutos • 🎯 Resultado garantido</p>
        </div>
      </div>
    </div>
  );
}

export default App;
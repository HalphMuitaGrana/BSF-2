import React from 'react';
import { Trophy, Coins, Gift, Star, ArrowRight } from 'lucide-react';

interface GameResultProps {
  totalCoins: number;
  onRestart: () => void;
}

export default function GameResult({ totalCoins, onRestart }: GameResultProps) {
  const getDiscountPercentage = () => {
    if (totalCoins >= 45) return 50;
    if (totalCoins >= 35) return 40;
    if (totalCoins >= 25) return 30;
    if (totalCoins >= 15) return 20;
    return 10;
  };

  const discount = getDiscountPercentage();
  const performance = totalCoins >= 35 ? 'Excelente!' : totalCoins >= 25 ? 'Muito Bom!' : totalCoins >= 15 ? 'Bom!' : 'Continue Tentando!';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          {/* Troféu animado */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl animate-bounce">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Título de resultado */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {performance}
          </h1>
          
          <p className="text-gray-600 mb-6">
            Você completou o quiz e desbloqueou sua recompensa!
          </p>

          {/* Estatísticas */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Coins className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold text-yellow-600">{totalCoins}</span>
              <span className="text-gray-600">moedas coletadas</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-xs text-gray-500">Perguntas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{Math.round((totalCoins / 45) * 100)}%</div>
                <div className="text-xs text-gray-500">Acertos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{discount}%</div>
                <div className="text-xs text-gray-500">Desconto</div>
              </div>
            </div>
          </div>

          {/* Recompensa desbloqueada */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Gift className="w-6 h-6 text-green-600" />
              <span className="font-bold text-green-700">Recompensa Desbloqueada!</span>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{discount}% OFF</div>
              <p className="text-green-700 font-semibold mb-3">
                Receita Completa do Brigadeiro Sem Fogo
              </p>
              <p className="text-sm text-green-600">
                + Vídeo passo a passo + Lista de ingredientes + Dicas secretas
              </p>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-full text-lg font-bold hover:from-green-400 hover:to-emerald-500 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 group">
              <Gift className="w-5 h-5" />
              RESGATAR DESCONTO
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={onRestart}
              className="w-full bg-white border-2 border-purple-300 text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors"
            >
              Jogar Novamente
            </button>
          </div>

          {/* Informações extras */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              <span>Oferta limitada</span>
            </div>
            <div>•</div>
            <div>Válido por 24h</div>
            <div>•</div>
            <div>Sem pegadinhas</div>
          </div>
        </div>
      </div>
    </div>
  );
}
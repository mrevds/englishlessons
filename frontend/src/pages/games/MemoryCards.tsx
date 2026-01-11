import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Brain, ArrowLeft } from 'lucide-react';
import { gamesAPI } from '../../api/games';
import { useTranslation } from 'react-i18next';

interface Card {
  id: number;
  content: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryCards: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const levelParam = searchParams.get('level');
  const { t } = useTranslation();
  const level = levelParam !== null ? Number(levelParam) : 0;

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [endTime, setEndTime] = useState<number>(0);
  const [resultSaved, setResultSaved] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  // Сохраняем результат игры
  useEffect(() => {
    if (gameFinished && !resultSaved) {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      const maxPairs = 6;
      // Эффективность - сколько ходов на все пары (минимум 6 ходов)
      const efficiency = Math.max(0, Math.round((maxPairs / moves) * 100));
      
      gamesAPI.submitResult({
        game_type: 'memory-cards',
        level,
        score: efficiency,
        max_score: 100,
        time_spent: timeSpent,
        correct_count: matches,
        total_count: maxPairs,
      }).then(() => {
        setResultSaved(true);
      }).catch(console.error);
    }
  }, [gameFinished, resultSaved, matches, moves, level]);

  useEffect(() => {
    initializeGame();
  }, [level]);

  const initializeGame = () => {
    let pairs: { english: string; russian: string }[] = [];
    
    if (level === 1) { // Countable/Uncountable
      pairs = [
        { english: 'many', russian: 'много (исчисл.)' },
        { english: 'much', russian: 'много (неисчисл.)' },
        { english: 'a few', russian: 'несколько' },
        { english: 'a little', russian: 'немного' },
        { english: 'countable', russian: 'исчисляемое' },
        { english: 'uncountable', russian: 'неисчисляемое' },
      ];
    } else if (level === 2) { // Singular/Plural
      pairs = [
        { english: 'child', russian: 'children' },
        { english: 'man', russian: 'men' },
        { english: 'woman', russian: 'women' },
        { english: 'tooth', russian: 'teeth' },
        { english: 'mouse', russian: 'mice' },
        { english: 'foot', russian: 'feet' },
      ];
    } else if (level === 3) { // Articles
      pairs = [
        { english: 'a/an', russian: 'неопр. артикль' },
        { english: 'the', russian: 'опр. артикль' },
        { english: 'a cat', russian: 'кот (любой)' },
        { english: 'the cat', russian: 'кот (конкретный)' },
        { english: 'an apple', russian: 'яблоко (гласная)' },
        { english: 'the sun', russian: 'солнце (уник.)' },
      ];
    } else if (level === 4) { // Present Simple
      pairs = [
        { english: 'I go', russian: 'Я хожу' },
        { english: 'he goes', russian: 'он ходит' },
        { english: 'do', russian: 'вспом. глагол' },
        { english: 'does', russian: 'для he/she/it' },
        { english: 'always', russian: 'всегда' },
        { english: 'usually', russian: 'обычно' },
      ];
    } else if (level === 5) { // Present Continuous
      pairs = [
        { english: 'am doing', russian: 'я делаю (сейчас)' },
        { english: 'is doing', russian: 'он/она делает' },
        { english: 'are doing', russian: 'мы/они делают' },
        { english: 'now', russian: 'сейчас' },
        { english: 'at the moment', russian: 'в данный момент' },
        { english: 'right now', russian: 'прямо сейчас' },
      ];
    } else {
      pairs = [
        { english: 'Hello', russian: 'Привет' },
        { english: 'Good', russian: 'Хороший' },
        { english: 'Big', russian: 'Большой' },
        { english: 'Small', russian: 'Маленький' },
        { english: 'Happy', russian: 'Счастливый' },
        { english: 'Beautiful', russian: 'Красивый' },
      ];
    }

    const cardArray: Card[] = [];
    pairs.forEach((pair, index) => {
      cardArray.push({
        id: index * 2,
        content: pair.english,
        pairId: index,
        isFlipped: false,
        isMatched: false,
      });
      cardArray.push({
        id: index * 2 + 1,
        content: pair.russian,
        pairId: index,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    for (let i = cardArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
    }

    setCards(cardArray);
    setStartTime(Date.now());
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      checkMatch(newFlipped, newCards);
    }
  };

  const checkMatch = (flipped: number[], currentCards: Card[]) => {
    const [first, second] = flipped.map((id) =>
      currentCards.find((c) => c.id === id)
    );

    if (first && second && first.pairId === second.pairId) {
      // Match found
      setTimeout(() => {
        const matchedCards = currentCards.map((c) =>
          c.id === first.id || c.id === second.id
            ? { ...c, isMatched: true }
            : c
        );
        setCards(matchedCards);
        setFlippedCards([]);
        
        const newMatches = matches + 1;
        setMatches(newMatches);
        
        if (newMatches === 6) {
          setEndTime(Date.now());
          setGameFinished(true);
        }
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        const unflippedCards = currentCards.map((c) =>
          c.id === first?.id || c.id === second?.id
            ? { ...c, isFlipped: false }
            : c
        );
        setCards(unflippedCards);
        setFlippedCards([]);
      }, 1000);
    }
  };

  const restartGame = () => {
    setMoves(0);
    setMatches(0);
    setFlippedCards([]);
    setGameFinished(false);
    setEndTime(0);
    setResultSaved(false);
    startTimeRef.current = Date.now();
    initializeGame();
  };

  const getTimeTaken = () => {
    const seconds = Math.floor((endTime - startTime) / 1000);
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  if (gameFinished) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <button
            onClick={() => navigate('/games')}
            className="btn-secondary mb-4 sm:mb-6 flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к играм
          </button>

          <div className="card p-4 sm:p-8 text-center">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {t('games.memoryCards.congrats')}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-md mx-auto mb-6 sm:mb-8">
              <div className="card p-3 sm:p-4">
                <div className="text-xl sm:text-3xl font-bold text-blue-600 mb-1">{moves}</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t('games.memoryCards.movesSimple')}</div>
              </div>
              <div className="card p-3 sm:p-4">
                <div className="text-xl sm:text-3xl font-bold text-purple-600 mb-1">{getTimeTaken()}</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t('games.memoryCards.timeSimple')}</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button onClick={restartGame} className="btn-primary text-sm sm:text-base">
                {t('games.memoryCards.playAgain')}
              </button>
              <button onClick={() => navigate('/games')} className="btn-secondary text-sm sm:text-base">
                {t('games.memoryCards.chooseAnother')}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <button
          onClick={() => navigate('/games')}
          className="btn-secondary mb-4 sm:mb-6 flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('games.backToGames')}
        </button>

        <div className="card p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {t('games.list.memory-cards.title')}
              </h1>
            </div>
            <div className="flex gap-4 sm:gap-6 text-sm sm:text-lg">
              <span className="text-gray-600 dark:text-gray-400">
                {t('games.memoryCards.movesHeader')} <strong>{moves}</strong>
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {t('games.memoryCards.pairsHeader')} <strong>{matches} / 6</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isMatched || card.isFlipped}
              className={`aspect-square rounded-lg sm:rounded-xl text-xs sm:text-xl font-bold transition-all duration-300 transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              } ${card.isMatched ? 'opacity-50' : ''}`}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="flex items-center justify-center h-full p-1 sm:p-2 text-center text-xs sm:text-base">
                  {card.content}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-2xl sm:text-4xl">
                  🎴
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MemoryCards;

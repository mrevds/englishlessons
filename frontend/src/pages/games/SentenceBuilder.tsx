import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Puzzle, ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { gamesAPI } from '../../api/games';

interface Question {
  words: string[];
  correctOrder: number[];
  translation: string;
}

const SentenceBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const levelParam = searchParams.get('level');
  const level = levelParam !== null ? Number(levelParam) : 0;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [availableWords, setAvailableWords] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [resultSaved, setResultSaved] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const generatedQuestions = generateQuestions(level);
    setQuestions(generatedQuestions);
    startTimeRef.current = Date.now();
  }, [level]);

  useEffect(() => {
    if (questions.length > 0) {
      resetCurrentQuestion();
    }
  }, [currentQuestion, questions]);

  // Отправка результатов при завершении игры
  useEffect(() => {
    if (gameFinished && !resultSaved && questions.length > 0) {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      gamesAPI.submitResult({
        game_type: 'sentence-builder',
        level,
        score,
        max_score: questions.length,
        time_spent: timeSpent,
        correct_count: score,
        total_count: questions.length,
      }).then(() => {
        setResultSaved(true);
      }).catch((err) => {
        console.error('Failed to save game result:', err);
      });
    }
  }, [gameFinished, resultSaved, questions.length, score, level]);

  const generateQuestions = (level: number): Question[] => {
    const questionsByLevel: { [key: number]: Question[] } = {
      0: [ // Beginner
        { words: ['I', 'have', 'a', 'cat'], correctOrder: [0, 1, 2, 3], translation: 'У меня есть кот' },
        { words: ['She', 'is', 'happy'], correctOrder: [0, 1, 2], translation: 'Она счастлива' },
        { words: ['This', 'is', 'a', 'book'], correctOrder: [0, 1, 2, 3], translation: 'Это книга' },
        { words: ['I', 'like', 'apples'], correctOrder: [0, 1, 2], translation: 'Я люблю яблоки' },
        { words: ['The', 'cat', 'is', 'big'], correctOrder: [0, 1, 2, 3], translation: 'Кот большой' },
      ],
      1: [ // Beginner+
        { words: ['I', 'need', 'some', 'advice'], correctOrder: [0, 1, 2, 3], translation: 'Мне нужен совет' },
        { words: ['There', 'is', 'much', 'water'], correctOrder: [0, 1, 2, 3], translation: 'Много воды' },
        { words: ['How', 'many', 'apples'], correctOrder: [0, 1, 2], translation: 'Сколько яблок' },
        { words: ['She', 'has', 'a', 'few', 'friends'], correctOrder: [0, 1, 2, 3, 4], translation: 'У неё несколько друзей' },
        { words: ['The', 'furniture', 'is', 'expensive'], correctOrder: [0, 1, 2, 3], translation: 'Мебель дорогая' },
      ],
      2: [ // Elementary
        { words: ['She', 'goes', 'to', 'school'], correctOrder: [0, 1, 2, 3], translation: 'Она ходит в школу' },
        { words: ['He', 'doesn\'t', 'like', 'coffee'], correctOrder: [0, 1, 2, 3], translation: 'Он не любит кофе' },
        { words: ['Do', 'you', 'speak', 'English'], correctOrder: [0, 1, 2, 3], translation: 'Ты говоришь по-английски?' },
        { words: ['They', 'play', 'football'], correctOrder: [0, 1, 2], translation: 'Они играют в футбол' },
        { words: ['I', 'always', 'wake', 'up', 'early'], correctOrder: [0, 1, 2, 3, 4], translation: 'Я всегда просыпаюсь рано' },
      ],
      3: [ // Elementary+
        { words: ['She', 'is', 'cooking', 'dinner'], correctOrder: [0, 1, 2, 3], translation: 'Она готовит ужин' },
        { words: ['They', 'are', 'playing', 'now'], correctOrder: [0, 1, 2, 3], translation: 'Они играют сейчас' },
        { words: ['I', 'am', 'reading', 'a', 'book'], correctOrder: [0, 1, 2, 3, 4], translation: 'Я читаю книгу' },
        { words: ['This', 'is', 'my', 'sister\'s', 'car'], correctOrder: [0, 1, 2, 3, 4], translation: 'Это машина моей сестры' },
        { words: ['Are', 'you', 'watching', 'TV'], correctOrder: [0, 1, 2, 3], translation: 'Ты смотришь ТВ?' },
      ],
      4: [ // Pre-Intermediate
        { words: ['I', 'went', 'to', 'London', 'yesterday'], correctOrder: [0, 1, 2, 3, 4], translation: 'Я ездил в Лондон вчера' },
        { words: ['She', 'didn\'t', 'go', 'home'], correctOrder: [0, 1, 2, 3], translation: 'Она не пошла домой' },
        { words: ['They', 'were', 'at', 'school'], correctOrder: [0, 1, 2, 3], translation: 'Они были в школе' },
        { words: ['Did', 'you', 'see', 'him'], correctOrder: [0, 1, 2, 3], translation: 'Ты видел его?' },
        { words: ['We', 'bought', 'a', 'new', 'car'], correctOrder: [0, 1, 2, 3, 4], translation: 'Мы купили новую машину' },
      ],
      5: [ // Pre-Intermediate+
        { words: ['I', 'have', 'been', 'to', 'Paris'], correctOrder: [0, 1, 2, 3, 4], translation: 'Я был в Париже' },
        { words: ['She', 'is', 'taller', 'than', 'me'], correctOrder: [0, 1, 2, 3, 4], translation: 'Она выше меня' },
        { words: ['He', 'has', 'just', 'arrived'], correctOrder: [0, 1, 2, 3], translation: 'Он только что прибыл' },
        { words: ['This', 'is', 'the', 'biggest', 'house'], correctOrder: [0, 1, 2, 3, 4], translation: 'Это самый большой дом' },
        { words: ['They', 'have', 'already', 'finished'], correctOrder: [0, 1, 2, 3], translation: 'Они уже закончили' },
      ],
      6: [ // Intermediate
        { words: ['I', 'had', 'already', 'left'], correctOrder: [0, 1, 2, 3], translation: 'Я уже ушёл' },
        { words: ['She', 'will', 'go', 'tomorrow'], correctOrder: [0, 1, 2, 3], translation: 'Она пойдёт завтра' },
        { words: ['They', 'had', 'finished', 'before', 'I', 'arrived'], correctOrder: [0, 1, 2, 3, 4, 5], translation: 'Они закончили до того как я прибыл' },
        { words: ['I', 'am', 'going', 'to', 'leave'], correctOrder: [0, 1, 2, 3, 4], translation: 'Я собираюсь уйти' },
        { words: ['He', 'will', 'have', 'finished', 'by', 'then'], correctOrder: [0, 1, 2, 3, 4, 5], translation: 'Он закончит к тому времени' },
      ],
      7: [ // Intermediate+
        { words: ['She', 'can', 'speak', 'English'], correctOrder: [0, 1, 2, 3], translation: 'Она умеет говорить по-английски' },
        { words: ['You', 'must', 'study', 'harder'], correctOrder: [0, 1, 2, 3], translation: 'Ты должен учиться усерднее' },
        { words: ['If', 'it', 'rains', 'I', 'will', 'stay'], correctOrder: [0, 1, 2, 3, 4, 5], translation: 'Если пойдёт дождь, я останусь' },
        { words: ['If', 'I', 'were', 'rich'], correctOrder: [0, 1, 2, 3], translation: 'Если бы я был богат' },
        { words: ['She', 'should', 'go', 'home'], correctOrder: [0, 1, 2, 3], translation: 'Ей следует пойти домой' },
      ],
      8: [ // Upper-Intermediate
        { words: ['The', 'book', 'was', 'written', 'by', 'him'], correctOrder: [0, 1, 2, 3, 4, 5], translation: 'Книга была написана им' },
        { words: ['English', 'is', 'spoken', 'here'], correctOrder: [0, 1, 2, 3], translation: 'Здесь говорят по-английски' },
        { words: ['It', 'will', 'be', 'finished', 'tomorrow'], correctOrder: [0, 1, 2, 3, 4], translation: 'Это будет закончено завтра' },
        { words: ['The', 'house', 'is', 'being', 'built'], correctOrder: [0, 1, 2, 3, 4], translation: 'Дом строится' },
        { words: ['I', 'look', 'forward', 'to', 'meeting', 'you'], correctOrder: [0, 1, 2, 3, 4, 5], translation: 'Я с нетерпением жду встречи' },
      ],
      9: [ // Advanced
        { words: ['She', 'said', 'she', 'was', 'tired'], correctOrder: [0, 1, 2, 3, 4], translation: 'Она сказала что устала' },
        { words: ['He', 'told', 'me', 'he', 'would', 'come'], correctOrder: [0, 1, 2, 3, 4, 5], translation: 'Он сказал мне что придёт' },
        { words: ['She', 'asked', 'if', 'I', 'could', 'help'], correctOrder: [0, 1, 2, 3, 4, 5], translation: 'Она спросила могу ли я помочь' },
        { words: ['He', 'told', 'me', 'to', 'leave'], correctOrder: [0, 1, 2, 3, 4], translation: 'Он сказал мне уйти' },
        { words: ['She', 'asked', 'where', 'he', 'was'], correctOrder: [0, 1, 2, 3, 4], translation: 'Она спросила где он' },
      ],
      10: [ // Proficiency
        { words: ['Not', 'only', 'did', 'he', 'come'], correctOrder: [0, 1, 2, 3, 4], translation: 'Он не только пришёл' },
        { words: ['Had', 'I', 'known', 'I', 'would', 'have', 'helped'], correctOrder: [0, 1, 2, 3, 4, 5, 6], translation: 'Если бы я знал, я бы помог' },
        { words: ['Although', 'it', 'rained', 'we', 'went'], correctOrder: [0, 1, 2, 3, 4], translation: 'Хотя шёл дождь, мы пошли' },
        { words: ['The', 'work', 'will', 'have', 'been', 'completed'], correctOrder: [0, 1, 2, 3, 4, 5], translation: 'Работа будет завершена' },
        { words: ['Hardly', 'had', 'I', 'arrived', 'when'], correctOrder: [0, 1, 2, 3, 4], translation: 'Едва я прибыл, когда...' },
      ],
    };
    
    return questionsByLevel[level] || questionsByLevel[1];
  };

  const resetCurrentQuestion = () => {
    if (questions.length > 0) {
      const indices = questions[currentQuestion].words.map((_, i) => i);
      setAvailableWords(shuffleArray([...indices]));
      setSelectedWords([]);
      setShowResult(false);
    }
  };

  const shuffleArray = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleWordClick = (wordIndex: number, fromAvailable: boolean) => {
    if (showResult) return;

    if (fromAvailable) {
      setSelectedWords([...selectedWords, wordIndex]);
      setAvailableWords(availableWords.filter((i) => i !== wordIndex));
    } else {
      setAvailableWords([...availableWords, wordIndex]);
      setSelectedWords(selectedWords.filter((i) => i !== wordIndex));
    }
  };

  const handleCheck = () => {
    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(questions[currentQuestion].correctOrder);
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameFinished(true);
    }
  };

  const handleReset = () => {
    resetCurrentQuestion();
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameFinished(false);
    setResultSaved(false);
    startTimeRef.current = Date.now();
    resetCurrentQuestion();
  };

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p>Загрузка...</p>
        </div>
      </Layout>
    );
  }

  if (gameFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/games')}
            className="btn-secondary mb-4 sm:mb-6 flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к играм
          </button>

          <div className="card p-4 sm:p-8 text-center">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Отлично!
            </h2>
            <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              {score} / {questions.length}
            </div>
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
              Правильных ответов: {percentage}%
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button onClick={restartGame} className="btn-primary text-sm sm:text-base">
                Играть снова
              </button>
              <button onClick={() => navigate('/games')} className="btn-secondary text-sm sm:text-base">
                Выбрать другую игру
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(question.correctOrder);

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

        <div className="card p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Puzzle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
              Sentence Builder
            </h1>
          </div>

          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Предложение {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm sm:text-lg font-semibold">
              Очки: {score}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 sm:mb-6">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="card p-4 sm:p-8">
          <h2 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
            Собери предложение:
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6 sm:mb-8 text-sm sm:text-lg">
            {question.translation}
          </p>

          {/* Selected words area */}
          <div className="min-h-[80px] sm:min-h-[120px] p-3 sm:p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-4 sm:mb-6 border-2 border-blue-200 dark:border-blue-800">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">Твой ответ:</p>
            <div className="flex flex-wrap gap-2 sm:gap-3 min-h-[40px] sm:min-h-[60px]">
              {selectedWords.map((wordIndex, i) => (
                <button
                  key={i}
                  onClick={() => handleWordClick(wordIndex, false)}
                  disabled={showResult}
                  className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm sm:text-base"
                >
                  {question.words[wordIndex]}
                </button>
              ))}
            </div>
          </div>

          {/* Available words */}
          <div className="p-3 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">Доступные слова:</p>
            <div className="flex flex-wrap gap-2 sm:gap-3 min-h-[40px] sm:min-h-[60px]">
              {availableWords.map((wordIndex, i) => (
                <button
                  key={i}
                  onClick={() => handleWordClick(wordIndex, true)}
                  disabled={showResult}
                  className="px-2 sm:px-4 py-1 sm:py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
                >
                  {question.words[wordIndex]}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          {showResult && (
            <div className={`p-4 sm:p-6 rounded-xl mb-4 sm:mb-6 ${
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    <span className="text-base sm:text-xl font-bold text-green-700 dark:text-green-400">
                      Правильно! +1 очко
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                    <span className="text-base sm:text-xl font-bold text-red-700 dark:text-red-400">
                      Неправильно
                    </span>
                  </>
                )}
              </div>
              {!isCorrect && (
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <strong>Правильно:</strong>{' '}
                  {question.correctOrder.map((i) => question.words[i]).join(' ')}
                </p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            {!showResult ? (
              <>
                <button
                  onClick={handleCheck}
                  disabled={selectedWords.length !== question.words.length}
                  className="btn-primary disabled:opacity-50 text-sm sm:text-base"
                >
                  Проверить
                </button>
                <button
                  onClick={handleReset}
                  className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <RotateCcw className="w-4 h-4" />
                  Сбросить
                </button>
              </>
            ) : (
              <button onClick={handleNext} className="btn-primary text-sm sm:text-base">
                {currentQuestion < questions.length - 1 ? 'Следующее предложение' : 'Завершить'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SentenceBuilder;

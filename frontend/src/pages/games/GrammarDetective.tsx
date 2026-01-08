import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Target, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { gamesAPI } from '../../api/games';

interface Question {
  sentence: string;
  errorIndex: number;
  correctWord: string;
  explanation: string;
}

const GrammarDetective: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const levelParam = searchParams.get('level');
  const level = levelParam !== null ? Number(levelParam) : 0;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
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

  // Отправка результатов при завершении игры
  useEffect(() => {
    if (gameFinished && !resultSaved && questions.length > 0) {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      gamesAPI.submitResult({
        game_type: 'grammar-detective',
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
      0: [ // Beginner - Базовые артикли, множественное число
        { sentence: "I have a apple", errorIndex: 2, correctWord: "an", explanation: "Перед гласным звуком: an apple" },
        { sentence: "She has two cat", errorIndex: 3, correctWord: "cats", explanation: "Множественное число: cats" },
        { sentence: "This is a umbrella", errorIndex: 2, correctWord: "an", explanation: "Umbrella начинается с гласного: an" },
        { sentence: "I see three dog", errorIndex: 3, correctWord: "dogs", explanation: "Множественное число: dogs" },
        { sentence: "She have a book", errorIndex: 1, correctWord: "has", explanation: "С she: has (не have)" },
      ],
      1: [ // Beginner+ - Исчисляемые/неисчисляемые
        { sentence: "I need an advice", errorIndex: 2, correctWord: "some", explanation: "Advice неисчисляемое: some advice" },
        { sentence: "How many water do you need", errorIndex: 1, correctWord: "much", explanation: "Water - неисчисляемое: much" },
        { sentence: "There is many furniture", errorIndex: 2, correctWord: "much", explanation: "Furniture - неисчисляемое: much" },
        { sentence: "She has a few money", errorIndex: 3, correctWord: "little", explanation: "Money - неисчисляемое: a little" },
        { sentence: "I saw three childs", errorIndex: 3, correctWord: "children", explanation: "Child → children (irregular)" },
      ],
      2: [ // Elementary - Present Simple
        { sentence: "She go to school", errorIndex: 1, correctWord: "goes", explanation: "С she: goes" },
        { sentence: "He don't like coffee", errorIndex: 1, correctWord: "doesn't", explanation: "С he: doesn't" },
        { sentence: "They plays football", errorIndex: 1, correctWord: "play", explanation: "С they: play (без -s)" },
        { sentence: "Does she likes music", errorIndex: 2, correctWord: "like", explanation: "После does: base form" },
        { sentence: "I doesn't understand", errorIndex: 1, correctWord: "don't", explanation: "С I: don't" },
      ],
      3: [ // Elementary+ - Present Continuous, притяжательные
        { sentence: "She is cook dinner", errorIndex: 2, correctWord: "cooking", explanation: "Present Continuous: is cooking" },
        { sentence: "This is my sister car", errorIndex: 3, correctWord: "sister's", explanation: "Притяжательная форма: sister's" },
        { sentence: "They are play football", errorIndex: 2, correctWord: "playing", explanation: "Are playing" },
        { sentence: "I am run right now", errorIndex: 2, correctWord: "running", explanation: "Am running (удвоение n)" },
        { sentence: "The boys toys are here", errorIndex: 1, correctWord: "boys'", explanation: "Множественное: boys'" },
      ],
      4: [ // Pre-Intermediate - Past Simple
        { sentence: "I go to London yesterday", errorIndex: 1, correctWord: "went", explanation: "Past Simple: went" },
        { sentence: "She didn't went home", errorIndex: 2, correctWord: "go", explanation: "После didn't: base form" },
        { sentence: "They was at home", errorIndex: 1, correctWord: "were", explanation: "С they: were" },
        { sentence: "Did you saw him", errorIndex: 2, correctWord: "see", explanation: "После did: base form" },
        { sentence: "We buyed a car", errorIndex: 1, correctWord: "bought", explanation: "Buy → bought (irregular)" },
      ],
      5: [ // Pre-Intermediate+ - Present Perfect, сравнения
        { sentence: "I have went to Paris", errorIndex: 2, correctWord: "been/gone", explanation: "Have + V3: been/gone" },
        { sentence: "She is more tall", errorIndex: 3, correctWord: "taller", explanation: "Короткие: -er (taller)" },
        { sentence: "He has already finish", errorIndex: 3, correctWord: "finished", explanation: "Has + V3: finished" },
        { sentence: "This is the most big", errorIndex: 3, correctWord: "biggest", explanation: "Короткие: -est (biggest)" },
        { sentence: "They have just arrive", errorIndex: 3, correctWord: "arrived", explanation: "Have + V3: arrived" },
      ],
      6: [ // Intermediate - Past Perfect, Future
        { sentence: "Before I arrived they have left", errorIndex: 4, correctWord: "had", explanation: "Более раннее: had left" },
        { sentence: "I will to go tomorrow", errorIndex: 2, correctWord: "go", explanation: "Will + base (без to)" },
        { sentence: "She had already eat", errorIndex: 3, correctWord: "eaten", explanation: "Had + V3: eaten" },
        { sentence: "He is go to leave", errorIndex: 2, correctWord: "going", explanation: "Be going to: is going" },
        { sentence: "They will going tomorrow", errorIndex: 2, correctWord: "go", explanation: "Will + go (не going)" },
      ],
      7: [ // Intermediate+ - Модальные, условные
        { sentence: "She cans speak English", errorIndex: 1, correctWord: "can", explanation: "Can (не cans)" },
        { sentence: "You must to study", errorIndex: 2, correctWord: "study", explanation: "Must + base (без to)" },
        { sentence: "If it will rain tomorrow", errorIndex: 2, correctWord: "rains", explanation: "Условие: Present Simple" },
        { sentence: "If I was rich", errorIndex: 2, correctWord: "were", explanation: "Second Conditional: were" },
        { sentence: "He shoulds go home", errorIndex: 1, correctWord: "should", explanation: "Should (не shoulds)" },
      ],
      8: [ // Upper-Intermediate - Пассив, фразовые
        { sentence: "The book was wrote", errorIndex: 3, correctWord: "written", explanation: "Was + V3: written" },
        { sentence: "English is spoke here", errorIndex: 3, correctWord: "spoken", explanation: "Is + V3: spoken" },
        { sentence: "It will be finish", errorIndex: 3, correctWord: "finished", explanation: "Will be + V3" },
        { sentence: "The house is building", errorIndex: 3, correctWord: "being built", explanation: "Continuous Passive: being built" },
        { sentence: "I look forward for it", errorIndex: 3, correctWord: "to", explanation: "Look forward to (не for)" },
      ],
      9: [ // Advanced - Косвенная речь
        { sentence: "She said she is tired", errorIndex: 3, correctWord: "was", explanation: "Согласование времен: was" },
        { sentence: "He told he will come", errorIndex: 2, correctWord: "me he would", explanation: "Told + объект; will → would" },
        { sentence: "She asked if can I", errorIndex: 3, correctWord: "I could", explanation: "Can → could (порядок слов)" },
        { sentence: "He said me that", errorIndex: 1, correctWord: "told", explanation: "Told me (не said me)" },
        { sentence: "She asked where is he", errorIndex: 3, correctWord: "he was", explanation: "Порядок: where he was" },
      ],
      10: [ // Proficiency - Сложные структуры
        { sentence: "Because I was tired so left", errorIndex: 4, correctWord: "(убрать so)", explanation: "Because... (без so)" },
        { sentence: "Although it rained but went", errorIndex: 3, correctWord: "(убрать but)", explanation: "Although... (без but)" },
        { sentence: "It will have complete", errorIndex: 3, correctWord: "been completed", explanation: "Will have been + V3" },
        { sentence: "She suggested me to go", errorIndex: 2, correctWord: "that I go", explanation: "Suggest + (that) + subject + base" },
        { sentence: "Not only he came but also", errorIndex: 2, correctWord: "did he come", explanation: "Инверсия: did he come" },
      ],
    };
    
    return questionsByLevel[level] || questionsByLevel[1];
  };

  const handleWordClick = (index: number) => {
    if (showResult) return;
    setSelectedWordIndex(index);
  };

  const handleCheck = () => {
    if (selectedWordIndex === null) return;

    const isCorrect = selectedWordIndex === questions[currentQuestion].errorIndex;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedWordIndex(null);
      setShowResult(false);
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedWordIndex(null);
    setShowResult(false);
    setGameFinished(false);
    setResultSaved(false);
    startTimeRef.current = Date.now();
  };

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 text-center">
          <p>Загрузка...</p>
        </div>
      </Layout>
    );
  }

  if (gameFinished) {
    const percentage = Math.round((score / questions.length) * 100);
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
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Игра завершена!
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
  const words = question.sentence.split(' ');
  const isCorrect = selectedWordIndex === question.errorIndex;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <button
          onClick={() => navigate('/games')}
          className="btn-secondary mb-4 sm:mb-6 flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к играм
        </button>

        <div className="card p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
              Grammar Detective
            </h1>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Вопрос {currentQuestion + 1} / {questions.length}
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

        {/* Question */}
        <div className="card p-4 sm:p-8">
          <h2 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
            Найди ошибку в предложении:
          </h2>

          {/* Sentence with clickable words */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8 text-base sm:text-2xl">
            {words.map((word, index) => (
              <button
                key={index}
                onClick={() => handleWordClick(index)}
                disabled={showResult}
                className={`px-2 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-xl ${
                  selectedWordIndex === index
                    ? showResult
                      ? isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : showResult && index === question.errorIndex
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {word}
              </button>
            ))}
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
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                <strong>Правильно:</strong> {question.correctWord}
              </p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 sm:gap-4 justify-center">
            {!showResult ? (
              <button
                onClick={handleCheck}
                disabled={selectedWordIndex === null}
                className="btn-primary disabled:opacity-50 text-sm sm:text-base"
              >
                Проверить
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary text-sm sm:text-base">
                {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Завершить'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GrammarDetective;

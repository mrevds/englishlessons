import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Trophy, ArrowLeft, Clock } from 'lucide-react';
import { gamesAPI } from '../../api/games';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizShow: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const levelParam = searchParams.get('level');
  const level = levelParam !== null ? Number(levelParam) : 0;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [answerTime, setAnswerTime] = useState<number>(0);
  const [resultSaved, setResultSaved] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  // Сохраняем результат игры
  useEffect(() => {
    if (gameFinished && !resultSaved && questions.length > 0) {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      
      gamesAPI.submitResult({
        game_type: 'quiz-show',
        level,
        score,
        max_score: questions.length,
        time_spent: timeSpent,
        correct_count: score,
        total_count: questions.length,
      }).then(() => {
        setResultSaved(true);
      }).catch(console.error);
    }
  }, [gameFinished, resultSaved, questions.length, score, level]);

  useEffect(() => {
    const generatedQuestions = generateQuestions(level);
    setQuestions(generatedQuestions);
  }, [level]);

  useEffect(() => {
    if (isTimerActive && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeout();
    }
  }, [timeLeft, isTimerActive, showResult]);

  const generateQuestions = (level: number): Question[] => {
    if (level === 1) { // Countable/Uncountable
      return [
        { question: 'Какое слово НЕ используется с исчисляемыми существительными?', options: ['many', 'much', 'a few', 'several'], correctAnswer: 1, explanation: '"Much" используется только с неисчисляемыми существительными.' },
        { question: 'Выберите правильный вариант: "I need ___ advice"', options: ['a', 'an', 'some', 'many'], correctAnswer: 2, explanation: 'Advice - неисчисляемое существительное, используем "some".' },
        { question: 'Как спросить о количестве воды?', options: ['How many water?', 'How much water?', 'How water?', 'How a water?'], correctAnswer: 1, explanation: 'Water - неисчисляемое, используем "How much".' },
        { question: 'Какое слово всегда единственного числа?', options: ['books', 'information', 'cars', 'apples'], correctAnswer: 1, explanation: 'Information - неисчисляемое существительное, всегда единственное число.' },
        { question: 'Выберите правильный вариант: "The furniture ___ expensive"', options: ['are', 'is', 'were', 'be'], correctAnswer: 1, explanation: 'Furniture - неисчисляемое, используется глагол в единственном числе.' },
        { question: 'С каким существительным используется "a few"?', options: ['water', 'money', 'friends', 'advice'], correctAnswer: 2, explanation: '"A few" используется только с исчисляемыми существительными во множественном числе.' },
        { question: 'Как правильно сказать "один совет"?', options: ['an advice', 'one advice', 'a piece of advice', 'an advices'], correctAnswer: 2, explanation: 'Advice неисчисляемое, используем "a piece of advice".' },
        { question: 'Какое слово можно посчитать?', options: ['luggage', 'furniture', 'apple', 'information'], correctAnswer: 2, explanation: 'Apple - исчисляемое: one apple, two apples.' },
      ];
    } else if (level === 2) { // Singular/Plural
      return [
        { question: 'Какая форма множественного числа у "child"?', options: ['childs', 'children', 'childrens', 'childs\''], correctAnswer: 1, explanation: 'Child - нерегулярное существительное: child → children.' },
        { question: 'Как образуется множественное число у слов на -s, -sh, -ch, -x?', options: ['добавляем -s', 'добавляем -es', 'ничего не добавляем', 'меняем окончание'], correctAnswer: 1, explanation: 'После шипящих добавляем -es: box → boxes, dish → dishes.' },
        { question: 'Какое слово не меняется во множественном числе?', options: ['cat', 'dog', 'sheep', 'book'], correctAnswer: 2, explanation: 'Sheep не изменяется: one sheep, two sheep.' },
        { question: 'Множественное число "man"?', options: ['mans', 'men', 'mens', 'man'], correctAnswer: 1, explanation: 'Man - нерегулярное: man → men.' },
        { question: 'Как правильно: "tomato" во множественном числе?', options: ['tomatos', 'tomatoes', 'tomatos\'', 'tomatoe'], correctAnswer: 1, explanation: 'После -o добавляем -es: tomato → tomatoes.' },
        { question: 'Множественное число "mouse"?', options: ['mouses', 'mices', 'mice', 'mouse'], correctAnswer: 2, explanation: 'Mouse - нерегулярное: mouse → mice.' },
        { question: 'Как образуется множественное число у "tooth"?', options: ['tooths', 'teeth', 'teeths', 'tooth'], correctAnswer: 1, explanation: 'Tooth - нерегулярное: tooth → teeth.' },
        { question: 'Что добавляем к словам на согласную + y?', options: ['-s', '-es', '-ies', 'ничего'], correctAnswer: 2, explanation: 'Y меняется на -ies: baby → babies, city → cities.' },
      ];
    } else if (level === 3) { // Articles
      return [
        { question: 'Какой артикль используется перед гласными звуками?', options: ['a', 'an', 'the', 'не используется'], correctAnswer: 1, explanation: '"An" используется перед гласными звуками: an apple, an hour.' },
        { question: 'Выберите правильный вариант: "___ sun is bright"', options: ['A', 'An', 'The', '-'], correctAnswer: 2, explanation: 'Уникальные объекты используются с "the": the sun, the moon.' },
        { question: 'С каким артиклем используются профессии?', options: ['a/an', 'the', 'без артикля', 'any'], correctAnswer: 0, explanation: 'Профессии используются с a/an: She is a doctor.' },
        { question: 'Выберите правильный вариант: "I play ___ piano"', options: ['a', 'an', 'the', '-'], correctAnswer: 2, explanation: 'Музыкальные инструменты используются с "the": play the piano.' },
        { question: 'С каким артиклем используется превосходная степень?', options: ['a', 'an', 'the', 'без артикля'], correctAnswer: 2, explanation: 'Превосходная степень всегда с "the": the best, the biggest.' },
        { question: 'Выберите правильный вариант: "I love ___ music"', options: ['a', 'an', 'the', '-'], correctAnswer: 3, explanation: 'Абстрактные понятия в общем смысле без артикля: love music.' },
        { question: 'Какой артикль перед "unique"?', options: ['a', 'an', 'the', '-'], correctAnswer: 0, explanation: 'Unique начинается с согласного звука [j], поэтому используем "a unique".' },
        { question: 'Выберите правильный вариант: "He is ___ engineer"', options: ['a', 'an', 'the', '-'], correctAnswer: 1, explanation: 'Engineer начинается с гласного звука, используем "an".' },
      ];
    } else if (level === 4) { // Present Simple
      return [
        { question: 'Какое окончание добавляется к глаголу с he/she/it?', options: ['-ing', '-s/-es', '-ed', '-d'], correctAnswer: 1, explanation: 'В Present Simple с he/she/it добавляем -s/-es: he goes, she plays.' },
        { question: 'Выберите правильный вариант: "She ___ to school"', options: ['go', 'goes', 'going', 'went'], correctAnswer: 1, explanation: 'С she используем goes (добавляем -es).' },
        { question: 'Какой вспомогательный глагол с he/she/it в вопросах?', options: ['do', 'does', 'is', 'are'], correctAnswer: 1, explanation: 'В вопросах с he/she/it используем does: Does he like...?' },
        { question: 'Где ставится наречие частоты (always, often)?', options: ['в начале', 'перед основным глаголом', 'в конце', 'после объекта'], correctAnswer: 1, explanation: 'Наречия частоты ставятся перед основным глаголом: I always play.' },
        { question: 'Выберите правильный вариант: "They ___ football"', options: ['plays', 'play', 'playing', 'played'], correctAnswer: 1, explanation: 'С they используется базовая форма без -s: they play.' },
        { question: 'Какое отрицание используется с I/you/we/they?', options: ['doesn\'t', 'don\'t', 'isn\'t', 'aren\'t'], correctAnswer: 1, explanation: 'С I/you/we/they используем don\'t: I don\'t like.' },
        { question: 'После "does" глагол в какой форме?', options: ['с -s', 'базовой', 'с -ing', 'с -ed'], correctAnswer: 1, explanation: 'После does глагол в базовой форме: Does he play (не plays)?' },
        { question: 'Для каких действий используется Present Simple?', options: ['сейчас', 'регулярных/привычных', 'в прошлом', 'в будущем'], correctAnswer: 1, explanation: 'Present Simple для регулярных, привычных действий и фактов.' },
      ];
    } else if (level === 5) { // Present Continuous
      return [
        { question: 'Как образуется Present Continuous?', options: ['am/is/are + V-ing', 'do/does + V', 'V2', 'will + V'], correctAnswer: 0, explanation: 'Present Continuous: am/is/are + глагол с окончанием -ing.' },
        { question: 'Выберите правильный вариант: "She ___ dinner now"', options: ['cook', 'cooks', 'is cooking', 'cooked'], correctAnswer: 2, explanation: 'Действие происходит сейчас, используем is cooking.' },
        { question: 'Какое слово указывает на Present Continuous?', options: ['every day', 'usually', 'now', 'yesterday'], correctAnswer: 2, explanation: '"Now" указывает на действие в данный момент - Present Continuous.' },
        { question: 'Как образуется -ing у глагола "run"?', options: ['runing', 'running', 'runying', 'runn'], correctAnswer: 1, explanation: 'Run удваивает согласную: run → running.' },
        { question: 'Выберите правильный вариант: "They ___ football"', options: ['play', 'plays', 'are playing', 'played'], correctAnswer: 2, explanation: 'Для действия в данный момент: are playing.' },
        { question: 'Что происходит с -e в конце глагола при добавлении -ing?', options: ['остаётся', 'отбрасывается', 'удваивается', 'меняется на -y'], correctAnswer: 1, explanation: 'Конечная -e отбрасывается: make → making, write → writing.' },
        { question: 'Какой вспомогательный глагол с "I" в Present Continuous?', options: ['am', 'is', 'are', 'do'], correctAnswer: 0, explanation: 'С I используется am: I am reading.' },
        { question: 'Для каких действий НЕ используется Present Continuous?', options: ['сейчас', 'в данный момент', 'привычные действия', 'временные ситуации'], correctAnswer: 2, explanation: 'Present Continuous НЕ используется для привычных действий (для них Present Simple).' },
      ];
    } else {
      return [
        { question: 'Какое время используется для действий, происходящих сейчас?', options: ['Present Simple', 'Present Continuous', 'Past Simple', 'Future Simple'], correctAnswer: 1, explanation: 'Present Continuous (am/is/are + V-ing) используется для действий сейчас.' },
        { question: 'Выберите правильную форму: "She ___ to school every day"', options: ['go', 'goes', 'going', 'went'], correctAnswer: 1, explanation: 'С he/she/it добавляем -s/-es.' },
        { question: 'Какой артикль перед гласными звуками?', options: ['a', 'an', 'the', 'не используется'], correctAnswer: 1, explanation: '"An" перед гласными звуками.' },
        { question: 'Как образуется сравнительная степень коротких прилагательных?', options: ['more + прилагательное', 'прилагательное + -er', 'the + прилагательное', 'most + прилагательное'], correctAnswer: 1, explanation: 'Короткие прилагательные: -er (big → bigger).' },
        { question: 'Порядок слов: "I ___ football every Sunday"', options: ['always play', 'play always', 'am always play', 'always am play'], correctAnswer: 0, explanation: 'Наречия частоты перед основным глаголом.' },
        { question: 'Время для завершённых действий в прошлом?', options: ['Present Perfect', 'Past Simple', 'Past Continuous', 'Future Perfect'], correctAnswer: 1, explanation: 'Past Simple для завершённых действий в прошлом.' },
        { question: 'Правильная форма: "I have ___ to Paris"', options: ['go', 'went', 'been', 'going'], correctAnswer: 2, explanation: 'После have/has используется V3: been.' },
        { question: 'Предлог с днями недели?', options: ['in', 'at', 'on', 'by'], correctAnswer: 2, explanation: 'С днями недели: "on" (on Monday).' },
      ];
    }
  };

  const handleTimeout = () => {
    setShowResult(true);
    setIsTimerActive(false);
    setAnswerTime(0);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    setIsTimerActive(false);
    const timeTaken = 20 - timeLeft;
    setAnswerTime(timeTaken);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      // Bonus points for quick answers
      const bonusPoints = Math.max(1, Math.floor((20 - timeTaken) / 4));
      setScore(score + bonusPoints);
    }

    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(20);
      setIsTimerActive(true);
      setAnswerTime(0);
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameFinished(false);
    setTimeLeft(20);
    setIsTimerActive(true);
    setAnswerTime(0);
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
    const maxPossibleScore = questions.length * 5;
    const percentage = Math.round((score / maxPossibleScore) * 100);
    
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
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : '💪'}
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Отличная работа!
            </h2>
            <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              {score} очков
            </div>
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
              {percentage}% от максимума
            </p>
            <div className="mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">
                💡 <strong>Совет:</strong> Отвечай быстрее, чтобы получить больше очков!
              </p>
            </div>
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
  const isCorrect = selectedAnswer === question.correctAnswer;
  const pointsEarned = showResult && isCorrect ? Math.max(1, Math.floor((20 - answerTime) / 4)) : 0;

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
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                Quiz Show
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                <span className={`text-lg sm:text-2xl font-bold ${timeLeft <= 5 ? 'text-red-600 animate-pulse' : 'text-gray-900 dark:text-white'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="text-right">
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Очки</div>
                <div className="text-lg sm:text-2xl font-bold text-green-600">{score}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Вопрос {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 sm:h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="card p-4 sm:p-8">
          <h2 className="text-base sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-8 text-center min-h-[60px] sm:min-h-[80px] flex items-center justify-center">
            {question.question}
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:gap-4 mb-4 sm:mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === question.correctAnswer;
              
              let buttonClass = 'btn-secondary p-3 sm:p-6 text-sm sm:text-lg text-left hover:scale-105 transition-transform';
              if (showResult && isSelected && isCorrect) {
                buttonClass = 'bg-green-500 text-white p-3 sm:p-6 text-sm sm:text-lg text-left border-2 sm:border-4 border-green-600';
              } else if (showResult && isSelected && !isCorrect) {
                buttonClass = 'bg-red-500 text-white p-3 sm:p-6 text-sm sm:text-lg text-left border-2 sm:border-4 border-red-600';
              } else if (showResult && isCorrectOption) {
                buttonClass = 'bg-green-500 text-white p-3 sm:p-6 text-sm sm:text-lg text-left border-2 sm:border-4 border-green-600';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <span className="font-bold mr-2 sm:mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={`p-4 sm:p-6 rounded-xl mb-4 sm:mb-6 ${
              selectedAnswer === null || !isCorrect
                ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800'
                : 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800'
            }`}>
              <div className="text-base sm:text-xl font-bold mb-2 sm:mb-3">
                {selectedAnswer === null ? (
                  <span className="text-orange-700 dark:text-orange-400">⏰ Время вышло!</span>
                ) : isCorrect ? (
                  <span className="text-green-700 dark:text-green-400">
                    ✅ Правильно! +{pointsEarned} {pointsEarned === 1 ? 'очко' : 'очков'}
                  </span>
                ) : (
                  <span className="text-red-700 dark:text-red-400">❌ Неправильно</span>
                )}
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-2">
                <strong>Объяснение:</strong> {question.explanation}
              </p>
              {isCorrect && pointsEarned > 1 && (
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  🚀 Бонус за быстрый ответ!
                </p>
              )}
            </div>
          )}

          {showResult && (
            <button onClick={handleNext} className="btn-primary w-full text-base sm:text-xl py-3 sm:py-4">
              {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Показать результаты'}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QuizShow;

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Zap, ArrowLeft, Heart } from 'lucide-react';
import { gamesAPI } from '../../api/games';

interface Question {
  sentence: string;
  correctAnswer: string;
  options: string[];
}

const FillGapRace: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const levelParam = searchParams.get('level');
  const level = levelParam !== null ? Number(levelParam) : 0;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [resultSaved, setResultSaved] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  // Сохраняем результат игры
  useEffect(() => {
    if (gameOver && !resultSaved && questions.length > 0) {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      
      gamesAPI.submitResult({
        game_type: 'fill-gap-race',
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
  }, [gameOver, resultSaved, questions.length, score, level]);

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
        { sentence: 'There is ___ water in the glass', correctAnswer: 'much', options: ['much', 'many', 'a few', 'few'] },
        { sentence: 'I need ___ advice about this', correctAnswer: 'some', options: ['some', 'a', 'an', 'many'] },
        { sentence: 'How ___ apples do you need?', correctAnswer: 'many', options: ['many', 'much', 'lot', 'few'] },
        { sentence: 'She has ___ friends at school', correctAnswer: 'a few', options: ['a few', 'a little', 'much', 'many'] },
        { sentence: 'The ___ is very expensive', correctAnswer: 'furniture', options: ['furniture', 'furnitures', 'a furniture', 'the furnitures'] },
        { sentence: 'I don\'t have ___ time today', correctAnswer: 'much', options: ['much', 'many', 'a few', 'few'] },
        { sentence: 'Can I have ___ sugar?', correctAnswer: 'a little', options: ['a little', 'a few', 'many', 'much'] },
        { sentence: '___ very useful information', correctAnswer: 'This is', options: ['This is', 'These are', 'This are', 'These is'] },
      ];
    } else if (level === 2) { // Singular/Plural
      return [
        { sentence: 'I saw three ___ in the park', correctAnswer: 'children', options: ['children', 'childs', 'childrens', 'child'] },
        { sentence: 'The ___ are very tall', correctAnswer: 'men', options: ['men', 'mans', 'man', 'mens'] },
        { sentence: 'She bought two ___ of bread', correctAnswer: 'loaves', options: ['loaves', 'loafs', 'loaf', 'loafes'] },
        { sentence: 'Many ___ came to the party', correctAnswer: 'people', options: ['people', 'peoples', 'person', 'persons'] },
        { sentence: 'I need to brush my ___', correctAnswer: 'teeth', options: ['teeth', 'tooths', 'tooth', 'teeths'] },
        { sentence: 'The ___ are in the field', correctAnswer: 'sheep', options: ['sheep', 'sheeps', 'sheepes', 'a sheep'] },
        { sentence: 'He has three ___', correctAnswer: 'boxes', options: ['boxes', 'boxs', 'boxies', 'box'] },
        { sentence: 'I saw two ___ in the kitchen', correctAnswer: 'mice', options: ['mice', 'mouses', 'mouse', 'mices'] },
      ];
    } else if (level === 3) { // Articles
      return [
        { sentence: 'I saw ___ elephant at the zoo', correctAnswer: 'an', options: ['an', 'a', 'the', '-'] },
        { sentence: '___ sun is very bright today', correctAnswer: 'The', options: ['The', 'A', 'An', '-'] },
        { sentence: 'She is ___ doctor', correctAnswer: 'a', options: ['a', 'an', 'the', '-'] },
        { sentence: 'I play ___ piano every day', correctAnswer: 'the', options: ['the', 'a', 'an', '-'] },
        { sentence: 'This is ___ best book I\'ve read', correctAnswer: 'the', options: ['the', 'a', 'an', '-'] },
        { sentence: 'I need ___ new phone', correctAnswer: 'a', options: ['a', 'an', 'the', '-'] },
        { sentence: 'He is ___ engineer', correctAnswer: 'an', options: ['an', 'a', 'the', '-'] },
        { sentence: 'I love ___ music', correctAnswer: '-', options: ['-', 'a', 'an', 'the'] },
      ];
    } else if (level === 4) { // Present Simple
      return [
        { sentence: 'She ___ to school every day', correctAnswer: 'goes', options: ['goes', 'go', 'going', 'went'] },
        { sentence: 'He ___ like coffee', correctAnswer: 'doesn\'t', options: ['doesn\'t', 'don\'t', 'isn\'t', 'not'] },
        { sentence: '___ you speak English?', correctAnswer: 'Do', options: ['Do', 'Does', 'Are', 'Is'] },
        { sentence: 'They ___ football every Sunday', correctAnswer: 'play', options: ['play', 'plays', 'playing', 'played'] },
        { sentence: 'My cat ___ milk', correctAnswer: 'loves', options: ['loves', 'love', 'loving', 'loved'] },
        { sentence: 'I ___ to the gym twice a week', correctAnswer: 'go', options: ['go', 'goes', 'going', 'went'] },
        { sentence: 'She ___ very hard', correctAnswer: 'works', options: ['works', 'work', 'working', 'worked'] },
        { sentence: '___ he play tennis?', correctAnswer: 'Does', options: ['Does', 'Do', 'Is', 'Are'] },
      ];
    } else if (level === 5) { // Present Continuous
      return [
        { sentence: 'She ___ dinner right now', correctAnswer: 'is cooking', options: ['is cooking', 'cooks', 'cook', 'cooked'] },
        { sentence: 'They ___ football at the moment', correctAnswer: 'are playing', options: ['are playing', 'play', 'plays', 'played'] },
        { sentence: 'I ___ a book now', correctAnswer: 'am reading', options: ['am reading', 'read', 'reads', 'readed'] },
        { sentence: '___ you watching TV now?', correctAnswer: 'Are', options: ['Are', 'Do', 'Is', 'Does'] },
        { sentence: 'He ___ working today', correctAnswer: 'is not', options: ['is not', 'not', 'doesn\'t', 'don\'t'] },
        { sentence: 'We ___ to music right now', correctAnswer: 'are listening', options: ['are listening', 'listen', 'listens', 'listened'] },
        { sentence: 'She ___ for the bus', correctAnswer: 'is waiting', options: ['is waiting', 'waits', 'wait', 'waited'] },
        { sentence: 'What ___ you doing?', correctAnswer: 'are', options: ['are', 'do', 'is', 'does'] },
      ];
    } else {
      return [
        { sentence: 'I ___ to school every day', correctAnswer: 'go', options: ['go', 'goes', 'going', 'went'] },
        { sentence: 'She ___ very happy today', correctAnswer: 'is', options: ['is', 'are', 'am', 'be'] },
        { sentence: 'They ___ playing football now', correctAnswer: 'are', options: ['are', 'is', 'was', 'were'] },
        { sentence: 'I ___ this film yesterday', correctAnswer: 'watched', options: ['watched', 'watch', 'watching', 'watches'] },
        { sentence: 'He ___ speak English very well', correctAnswer: 'can', options: ['can', 'cans', 'could', 'is'] },
        { sentence: 'We ___ to the park tomorrow', correctAnswer: 'will go', options: ['will go', 'go', 'went', 'goes'] },
        { sentence: 'She has ___ lived here', correctAnswer: 'always', options: ['always', 'never', 'sometimes', 'often'] },
        { sentence: 'This book is ___ than that one', correctAnswer: 'better', options: ['better', 'good', 'best', 'more good'] },
      ];
    }
  };

  const handleTimeout = () => {
    setLives(lives - 1);
    if (lives <= 1) {
      setGameOver(true);
    } else {
      setShowResult(true);
      setSelectedAnswer('TIMEOUT');
      setIsTimerActive(false);
    }
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setIsTimerActive(false);
    const isCorrect = answer === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    } else {
      setLives(lives - 1);
      if (lives <= 1) {
        setGameOver(true);
        return;
      }
    }

    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowResult(false);
      setTimeLeft(15);
      setIsTimerActive(true);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setShowResult(false);
    setSelectedAnswer('');
    setTimeLeft(15);
    setIsTimerActive(true);
    setResultSaved(false);
    startTimeRef.current = Date.now();
  };

  const { t } = useTranslation();

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 text-center">
          <p>{t('games.fillGapRace.loading')}</p>
        </div>
      </Layout>
    );
  }

  if (gameOver) {
    const percentage = Math.round((score / Math.min(currentQuestion + 1, questions.length)) * 100);
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <button
            onClick={() => navigate('/games')}
            className="btn-secondary mb-4 sm:mb-6 flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('games.fillGapRace.backToGames')}
          </button>

          <div className="card p-4 sm:p-8 text-center">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">
              {lives > 0 ? '🎉' : '💔'}
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {lives > 0 ? t('games.fillGapRace.resultTitleWin') : t('games.fillGapRace.resultTitleLose')}
            </h2>
            <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              {score} {lives > 0 ? `/ ${questions.length}` : ''}
            </div>
            {percentage > 0 && (
              <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
                {t('games.fillGapRace.correctPercentage', { percentage })}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button onClick={restartGame} className="btn-primary text-sm sm:text-base">
                {t('games.fillGapRace.playAgain')}
              </button>
              <button onClick={() => navigate('/games')} className="btn-secondary text-sm sm:text-base">
                {t('games.fillGapRace.chooseAnother')}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <button
          onClick={() => navigate('/games')}
          className="btn-secondary mb-4 sm:mb-6 flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('games.fillGapRace.backToGames')}
        </button>

        <div className="card p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {t('games.fillGapRace.title')}
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                <span className="text-lg sm:text-xl font-bold">× {lives}</span>
              </div>
              <div className={`text-lg sm:text-2xl font-bold ${timeLeft <= 5 ? 'text-red-600 animate-pulse' : 'text-gray-900 dark:text-white'}`}>
                {timeLeft}s
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {t('games.fillGapRace.questionCounter', { current: currentQuestion + 1, total: questions.length })}
            </span>
            <span className="text-sm sm:text-lg font-semibold">
              {t('games.fillGapRace.points', { score })}
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 mt-3 sm:mt-4">
            <div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 sm:h-3 rounded-full transition-all duration-300"
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>
        </div>

        <div className="card p-4 sm:p-8">
          <h2 className="text-lg sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-8 text-center leading-relaxed">
            {question.sentence.split('___').map((part: string, i: number, arr: string[]) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="inline-block min-w-[60px] sm:min-w-[120px] border-b-2 sm:border-b-4 border-blue-500 mx-1 sm:mx-2 pb-1">
                    {showResult && (
                      <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {selectedAnswer === 'TIMEOUT' ? '⏰' : selectedAnswer}
                      </span>
                    )}
                  </span>
                )}
              </React.Fragment>
            ))}
          </h2>

          <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
            {question.options.map((option: string, index: number) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === question.correctAnswer;
              
              let buttonClass = 'btn-secondary p-3 sm:p-6 text-sm sm:text-xl';
              if (showResult && isSelected && isCorrect) {
                buttonClass = 'bg-green-500 text-white p-3 sm:p-6 text-sm sm:text-xl border-2 sm:border-4 border-green-600';
              } else if (showResult && isSelected && !isCorrect) {
                buttonClass = 'bg-red-500 text-white p-3 sm:p-6 text-sm sm:text-xl border-2 sm:border-4 border-red-600';
              } else if (showResult && isCorrectOption) {
                buttonClass = 'bg-green-500 text-white p-3 sm:p-6 text-sm sm:text-xl border-2 sm:border-4 border-green-600';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={`p-4 sm:p-6 rounded-xl mb-4 sm:mb-6 text-center ${
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800'
            }`}>
              <div className="text-lg sm:text-2xl font-bold mb-2">
                {selectedAnswer === 'TIMEOUT' ? (
                  <span className="text-orange-700 dark:text-orange-400">{t('games.fillGapRace.timeoutMessage')}</span>
                ) : isCorrect ? (
                  <span className="text-green-700 dark:text-green-400">{t('games.fillGapRace.correctMessage')}</span>
                ) : (
                  <span className="text-red-700 dark:text-red-400">{t('games.fillGapRace.wrongMessage')}</span>
                )}
              </div>
              {!isCorrect && (
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  {t('games.fillGapRace.correctAnswerLabel')} <strong>{question.correctAnswer}</strong>
                </p>
              )}
            </div>
          )}

          {showResult && (
            <button onClick={handleNext} className="btn-primary w-full text-base sm:text-xl py-3 sm:py-4">
              {currentQuestion < questions.length - 1 ? t('games.fillGapRace.nextQuestion') : t('games.fillGapRace.finish')}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FillGapRace;

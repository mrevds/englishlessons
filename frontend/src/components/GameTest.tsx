import React, { useState, useEffect } from 'react';
import { lessonsAPI } from '../api/lessons';
import type { Question, AnswerOption } from '../api/lessons';
import { PartyPopper, Frown, Star, Clock } from 'lucide-react';

interface GameTestProps {
  lessonId: number;
  questions: Question[];
  onComplete: (result: any) => void;
  onClose: () => void;
}

const GameTest: React.FC<GameTestProps> = ({ lessonId, questions, onComplete: _onComplete, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(60 * questions.length); // 60 секунд на вопрос
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [animations] = useState<Record<number, 'correct' | 'wrong' | null>>({});

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      // Автоматически отправляем если время вышло
      if (Object.keys(selectedAnswers).length === questions.length) {
        handleSubmit();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, showResult]);

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // Проверяем что все вопросы отвечены
    if (Object.keys(selectedAnswers).length !== questions.length) {
      return;
    }

    try {
      const result = await lessonsAPI.submitTest({
        lesson_id: lessonId,
        answers: selectedAnswers,
      });
      setResult(result);
      setShowResult(true);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Ошибка отправки теста');
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (showResult && result) {
    const percentage = result.percentage;
    const isPassed = result.is_passed;
    const stars = Math.floor(percentage / 20);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="card max-w-2xl w-full text-center animate-bounce-in max-h-[90vh] overflow-y-auto">
          <div className="mb-4 sm:mb-6">
            <div className="mb-3 sm:mb-4">
              {isPassed ? (
                <PartyPopper className="w-14 h-14 sm:w-20 sm:h-20 text-yellow-500 mx-auto" />
              ) : (
                <Frown className="w-14 h-14 sm:w-20 sm:h-20 text-gray-400 mx-auto" />
              )}
            </div>
            <h2 className="text-xl sm:text-3xl font-bold mb-2">
              {isPassed ? 'Поздравляем!' : 'Попробуйте еще раз'}
            </h2>
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              Ваш результат: {percentage.toFixed(1)}%
            </p>
            <div className="flex justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 sm:w-8 sm:h-8 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full h-3 sm:h-4 mb-3 sm:mb-4">
              <div
                className="bg-white h-full rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Правильных ответов: {result.correct_answers} из {result.total_questions}
            </p>
            {!isPassed && (
              <p className="text-red-600 mt-3 sm:mt-4 font-semibold text-sm sm:text-base">
                Для прохождения нужно набрать минимум 70%
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
            <button onClick={onClose} className="btn-primary">
              Закрыть
            </button>
            {!isPassed && (
              <button
                onClick={() => {
                  setShowResult(false);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                  setTimeLeft(60 * questions.length);
                }}
                className="btn-secondary"
              >
                Попробовать снова
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="card max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-2xl font-bold">
              Вопрос {currentQuestionIndex + 1} из {questions.length}
            </h2>
            <div className="text-lg sm:text-2xl font-bold text-blue-600 flex items-center gap-1 sm:gap-2">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 mb-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 sm:p-6 rounded-xl mb-4 sm:mb-6">
            <h3 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
              {currentQuestion.text}
            </h3>
          </div>

          {/* Answers */}
          <div className="space-y-2 sm:space-y-3">
            {currentQuestion.answer_options.map((option: AnswerOption) => {
              const isSelected = selectedAnswers[currentQuestion.id] === option.id;
              const animation = animations[option.id];

              return (
                <button
                  key={option.id}
                  onClick={() => {
                    handleAnswerSelect(currentQuestion.id, option.id);
                  }}
                  className={`w-full p-3 sm:p-4 rounded-xl text-left transition-all duration-200 transform hover:scale-[1.02] ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500'
                  } ${animation === 'correct' ? 'animate-pulse bg-green-500' : ''} ${
                    animation === 'wrong' ? 'animate-shake bg-red-500' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2 sm:mr-3 text-base sm:text-xl font-semibold">
                      {option.order === 1 ? 'A' : option.order === 2 ? 'B' : option.order === 3 ? 'C' : 'D'}
                    </span>
                    <span className="font-medium text-sm sm:text-base">{option.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-2">
          <button
            onClick={onClose}
            className="btn-secondary text-sm sm:text-base py-2 px-3 sm:py-3 sm:px-6"
            disabled={showResult}
          >
            Отмена
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion.id]}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-2 px-3 sm:py-3 sm:px-6"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Завершить' : 'Далее'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameTest;


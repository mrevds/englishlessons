import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonsAPI } from '../api/lessons';
import type { Lesson } from '../api/lessons';
import { lessonsContent } from '../data/lessonsContent';
import { RenderContent } from '../components/LessonContentBlock';
import GameTest from '../components/GameTest';
import { Loader2, BookOpen, Target, CheckCircle2, ArrowLeft, Lightbulb, Gamepad2 } from 'lucide-react';

const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTest, setShowTest] = useState(false);

  useEffect(() => {
    if (id) {
      loadLesson();
    }
  }, [id]);

  const loadLesson = async () => {
    try {
      const data = await lessonsAPI.getLesson(Number(id));
      setLesson(data);
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert(error.response.data.error);
        navigate('/lessons');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!lesson) {
    return <div>Урок не найден</div>;
  }

  const content = lessonsContent.find((l) => l.id === lesson.id);

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/lessons')}
          className="mb-4 sm:mb-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к урокам
        </button>

        <div className="card mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {lesson.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">{lesson.description}</p>
        </div>

        {content && (
          <div className="card mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              Теория
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Введение</h3>
                <RenderContent content={content.content.introduction} />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Правила</h3>
                <div className="space-y-4">
                  {content.content.rules.map((rule, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <RenderContent content={rule} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Примеры</h3>
                <div className="space-y-2 sm:space-y-3">
                  {content.content.examples.map((example, index) => (
                    <div
                      key={index}
                      className={`p-3 sm:p-4 rounded-xl ${
                        example.highlight 
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 border-2 border-yellow-300 dark:border-yellow-700'
                          : 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'
                      }`}
                    >
                      <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                        {example.icon && <span className="mr-2">{example.icon}</span>}
                        <span dangerouslySetInnerHTML={{ __html: example.sentence.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 italic text-sm sm:text-base mt-1">
                        {example.translation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 p-3 sm:p-4 rounded-xl">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                  Практика
                </h3>
                <RenderContent content={content.content.practice} />
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            Тест
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
            Проверьте свои знания, пройдя тест. Для прохождения нужно набрать минимум 70%.
          </p>
          {lesson.progress && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">
                Лучший результат: <span className="font-bold">{((lesson.progress?.best_percentage) || 0).toFixed(1)}%</span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm flex flex-wrap items-center gap-1">
                Попыток: {lesson.progress.attempts_count}
                {lesson.progress.is_completed && (
                  <span className="ml-2 text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Урок пройден
                  </span>
                )}
              </p>
            </div>
          )}
          <button
            onClick={() => setShowTest(true)}
            className="btn-primary w-full text-base sm:text-xl py-3 sm:py-4 flex items-center justify-center gap-2"
          >
            <Target className="w-4 h-4 sm:w-5 sm:h-5" />
            Начать тест
          </button>
        </div>

        {showTest && lesson.questions && (
          <GameTest
            lessonId={lesson.id}
            questions={lesson.questions}
            onComplete={() => {
              setShowTest(false);
              loadLesson(); // Обновляем данные урока
            }}
            onClose={() => setShowTest(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LessonPage;


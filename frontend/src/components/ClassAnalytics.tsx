import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/client';
import { Loader2 } from 'lucide-react';

interface LessonStat {
  lesson_id: number;
  lesson_title: string;
  lesson_order: number;
  total_students: number;
  completed_count: number;
  completion_rate: number;
  average_percentage: number;
  total_attempts: number;
}

interface ClassAnalyticsData {
  class_info: {
    level: number;
    level_letter: string;
    total_students: number;
  };
  overall_stats: {
    total_points: number;
    completed_lessons: number;
    average_percentage: number;
  };
  lessons_stats: LessonStat[];
}

const ClassAnalytics: React.FC = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<ClassAnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState(user?.level?.toString() || '');
  const [selectedLetter, setSelectedLetter] = useState(user?.level_letter || '');

  useEffect(() => {
    if (selectedLevel) {
      loadAnalytics();
    }
  }, [selectedLevel, selectedLetter]);

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: any = { level: selectedLevel };
      if (selectedLetter) params.level_letter = selectedLetter;
      
      const response = await apiClient.get('/analytics/class', { params });
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error loading analytics:', error);
      setError('Ошибка при загрузке аналитики');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: 'csv' | 'excel') => {
    try {
      const params: any = { format };
      if (selectedLevel) params.level = selectedLevel;
      if (selectedLetter) params.level_letter = selectedLetter;
      
      const response = await apiClient.get('/export/stats', {
        params,
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { 
        type: format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const extension = format === 'csv' ? 'csv' : 'xlsx';
      a.download = `students_stats_${new Date().toISOString().split('T')[0]}.${extension}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(`Error exporting ${format}:`, error);
      alert('Ошибка при экспорте файла');
    }
  };

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-bold">📈 Аналитика класса</h2>
        <div className="flex gap-2">
          <button onClick={() => handleExport('csv')} className="btn-secondary text-xs sm:text-sm py-2 px-3">
            📥 CSV
          </button>
          <button onClick={() => handleExport('excel')} className="btn-primary text-xs sm:text-sm py-2 px-3">
            📥 Excel
          </button>
        </div>
      </div>

      {/* Фильтры */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-1">Класс</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="input-field text-sm"
          >
            <option value="">Выберите класс</option>
            {Array.from({ length: 11 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Буква</label>
          <select
            value={selectedLetter}
            onChange={(e) => setSelectedLetter(e.target.value)}
            className="input-field text-sm"
          >
            <option value="">Все буквы</option>
            {['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З'].map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Контент */}
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : !analytics ? (
        <div className="text-gray-500 text-center py-4">Выберите класс для просмотра аналитики</div>
      ) : (
        <>
          {/* Общая статистика */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl">
              <div className="text-2xl font-bold">{analytics.class_info.total_students}</div>
              <div className="text-blue-100 text-sm">Студентов</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-xl">
              <div className="text-2xl font-bold">{analytics.overall_stats.completed_lessons}</div>
              <div className="text-green-100 text-sm">Пройдено уроков</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-4 rounded-xl">
              <div className="text-2xl font-bold">{((analytics.overall_stats?.average_percentage) || 0).toFixed(1)}%</div>
              <div className="text-yellow-100 text-sm">Средний процент</div>
            </div>
          </div>

          {/* Статистика по урокам */}
          <h3 className="text-xl font-bold mb-4">Статистика по урокам</h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {analytics.lessons_stats && analytics.lessons_stats.length > 0 ? (
              analytics.lessons_stats
                .filter((lesson) => lesson && lesson.lesson_title)
                .map((lesson) => (
                  <div
                    key={lesson.lesson_id}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{lesson.lesson_title || 'Без названия'}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Урок #{lesson.lesson_order || 'N/A'}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{((lesson.completion_rate || 0)).toFixed(1)}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {lesson.completed_count || 0}/{lesson.total_students || 0}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full"
                        style={{ width: `${Math.min(lesson.completion_rate || 0, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Средний %: {((lesson.average_percentage || 0)).toFixed(1)}%</span>
                      <span>Попыток: {lesson.total_attempts || 0}</span>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">Нет данных по урокам</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ClassAnalytics;


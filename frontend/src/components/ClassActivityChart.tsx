import React, { useEffect, useState } from 'react';
import { analyticsAPI } from '../api/users';
import { Loader2, TrendingUp, Calendar } from 'lucide-react';

const ClassActivityChart: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    loadData();
  }, [days]);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await analyticsAPI.getClassActivity(days);
      setData(result);
    } catch (error) {
      console.error('Error loading activity data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!data || !data.stats || data.stats.length === 0) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          Активность классов
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          Нет данных за выбранный период
        </p>
      </div>
    );
  }

  // Группируем данные по классам
  const classData: { [key: string]: { dates: string[]; counts: number[] } } = {};
  data.stats.forEach((stat: any) => {
    const key = stat.class_display || `${stat.level || '?'}-${stat.level_letter || '?'}`;
    if (!classData[key]) {
      classData[key] = { dates: [], counts: [] };
    }
    classData[key].dates.push(stat.date);
    classData[key].counts.push(stat.count);
  });

  const maxCount = Math.max(...data.stats.map((s: any) => s.count), 1);

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          Активность классов
        </h2>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          <select
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="input-field text-xs sm:text-sm py-2 px-3"
          >
            <option value="7">7 дней</option>
            <option value="14">14 дней</option>
            <option value="30">30 дней</option>
            <option value="60">60 дней</option>
            <option value="90">90 дней</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(classData).map(([className, classStats]) => {
          const total = classStats.counts.reduce((a, b) => a + b, 0);
          const avg = total / classStats.counts.length;

          return (
            <div key={className} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{className}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Всего попыток: <span className="font-semibold">{total}</span> • 
                    Среднее: <span className="font-semibold">{avg.toFixed(1)}</span> в день
                  </p>
                </div>
              </div>
              
              {/* Простой график */}
              <div className="flex items-end gap-0.5 sm:gap-1 h-24 sm:h-32 overflow-x-auto pb-6 sm:pb-8">
                {classStats.counts.map((count, index) => {
                  const height = (count / maxCount) * 100;
                  const date = new Date(classStats.dates[index]);
                  const dayLabel = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
                  
                  return (
                    <div key={index} className="flex flex-col items-center flex-shrink-0 min-w-[24px] sm:min-w-[40px]">
                      <div
                        className="w-4 sm:w-8 bg-gradient-to-t from-blue-500 to-purple-600 rounded-t transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
                        style={{ height: `${Math.max(height, 5)}%` }}
                        title={`${dayLabel}: ${count} попыток`}
                      />
                      <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">{count}</span>
                      <span className="text-[8px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1 rotate-45 origin-left whitespace-nowrap">
                        {dayLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Период: {new Date(data.period.start_date).toLocaleDateString('ru-RU')} - {new Date(data.period.end_date).toLocaleDateString('ru-RU')}
      </div>
    </div>
  );
};

export default ClassActivityChart;


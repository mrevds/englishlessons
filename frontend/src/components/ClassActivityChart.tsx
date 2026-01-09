import React, { useEffect, useState } from 'react';
import { analyticsAPI } from '../api/users';
import { Loader2, TrendingUp, Calendar } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

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

  // Готовим данные для recharts: массив объектов по датам, где ключи — классы
  const classNames = Array.from(new Set(data.stats.map((stat: any) => (stat.class_display || `${stat.level || '?'}-${stat.level_letter || '?'}`) as string))) as string[];
  const dateSet = Array.from(new Set(data.stats.map((stat: any) => stat.date as string))) as string[];
  const chartData = dateSet.map(date => {
    const entry: any = { date };
    classNames.forEach(className => {
      const stat = data.stats.find((s: any) => (s.class_display || `${s.level || '?'}-${s.level_letter || '?'}`) === className && s.date === date);
      entry[className] = stat ? stat.count : 0;
    });
    return entry;
  });

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

      <div className="w-full h-[320px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-30} textAnchor="end" interval={0} height={60} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip wrapperClassName="!bg-white dark:!bg-gray-900 !rounded !shadow-lg" />
            <Legend wrapperStyle={{ fontSize: '13px' }} />
            {classNames.map((className, idx) => (
              <Bar
                key={className}
                dataKey={className}
                fill={idx % 2 === 0 ? "#6366f1" : "#a855f7"}
                radius={[8, 8, 0, 0]}
                maxBarSize={40}
                name={className}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Период: {new Date(data.period.start_date).toLocaleDateString('ru-RU')} - {new Date(data.period.end_date).toLocaleDateString('ru-RU')}
      </div>
    </div>
  );
};

export default ClassActivityChart;


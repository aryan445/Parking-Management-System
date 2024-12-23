import React from 'react';
import { Car, Calendar } from 'lucide-react';
import { CarEntry } from '../types/types';
import { calculateMonthlyCarStats } from '../utils/statsCalculator';

interface MonthlyCarStatsProps {
  entries: CarEntry[];
}

export default function MonthlyCarStats({ entries }: MonthlyCarStatsProps) {
  const monthlyStats = calculateMonthlyCarStats(entries);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">
          {currentMonth} - Per Car Statistics
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(monthlyStats).map(([carNumber, stats]) => (
          <div
            key={carNumber}
            className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-5 h-5 text-blue-500" />
              <span className="font-semibold">{carNumber}</span>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Total Days Parked in this Month: {stats.totalDays}</p>
              <p>Total visits of this car: {stats.visits}</p>
            </div>
          </div>
        ))}
      </div>

      {Object.keys(monthlyStats).length === 0 && (
        <div className="text-center py-8 bg-white/80 backdrop-blur-sm rounded-lg">
          <Car className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500">No parking records for this month</p>
        </div>
      )}
    </div>
  );
}

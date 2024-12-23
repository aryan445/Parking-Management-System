import React from 'react';
import { CarEntry } from '../../types/types';
import { calculateDuration, formatDuration } from '../../utils/dateUtils';
import { formatCarNumber } from '../../utils/validation';

interface HistoryTableProps {
  entries: CarEntry[];
}

export default function HistoryTable({ entries }: HistoryTableProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Past Entries</h3>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Car Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Entry Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Exit Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Days
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Visit Count
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry, index) => {
                const duration = calculateDuration(
                  entry.entryTime,
                  entry.exitTime
                );
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {formatCarNumber(entry.carNumber)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(entry.entryTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.exitTime &&
                        new Date(entry.exitTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDuration(duration)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {duration.days}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.visits}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

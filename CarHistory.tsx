import React from 'react';
import { CarEntry } from '../types/types';
import { calculateDuration, formatDuration } from '../utils/dateUtils';
import { LogOut, Car, Clock } from 'lucide-react';
import { formatCarNumber } from '../utils/validation';
import ActiveEntries from './history/ActiveEntries';
import HistoryTable from './history/HistoryTable';

interface CarHistoryProps {
  entries: CarEntry[];
  onExit: (carNumber: string) => void;
}

export default function CarHistory({ entries, onExit }: CarHistoryProps) {
  const activeEntries = entries.filter(entry => !entry.exitTime);
  const historyEntries = entries.filter(entry => entry.exitTime);

  return (
    <div className="space-y-6">
      {activeEntries.length > 0 && (
        <ActiveEntries entries={activeEntries} onExit={onExit} />
      )}

      {historyEntries.length > 0 && (
        <HistoryTable entries={historyEntries} />
      )}
    </div>
  );
}
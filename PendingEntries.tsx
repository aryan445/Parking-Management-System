import React from 'react';
import { Check, X, Clock, CarFront } from 'lucide-react';
import { CarEntry } from '../types/types';

interface PendingEntriesProps {
  entries: [string, CarEntry][];
  onApprove: (carNumber: string) => void;
  onDecline: (carNumber: string) => void;
}

export default function PendingEntries({ entries, onApprove, onDecline }: PendingEntriesProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8 glass-card">
        <CarFront className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p>No pending entries</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {entries.map(([carNumber, entry]) => (
        <div key={carNumber} className="glass-card p-6 animate-fade-in">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CarFront className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-lg">{carNumber}</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Clock className="w-4 h-4" />
                <span>Previous Visits: {entry.visits}</span>
              </div>
              <div className="status-badge bg-yellow-100 text-yellow-800">
                Awaiting Approval
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onApprove(carNumber)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 hover:scale-110"
                title="Approve Entry"
              >
                <Check className="w-6 h-6" />
              </button>
              <button
                onClick={() => onDecline(carNumber)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110"
                title="Decline Entry"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
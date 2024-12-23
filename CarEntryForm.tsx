import React, { useState } from 'react';
import { KeyRound, Plus } from 'lucide-react';
import { validateCarNumber, formatCarNumber } from '../utils/validation';

interface CarEntryFormProps {
  onSubmit: (carNumber: string) => void;
}

export default function CarEntryForm({ onSubmit }: CarEntryFormProps) {
  const [carNumber, setCarNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateCarNumber(carNumber);
    if (validationError) {
      setError(validationError);
      return;
    }

    const formattedNumber = formatCarNumber(carNumber);
    onSubmit(formattedNumber);
    setCarNumber('');
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    const formatted = formatCarNumber(value);
    setCarNumber(formatted);
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="glass-card p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <KeyRound className="text-blue-500 w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">New Vehicle Entry</h3>
        </div>
        <div className="space-y-3">
          <div className="flex gap-3">
            <input
              type="text"
              value={carNumber}
              onChange={handleChange}
              placeholder="Enter Vehicle Number (e.g., MH12DE3456)"
              className={`input-field ${error ? 'border-red-500 focus:ring-red-200' : ''}`}
              style={{ textTransform: 'uppercase' }}
            />
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          {error && (
            <p className="text-sm text-red-500 mt-1">{error}</p>
          )}
        </div>
      </div>
    </form>
  );
}
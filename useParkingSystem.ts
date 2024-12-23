import { useState, useEffect } from 'react';
import { CarEntry, ParkingStats } from '../types/types';
import { getStoredEntries, storeEntries } from '../utils/storage';
import { calculateCarStats } from '../utils/statsCalculator';
import { calculateParkingFees } from '../utils/paymentCalculator';
import { calculateDuration } from '../utils/dateUtils';

export default function useParkingSystem() {
  const [entries, setEntries] = useState<CarEntry[]>(getStoredEntries());
  const [storageError, setStorageError] = useState<boolean>(false);

  useEffect(() => {
    const success = storeEntries(entries);
    setStorageError(!success);
  }, [entries]);

  const handleNewEntry = (carNumber: string) => {
    if (storageError) {
      alert('Storage limit reached. Please contact administrator.');
      return;
    }

    const now = new Date().toISOString();
    const previousVisits = entries.filter(entry => entry.carNumber === carNumber).length;

    setEntries(prev => [...prev, {
      carNumber,
      entryTime: now,
      visits: previousVisits + 1,
      paymentStatus: {
        isPaid: true // Initially paid as no payment is due yet
      }
    }]);
  };

  const handleExit = (carNumber: string) => {
    const now = new Date().toISOString();
    const entry = entries.find(e => e.carNumber === carNumber && !e.exitTime);
    
    if (entry) {
      const duration = calculateDuration(entry.entryTime);
      const fees = calculateParkingFees(duration);
      
      if (fees && (!entry.paymentStatus?.isPaid)) {
        alert('Payment required before exit');
        return;
      }
    }

    setEntries(prev => 
      prev.map(entry => 
        entry.carNumber === carNumber && !entry.exitTime
          ? { ...entry, exitTime: now }
          : entry
      )
    );
  };

  const handlePaymentComplete = (carNumber: string) => {
    setEntries(prev =>
      prev.map(entry =>
        entry.carNumber === carNumber && !entry.exitTime
          ? {
              ...entry,
              paymentStatus: {
                isPaid: true,
                paidAt: new Date().toISOString()
              }
            }
          : entry
      )
    );
  };

  return {
    entries,
    stats: calculateCarStats(entries),
    handleNewEntry,
    handleExit,
    handlePaymentComplete,
    storageError
  };
}
import { CarEntry } from '../types/types';

export const calculateCarStats = (entries: CarEntry[]) => {
  const currentlyParked = entries.filter(entry => !entry.exitTime).length;
  const uniqueCars = new Set(entries.map(entry => entry.carNumber)).size;
  const totalVisits = entries.length;

  // Get current month entries
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyVisits = entries.filter(entry => {
    const entryDate = new Date(entry.entryTime);
    return entryDate >= startOfMonth;
  }).length;

  return {
    currentlyParked,
    totalCars: uniqueCars,
    totalVisits,
    monthlyVisits
  };
};

export const calculateMonthlyCarStats = (entries: CarEntry[]) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  // Group entries by car number
  const carStats = entries.reduce((acc, entry) => {
    const entryDate = new Date(entry.entryTime);
    if (entryDate >= startOfMonth) {
      const exitDate = entry.exitTime ? new Date(entry.exitTime) : new Date();
      const parkingDays = Math.floor((exitDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (!acc[entry.carNumber]) {
        acc[entry.carNumber] = { totalDays: 0, visits: 0 };
      }
      
      acc[entry.carNumber].totalDays += parkingDays;
      acc[entry.carNumber].visits += 1;
    }
    return acc;
  }, {} as Record<string, { totalDays: number; visits: number }>);

  return carStats;
};
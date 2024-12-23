import { DateDuration } from '../types/types';

export const calculateDuration = (entryTime: string, exitTime?: string): DateDuration => {
  const start = new Date(entryTime);
  const end = exitTime ? new Date(exitTime) : new Date();
  const diffInMs = end.getTime() - start.getTime();
  
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes };
};

export const formatDuration = (duration: DateDuration): string => {
  const parts = [];
  if (duration.days > 0) parts.push(`${duration.days} day${duration.days !== 1 ? 's' : ''}`);
  if (duration.hours > 0) parts.push(`${duration.hours} hour${duration.hours !== 1 ? 's' : ''}`);
  if (duration.minutes > 0) parts.push(`${duration.minutes} minute${duration.minutes !== 1 ? 's' : ''}`);
  
  return parts.join(', ') || 'Less than a minute';
};

export const calculateMonthlyParkingDays = (entries: string[]): number => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  let totalDays = 0;
  entries.forEach(entryTime => {
    const entryDate = new Date(entryTime);
    if (entryDate >= startOfMonth) {
      const duration = calculateDuration(entryTime);
      totalDays += duration.days;
    }
  });
  
  return totalDays;
};
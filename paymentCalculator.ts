import { DateDuration, ParkingFees } from '../types/types';

const DAILY_RATE = 100; // 100 rupees per day
const GRACE_PERIOD_DAYS = 5;
const PAYMENT_DUE_DAYS = 7; // Payment due within 7 days

export const calculateParkingFees = (
  duration: DateDuration
): ParkingFees | null => {
  if (duration.days <= GRACE_PERIOD_DAYS) {
    return null;
  }

  const daysToCharge = duration.days - GRACE_PERIOD_DAYS;
  const amount = daysToCharge * DAILY_RATE;

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + PAYMENT_DUE_DAYS);

  return {
    amount,
    daysStayed: duration.days,
    dueDate: dueDate.toISOString(),
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export interface CarEntry {
  carNumber: string;
  entryTime: string;
  exitTime?: string;
  visits: number;
  paymentStatus?: PaymentStatus;
  paymentAmount?: number;
}

export interface ParkingStats {
  totalCars: number;
  currentlyParked: number;
  totalVisits: number;
  monthlyVisits: number;
  monthlyParkingDays: number;
  totalPendingPayments: number;
}

export interface DateDuration {
  days: number;
  hours: number;
  minutes: number;
}

export interface MonthlyCarStat {
  totalDays: number;
  visits: number;
  pendingPayment: number;
}

export interface PaymentStatus {
  isPaid: boolean;
  dueDate?: string;
  paidAt?: string;
}

export interface ParkingFees {
  amount: number;
  daysStayed: number;
  dueDate: string;
}
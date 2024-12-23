import React, { useState } from 'react';
import { CarEntry } from '../../types/types';
import { LogOut, Car, Clock, Calendar, CreditCard } from 'lucide-react';
import { formatCarNumber } from '../../utils/validation';
import { calculateDuration } from '../../utils/dateUtils';
import { calculateParkingFees, formatCurrency } from '../../utils/paymentCalculator';
import PaymentModal from '../PaymentModal';

interface ActiveEntriesProps {
  entries: CarEntry[];
  onExit: (carNumber: string) => void;
  onPaymentComplete: (carNumber: string) => void;
}

export default function ActiveEntries({ entries, onExit, onPaymentComplete }: ActiveEntriesProps) {
  const [selectedPayment, setSelectedPayment] = useState<{
    carNumber: string;
    fees: ReturnType<typeof calculateParkingFees>;
  } | null>(null);

  const handlePaymentClick = (carNumber: string) => {
    const entry = entries.find(e => e.carNumber === carNumber);
    if (!entry) return;

    const duration = calculateDuration(entry.entryTime);
    const fees = calculateParkingFees(duration);
    
    if (fees) {
      setSelectedPayment({ carNumber, fees });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Currently Parked</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {entries.map((entry, index) => {
          const duration = calculateDuration(entry.entryTime);
          const fees = calculateParkingFees(duration);
          
          return (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold">
                      {formatCarNumber(entry.carNumber)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Duration: {duration.days} days
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Total Days This Month: {Math.floor(duration.days)}
                    </div>
                    {fees && (
                      <div className="flex items-center gap-1 text-red-600">
                        <CreditCard className="w-4 h-4" />
                        Payment Due: {formatCurrency(fees.amount)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {fees && (
                    <button
                      onClick={() => handlePaymentClick(entry.carNumber)}
                      className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-600 transition-colors"
                    >
                      <CreditCard className="w-4 h-4" />
                      Pay
                    </button>
                  )}
                  <button
                    onClick={() => onExit(entry.carNumber)}
                    className="bg-gray-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Exit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedPayment && (
        <PaymentModal
          isOpen={true}
          onClose={() => setSelectedPayment(null)}
          fees={selectedPayment.fees}
          carNumber={selectedPayment.carNumber}
          onProcessPayment={() => {
            onPaymentComplete(selectedPayment.carNumber);
            setSelectedPayment(null);
          }}
        />
      )}
    </div>
  );
}
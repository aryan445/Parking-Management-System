import React from 'react';
import { Car, Clock } from 'lucide-react';

export default function Header() {
  return (
    <div className="glass-card p-8 mb-8 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="bg-blue-500 p-3 rounded-lg">
          <Car className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Car Parking System</h1>
          <p className="text-gray-600">Manage your parking entries efficiently</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Clock className="w-5 h-5" />
        <span>{new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
}
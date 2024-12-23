import React from 'react';
import { Car, CarFront, History, CalendarClock, Calendar } from 'lucide-react';
import { ParkingStats as ParkingStatsType } from '../types/types';

interface ParkingStatsProps {
  stats: ParkingStatsType;
}

export default function ParkingStats({ stats }: ParkingStatsProps) {
  const StatCard = ({ icon: Icon, title, value, subtitle }: { icon: any, title: string, value: number | string, subtitle?: string }) => (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const formattedParkingDays = Math.round(stats.monthlyParkingDays * 10) / 10;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        icon={CarFront} 
        title="Currently Parked" 
        value={stats.currentlyParked} 
      />
      <StatCard 
        icon={Car} 
        title="Total Cars" 
        value={stats.totalCars} 
      />
      <StatCard 
        icon={History} 
        title="Total Visits" 
        value={stats.totalVisits} 
      />
      <StatCard 
        icon={Calendar} 
        title={`${currentMonth} Statistics`}
        value={stats.monthlyVisits}
        subtitle={`${formattedParkingDays} total parking days`}
      />
    </div>
  );
}
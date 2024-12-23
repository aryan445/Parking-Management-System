import React from 'react';
import Header from './components/Header';
import Section from './components/Section';
import CarEntryForm from './components/CarEntryForm';
import CarHistory from './components/CarHistory';
import ParkingStats from './components/ParkingStats';
import MonthlyCarStats from './components/MonthlyCarStats';
import useParkingSystem from './hooks/useParkingSystem';

export default function App() {
  const { 
    entries, 
    stats, 
    handleNewEntry, 
    handleExit,
    handlePaymentComplete 
  } = useParkingSystem();

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1601225998165-29d5aae67a6f?auto=format&fit=crop&q=80")',
      }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <Header />
          
          <div className="space-y-8">
            <Section title="Parking Overview">
              <ParkingStats stats={stats} />
            </Section>

            <Section title="Monthly Car Statistics">
              <MonthlyCarStats entries={entries} />
            </Section>

            <Section title="New Entry">
              <CarEntryForm onSubmit={handleNewEntry} />
            </Section>

            <Section title="Parking History">
              <CarHistory 
                entries={entries}
                onExit={handleExit}
                onPaymentComplete={handlePaymentComplete}
              />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
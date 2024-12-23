import { CarEntry } from '../types/types';

const STORAGE_KEY = 'parkingEntries';
const MAX_ENTRIES = 10000; // Limit to 10,000 entries
const RETENTION_DAYS = 90; // Keep 90 days of history

export const getStoredEntries = (): CarEntry[] => {
  const entries = localStorage.getItem(STORAGE_KEY);
  if (!entries) return [];
  
  const parsedEntries = JSON.parse(entries);
  return cleanupOldEntries(parsedEntries);
};

export const storeEntries = (entries: CarEntry[]) => {
  try {
    const cleanedEntries = cleanupOldEntries(entries);
    const limitedEntries = limitEntries(cleanedEntries);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedEntries));
    return true;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
};

// Clean entries older than RETENTION_DAYS
const cleanupOldEntries = (entries: CarEntry[]): CarEntry[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS);
  
  return entries.filter(entry => {
    const entryDate = new Date(entry.entryTime);
    return entryDate >= cutoffDate;
  });
};

// Limit to MAX_ENTRIES, keeping most recent
const limitEntries = (entries: CarEntry[]): CarEntry[] => {
  if (entries.length <= MAX_ENTRIES) return entries;
  
  return entries
    .sort((a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime())
    .slice(0, MAX_ENTRIES);
};
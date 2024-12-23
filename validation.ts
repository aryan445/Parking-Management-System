export const validateCarNumber = (input: string): string | null => {
  const formatted = input.replace(/\s+/g, '').toUpperCase();
  
  if (!formatted) {
    return 'Car number is required';
  }

  if (!/^[A-Z0-9]+$/.test(formatted)) {
    return 'Only letters and numbers are allowed';
  }

  return null;
};

export const formatCarNumber = (input: string): string => {
  // Remove all spaces and convert to uppercase
  const clean = input.replace(/\s+/g, '').toUpperCase();
  
  // Format based on common patterns (e.g., MH12DE3456)
  if (clean.length <= 2) return clean; // State code
  if (clean.length <= 4) return `${clean.slice(0, 2)} ${clean.slice(2)}`; // State + district
  if (clean.length <= 6) return `${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(4)}`; // Add series
  return `${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(4, 6)} ${clean.slice(6)}`;
};
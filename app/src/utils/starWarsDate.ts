/**
 * Star Wars Date System Utilities
 * BBY = Before the Battle of Yavin
 * ABY = After the Battle of Yavin
 * Battle of Yavin = Year 0
 */

export interface StarWarsDate {
  year: number;
  era: 'BBY' | 'ABY';
}

/**
 * Parse a Star Wars date string (e.g., "19BBY", "34ABY", "19.5BBY")
 */
export function parseStarWarsDate(dateStr: string): StarWarsDate | null {
  if (!dateStr || dateStr === 'unknown') {
    return null;
  }

  const match = dateStr.match(/^([\d.]+)(BBY|ABY)$/i);
  if (!match) {
    return null;
  }

  const year = parseFloat(match[1]);
  const era = match[2].toUpperCase() as 'BBY' | 'ABY';

  return { year, era };
}

/**
 * Convert Star Wars date to a single number for calculations
 * BBY dates are negative, ABY dates are positive
 */
export function dateToNumber(date: StarWarsDate): number {
  return date.era === 'BBY' ? -date.year : date.year;
}

/**
 * Convert a number back to Star Wars date format
 */
export function numberToDate(num: number): StarWarsDate {
  if (num < 0) {
    return { year: Math.abs(num), era: 'BBY' };
  }
  return { year: num, era: 'ABY' };
}

/**
 * Calculate age based on birth date and current date in Star Wars calendar
 * @param birthDateStr - Birth date string (e.g., "19BBY", "unknown")
 * @param currentDateStr - Current date string (e.g., "34ABY")
 * @returns Age in years or null if dates are invalid
 */
export function calculateAge(
  birthDateStr: string,
  currentDateStr: string
): number | null {
  const birthDate = parseStarWarsDate(birthDateStr);
  const currentDate = parseStarWarsDate(currentDateStr);

  if (!birthDate || !currentDate) {
    return null;
  }

  const birthNum = dateToNumber(birthDate);
  const currentNum = dateToNumber(currentDate);

  return currentNum - birthNum;
}

/**
 * Format a Star Wars date for display
 */
export function formatStarWarsDate(date: StarWarsDate): string {
  return `${date.year}${date.era}`;
}

/**
 * Get a human-readable age string
 */
export function getAgeDisplay(
  birthDateStr: string,
  currentDateStr: string
): string {
  if (birthDateStr === 'unknown') {
    return 'Age unknown';
  }

  const age = calculateAge(birthDateStr, currentDateStr);
  if (age === null) {
    return 'Invalid date';
  }

  return `${age} years old`;
}

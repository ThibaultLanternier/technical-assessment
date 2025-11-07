import axios from 'axios';
import { SWAPICharacter } from '@/types';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

export interface SWAPIPlanet {
  name: string;
  url: string;
}

export interface SWAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SWAPICharacter[];
}

/**
 * Fetch all characters from SWAPI
 */
export async function fetchAllCharacters(): Promise<SWAPICharacter[]> {
  const characters: SWAPICharacter[] = [];
  let url: string | null = `${SWAPI_BASE_URL}/people/`;

  while (url) {
    try {
      const response = await axios.get<SWAPIResponse>(url);
      characters.push(...response.data.results);
      url = response.data.next;
    } catch (error) {
      console.error('Error fetching characters from SWAPI:', error);
      throw error;
    }
  }

  return characters;
}

/**
 * Fetch a single character by ID from SWAPI
 */
export async function fetchCharacter(id: number): Promise<SWAPICharacter> {
  try {
    const response = await axios.get<SWAPICharacter>(
      `${SWAPI_BASE_URL}/people/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching character ${id} from SWAPI:`, error);
    throw error;
  }
}

/**
 * Fetch planet details from SWAPI
 */
export async function fetchPlanet(url: string): Promise<string> {
  try {
    const response = await axios.get<SWAPIPlanet>(url);
    return response.data.name;
  } catch (error) {
    console.error('Error fetching planet from SWAPI:', error);
    return 'Unknown';
  }
}

/**
 * Extract character ID from SWAPI URL
 */
export function extractIdFromUrl(url: string): number {
  const match = url.match(/\/people\/(\d+)\//);
  return match ? parseInt(match[1], 10) : 0;
}

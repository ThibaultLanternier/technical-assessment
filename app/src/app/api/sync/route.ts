import { NextRequest, NextResponse } from 'next/server';
import { fetchAllCharacters } from '@/services/swapiService';
import { saveCharacter } from '@/services/characterService';

/**
 * POST /api/sync
 * Sync all characters from SWAPI to the database
 */
export async function POST(request: NextRequest) {
  try {
    console.log('Starting SWAPI sync...');
    const characters = await fetchAllCharacters();
    
    console.log(`Fetched ${characters.length} characters from SWAPI`);
    
    const savedCharacters = [];
    for (const character of characters) {
      const saved = await saveCharacter(character);
      savedCharacters.push(saved);
    }

    return NextResponse.json({
      message: 'Sync completed successfully',
      count: savedCharacters.length,
      characters: savedCharacters,
    });
  } catch (error) {
    console.error('Error syncing characters:', error);
    return NextResponse.json(
      { error: 'Failed to sync characters' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { searchCharacters, getAllCharacters } from '@/services/characterService';

/**
 * GET /api/characters
 * Search or get all characters
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name') || undefined;
    const gender = searchParams.get('gender') || undefined;
    const homeworld = searchParams.get('homeworld') || undefined;

    let characters;
    if (name || gender || homeworld) {
      characters = await searchCharacters({ name, gender, homeworld });
    } else {
      characters = await getAllCharacters();
    }

    return NextResponse.json({ characters });
  } catch (error) {
    console.error('Error fetching characters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch characters' },
      { status: 500 }
    );
  }
}

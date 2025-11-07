import { NextRequest, NextResponse } from 'next/server';
import { getCharacterById } from '@/services/characterService';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/characters/[id]
 * Get a single character by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id, 10);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid character ID' },
        { status: 400 }
      );
    }

    const character = await getCharacterById(id);

    if (!character) {
      return NextResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ character });
  } catch (error) {
    console.error('Error fetching character:', error);
    return NextResponse.json(
      { error: 'Failed to fetch character' },
      { status: 500 }
    );
  }
}

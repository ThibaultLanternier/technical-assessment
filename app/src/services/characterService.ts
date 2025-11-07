import pool from '@/db/connection';
import { Character, CharacterSearchParams } from '@/types';
import { fetchPlanet, extractIdFromUrl } from './swapiService';
import type { SWAPICharacter } from '@/types';

/**
 * Save or update a character in the database
 */
export async function saveCharacter(
  swapiCharacter: SWAPICharacter
): Promise<Character> {
  const client = await pool.connect();
  
  try {
    const swapiId = extractIdFromUrl(swapiCharacter.url);
    const homeworld = await fetchPlanet(swapiCharacter.homeworld);

    const query = `
      INSERT INTO characters (
        swapi_id, name, birth_year, gender, homeworld, homeworld_url,
        height, mass, hair_color, skin_color, eye_color, swapi_url
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (swapi_id)
      DO UPDATE SET
        name = EXCLUDED.name,
        birth_year = EXCLUDED.birth_year,
        gender = EXCLUDED.gender,
        homeworld = EXCLUDED.homeworld,
        homeworld_url = EXCLUDED.homeworld_url,
        height = EXCLUDED.height,
        mass = EXCLUDED.mass,
        hair_color = EXCLUDED.hair_color,
        skin_color = EXCLUDED.skin_color,
        eye_color = EXCLUDED.eye_color,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;

    const values = [
      swapiId,
      swapiCharacter.name,
      swapiCharacter.birth_year,
      swapiCharacter.gender,
      homeworld,
      swapiCharacter.homeworld,
      swapiCharacter.height,
      swapiCharacter.mass,
      swapiCharacter.hair_color,
      swapiCharacter.skin_color,
      swapiCharacter.eye_color,
      swapiCharacter.url,
    ];

    const result = await client.query<Character>(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
}

/**
 * Search characters in the database
 */
export async function searchCharacters(
  params: CharacterSearchParams
): Promise<Character[]> {
  const client = await pool.connect();

  try {
    let query = 'SELECT * FROM characters WHERE 1=1';
    const values: any[] = [];
    let paramIndex = 1;

    if (params.name) {
      query += ` AND name ILIKE $${paramIndex}`;
      values.push(`%${params.name}%`);
      paramIndex++;
    }

    if (params.gender) {
      query += ` AND gender ILIKE $${paramIndex}`;
      values.push(`%${params.gender}%`);
      paramIndex++;
    }

    if (params.homeworld) {
      query += ` AND homeworld ILIKE $${paramIndex}`;
      values.push(`%${params.homeworld}%`);
      paramIndex++;
    }

    query += ' ORDER BY name';

    const result = await client.query<Character>(query, values);
    return result.rows;
  } finally {
    client.release();
  }
}

/**
 * Get all characters from the database
 */
export async function getAllCharacters(): Promise<Character[]> {
  const client = await pool.connect();

  try {
    const result = await client.query<Character>(
      'SELECT * FROM characters ORDER BY name'
    );
    return result.rows;
  } finally {
    client.release();
  }
}

/**
 * Get a single character by ID
 */
export async function getCharacterById(id: number): Promise<Character | null> {
  const client = await pool.connect();

  try {
    const result = await client.query<Character>(
      'SELECT * FROM characters WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

/**
 * Update character image URL
 */
export async function updateCharacterImage(
  id: number,
  imageUrl: string
): Promise<Character | null> {
  const client = await pool.connect();

  try {
    const result = await client.query<Character>(
      `UPDATE characters 
       SET image_url = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING *`,
      [imageUrl, id]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

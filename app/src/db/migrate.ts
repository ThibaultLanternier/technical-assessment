import pool from './connection';

const createTablesSQL = `
  CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    swapi_id INTEGER UNIQUE,
    name VARCHAR(255) NOT NULL,
    birth_year VARCHAR(50),
    gender VARCHAR(50),
    homeworld VARCHAR(255),
    homeworld_url VARCHAR(500),
    image_url TEXT,
    height VARCHAR(50),
    mass VARCHAR(50),
    hair_color VARCHAR(100),
    skin_color VARCHAR(100),
    eye_color VARCHAR(100),
    swapi_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_characters_name ON characters(name);
  CREATE INDEX IF NOT EXISTS idx_characters_gender ON characters(gender);
  CREATE INDEX IF NOT EXISTS idx_characters_homeworld ON characters(homeworld);
`;

export async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(createTablesSQL);
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  } finally {
    client.release();
  }
}


migrate()
  .then(() => {
    console.log('Migration completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });

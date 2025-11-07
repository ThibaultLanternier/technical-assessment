# Star Wars Character Search Application

A full-stack TypeScript application for searching and managing Star Wars characters. Data is fetched from the [Star Wars API (SWAPI)](https://swapi.dev/) and stored in a PostgreSQL database. Features include character search by name, gender, and homeworld, image uploads, and age calculation using the Star Wars date system (BBY/ABY).

## Features

- 🔍 **Search Characters**: Search by name, gender, and homeworld
- 🌌 **SWAPI Integration**: Fetch all characters from the Star Wars API
- 📅 **Age Calculator**: Calculate character ages using the BBY/ABY (Before/After Battle of Yavin) date system
- 🖼️ **Image Upload**: Upload and associate images with characters
- 💾 **PostgreSQL Database**: Store character data locally for fast access
- ⚡ **Next.js 14**: Built with the latest Next.js App Router
- 🎨 **Tailwind CSS**: Modern, responsive UI design

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **External API**: SWAPI (https://swapi.dev/)

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd technical-assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   
   Create a new PostgreSQL database:
   ```bash
   psql -U postgres
   CREATE DATABASE starwars;
   \q
   ```

4. **Configure environment variables**
   
   Copy the example environment file and update with your database credentials:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=starwars
   DB_USER=postgres
   DB_PASSWORD=your_password
   ```

5. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

## Usage

1. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at [http://localhost:3000](http://localhost:3000)

2. **Sync characters from SWAPI**
   
   Click the "Sync from SWAPI" button on the homepage to fetch all Star Wars characters from the API and store them in your local database.

3. **Search characters**
   
   Use the search filters to find characters by:
   - Name (e.g., "Luke", "Darth")
   - Gender (Male, Female, N/A, Hermaphrodite)
   - Homeworld (e.g., "Tatooine", "Alderaan")

4. **Calculate ages**
   
   Enter a Star Wars date in the "Current Date" field (e.g., "34ABY" or "19BBY") to see character ages calculated from their birth year.

5. **Upload character images**
   
   Click the camera icon on any character card to upload a custom image.

## Star Wars Date System

The application uses the Star Wars calendar system:
- **BBY**: Before the Battle of Yavin (negative years)
- **ABY**: After the Battle of Yavin (positive years)
- **Year 0**: The Battle of Yavin

Examples:
- `19BBY` - 19 years before the Battle of Yavin (when Anakin became Darth Vader)
- `0BBY/0ABY` - The Battle of Yavin (when the Death Star was destroyed)
- `34ABY` - 34 years after the Battle of Yavin (The Force Awakens era)

## API Endpoints

### `GET /api/characters`
Get all characters or search with query parameters:
- `?name=Luke` - Search by name
- `?gender=male` - Filter by gender
- `?homeworld=Tatooine` - Filter by homeworld

### `GET /api/characters/[id]`
Get a single character by ID

### `POST /api/characters/[id]/upload`
Upload an image for a character (multipart/form-data with `image` field)

### `POST /api/sync`
Sync all characters from SWAPI to the database

## Project Structure

```
technical-assessment/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── characters/    # Character endpoints
│   │   │   └── sync/          # SWAPI sync endpoint
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── CharacterCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SyncButton.tsx
│   │   └── ImageUpload.tsx
│   ├── db/                    # Database configuration
│   │   ├── connection.ts      # PostgreSQL connection
│   │   └── migrate.ts         # Database migrations
│   ├── services/              # Business logic
│   │   ├── swapiService.ts    # SWAPI integration
│   │   └── characterService.ts # Character CRUD
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   └── utils/                 # Utility functions
│       └── starWarsDate.ts    # Date calculations
├── public/
│   └── uploads/               # Uploaded images
├── .env.example               # Environment variables template
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## Database Schema

### `characters` table

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Auto-incrementing ID |
| swapi_id | INTEGER UNIQUE | ID from SWAPI |
| name | VARCHAR(255) | Character name |
| birth_year | VARCHAR(50) | Birth year (BBY/ABY format) |
| gender | VARCHAR(50) | Character gender |
| homeworld | VARCHAR(255) | Planet name |
| homeworld_url | VARCHAR(500) | SWAPI planet URL |
| image_url | TEXT | Path to uploaded image |
| height | VARCHAR(50) | Height in cm |
| mass | VARCHAR(50) | Mass in kg |
| hair_color | VARCHAR(100) | Hair color |
| skin_color | VARCHAR(100) | Skin color |
| eye_color | VARCHAR(100) | Eye color |
| swapi_url | VARCHAR(500) | Original SWAPI URL |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

## Development

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Run linter
```bash
npm run lint
```

## Future Enhancements

- Add character favorites/bookmarks
- Implement pagination for large datasets
- Add filters for species, films, and vehicles
- Include character relationships/connections
- Add unit and integration tests
- Deploy to cloud platform (Vercel, AWS, etc.)
- Add authentication and user accounts

## License

MIT

## Acknowledgments

- Data provided by [SWAPI - The Star Wars API](https://swapi.dev/)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
export interface SWAPICharacter {
  name: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  url: string;
}

export interface Character {
  id: number;
  swapi_id: number;
  name: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  homeworld_url: string;
  image_url?: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  swapi_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface CharacterSearchParams {
  name?: string;
  gender?: string;
  homeworld?: string;
}

export interface AgeCalculation {
  birthYear: string;
  currentDate: string;
  age: number;
  era: 'BBY' | 'ABY';
}

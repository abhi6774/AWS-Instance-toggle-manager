export interface PokemonNameCategory {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
}

export interface PokemonTypeBase {
  HP: number;
  Attack: number;
  Defense: number;
  'Sp. Attack': number;
  'Sp. Defense': number;
  Speed: number;
}

export interface Pokemon {
  id: number;
  name: PokemonNameCategory;
  type: string[];
  base: PokemonTypeBase;
}

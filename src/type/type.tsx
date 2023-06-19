export namespace MyType {
    export interface PokemonType {
      id: number;
      name: string;
      img: string;
      types: {
        name: string;
      }[];
      abilities: {
        name: string;
      }[];
    }
    export interface Pokemon {
      name: string;
      url: string;
    }
    export interface SetPokemon {
      results: Pokemon[];
    }
  }
  
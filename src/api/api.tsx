
import axios from "axios"
import { MyType } from "../type/type"

export const fetchPokemon = async (setPokemon: React.Dispatch<React.SetStateAction<MyType.PokemonType[]>>) => {

    const url = "https://pokeapi.co/api/v2/pokemon?/limit=20"
  
    try {
      const response = await axios.get<MyType.SetPokemon>(url)
      const datas = response.data;
      const results = datas.results;
      const fetches = await Promise.all(
        results.map(async (res) => {
          const fetchRes = await axios.get(res.url)
          return fetchRes.data
        })
      );
  
      const fetchData = fetches.map((pokemon) => {
        const pokemonType = pokemon.types.map(
          (data: { type: { name: string } }) => {
            return {
              name: data.type.name,
            };
          }
        );
  
        const PokeAbility = pokemon.abilities.map(
          (data: { ability: { name: string } }) => {
            return {
              name: data.ability.name,
            };
          }
        );
  
        const PokeStatus = pokemon.stats.map(
          (data: { base_stat: any; stat: { name: any } }) => {
            return {
              base_stat: data.base_stat,
              name: data.stat.name,
            };
          }
        );
  
        return {
          id: pokemon.id,
          name: pokemon.name,
          img: pokemon.sprites.front_default,
          types: pokemonType,
          abilities: PokeAbility,
          stats: PokeStatus,
        };
      });
  
      setPokemon(fetchData)  
      
      console.log(fetchData)
      
    } catch (error) {
      console.log(error)
    }
  }
  
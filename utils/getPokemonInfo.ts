import { Pokemon } from '../interfaces/pokemon-full';
import pokeApi from '../api/pokeApi';




export const getPokemonInfo = async(nameOrId: string) => {

    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ nameOrId }`);
  
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites
    }

}


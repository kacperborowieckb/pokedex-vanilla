import { createPokemonCard } from './createCard.js';
import { container } from './variables.js';
import { currentFirstIndex } from './search.js';

export default function displayPokemons(pokemons) {
  container.innerHTML = '';
  pokemons
    .slice(
      currentFirstIndex,
      currentFirstIndex > pokemons.length ? pokemons.length : currentFirstIndex + 20
    )
    .forEach((pokemon) => {
      createPokemonCard(pokemon);
    });
}

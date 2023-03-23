import displayPokemons from './scripts/display.js';
import './scripts/search.js';
import { container, pokemons, pokemonNumber, url } from './scripts/variables.js';
import { addOptions } from './scripts/addOptions.js';
import './scripts/animation.js';

async function getPokemons() {
  container.innerHTML = '<img src="/img/loading.png" alt="loading icon" class="loading-icon""/>';
  for (let i = 1; i <= pokemonNumber; i++) {
    await fetch(url + `${i}`)
      .then((res) => res.json())
      .then((pokemon) => pokemons.push(pokemon))
      .catch((err) => console.log('Error: ' + err));
  }
  displayPokemons(pokemons);
  addOptions();
}

getPokemons();

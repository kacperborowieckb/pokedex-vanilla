import {
  selectBox,
  searchInput,
  pokemons,
  previousBtn,
  nextBtn,
  pokemonNumber,
  navButtons,
} from './variables.js';
import displayPokemons from './display.js';

export let currentFirstIndex = 0;
export let currentLastIndex = pokemonNumber;

export default function searchPokemon() {
  let value = searchInput.value.trim();
  let arr = pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(value.toLowerCase());
  });
  if (selectBox.value !== 'all') {
    arr = arr.filter((pokemon) => {
      let types = false;
      pokemon.types.forEach((type) => {
        if (type.type.name === selectBox.value) {
          types = true;
        }
      });
      return types;
    });
  }
  currentLastIndex = arr.length;
  prepareButtons();
  displayPokemons(arr);
}

searchInput.addEventListener('keyup', () => {
  currentFirstIndex = 0;
  searchPokemon();
});
selectBox.addEventListener('change', () => {
  currentFirstIndex = 0;
  searchPokemon();
});

navButtons.addEventListener('click', (e) => {
  if (e.target === previousBtn) {
    currentFirstIndex = currentFirstIndex > 0 ? currentFirstIndex - 20 : currentFirstIndex;
  } else if (e.target === nextBtn) {
    currentFirstIndex = currentFirstIndex + 20;
  }
  searchPokemon();
});

function prepareButtons() {
  if (currentFirstIndex === 0) {
    previousBtn.setAttribute('disabled', 'disabled');
    previousBtn.style.opacity = '0.4';
  } else {
    previousBtn.removeAttribute('disabled');
    previousBtn.style.opacity = '1';
  }
  if (currentFirstIndex + 20 > currentLastIndex) {
    nextBtn.setAttribute('disabled', 'disabled');
    nextBtn.style.opacity = '0.4';
  } else {
    nextBtn.removeAttribute('disabled');
    nextBtn.style.opacity = '1';
  }
}

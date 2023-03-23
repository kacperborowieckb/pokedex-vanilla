import { pokemons, selectBox } from './variables.js';

export function addOptions() {
  let allTypes = [];
  pokemons.map((pokemon) => {
    pokemon.types.forEach((type) => {
      if (allTypes.indexOf(type.type.name) === -1) {
        allTypes.push(type.type.name);
      }
    });
  });
  allTypes.forEach((type) => {
    let option = document.createElement('option');
    option.setAttribute('value', type);
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    selectBox.appendChild(option);
  });
}

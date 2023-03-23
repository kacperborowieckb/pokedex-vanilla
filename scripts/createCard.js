import { container } from './variables.js';

export function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
          <p class="id">#${pokemon.id.toString().padStart(3, '0')}</p>
          <div class="img-container">
              <img class="img" src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></img>
          </div> 
          <h2 class="name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <h3 class="type">${pokemon.types
            .map((type) => {
              return `${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}`;
            })
            .join(' ')}</h3>    
           <ul class="stats">
          ${[...new Array(3).keys()]
            .map((item, i) => {
              return `<li>${
                pokemon.stats[i].stat.name.toUpperCase() + ': ' + pokemon.stats[i].base_stat
              }</li>`;
            })
            .join('')}
           </ul>     
      `;

  container.appendChild(card);
}

const pokemonNumber = 150;
const url = 'https://pokeapi.co/api/v2/pokemon/';
const pokemons = [];
const container = document.querySelector('.container');

async function getPokemons() {
  container.innerHTML = '<img src="loading.png" alt="loading icon" class="loading-icon""/>';
  for (let i = 1; i <= pokemonNumber; i++) {
    await fetch(url + `${i}`)
      .then((res) => res.json())
      .then((pokemon) => pokemons.push(pokemon))
      .catch((err) => console.log('Error: ' + err));
  }
  container.innerHTML = '';
  pokemons.forEach((pokemon) => {
    createPokemonCard(pokemon);
  });
}

function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
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

  card.addEventListener('click', (e) => {
    let offsets = card.getBoundingClientRect();
    card.style.position = card.style.position === '' ? 'fixed' : '';
    if (card.style.position === 'fixed') {
      card.style['z-index'] = 1;
      card.animate(
        [
          {
            top: `${offsets.top}px`,
            left: `${offsets.left}px`,
          },
          {
            top: '50%',
            left: '50%',
            translate: '-50% -50%',
            transform: `scale(1.5)`,
          },
        ],

        { duration: 500, fill: 'forwards' }
      );
    } else {
      card.animate(
        {
          translate: '0 0',
          transform: `scale(1)`,
        },
        { duration: 500, fill: 'forwards' }
      );
      card.style['z-index'] = 0;
    }
  });

  container.appendChild(card);
}

getPokemons();

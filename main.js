const pokemonNumber = 150;
const url = 'https://pokeapi.co/api/v2/pokemon/';
const pokemons = [];
const container = document.querySelector('.container');

function getPokemons() {
  for (let i = 1; i <= pokemonNumber; i++) {
    fetch(url + `${i}`)
      .then((res) => res.json())
      .then((pokemon) => {
        pokemons.push(pokemon);
        createPokemonCard(pokemon);
      });
  }
}

function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
        <div class="img-container">
            <img class="img" src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></img>
        </div> 
        <h2 class="name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
    `;
  container.appendChild(card);
}

getPokemons();

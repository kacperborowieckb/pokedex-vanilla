const pokemonNumber = 150;
const url = 'https://pokeapi.co/api/v2/pokemon/';
const pokemons = [];
const container = document.querySelector('.container');

async function getPokemons() {
  container.innerHTML = '<img src="/img/loading.png" alt="loading icon" class="loading-icon""/>';
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
  console.log(pokemons);
}

function createPokemonCard(pokemon) {
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

  card.addEventListener('click', () => {
    animateCard(card);
  });

  container.appendChild(card);
}

function animateCard(card) {
  const testFakeCard = document.querySelector('.fake-card') || null;
  const stats = card.querySelector('.stats');
  if (testFakeCard !== null) {
    animateBackwards(
      testFakeCard.previousSibling,
      testFakeCard.previousSibling.querySelector('.stats')
    );
  }
  if (card.style.position !== 'fixed') {
    const fakeCard = document.createElement('div');
    fakeCard.classList.add('fake-card');
    fakeCard.style.width = `${card.offsetWidth}px`;
    fakeCard.style.minHeight = `${card.offsetHeight}px`;

    card.parentNode.insertBefore(fakeCard, card.nextSibling);

    let offsets = card.getBoundingClientRect();
    card.style.position = 'fixed';
    card.style['z-index'] = 1;
    stats.style.height = '60px';

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
  }
}

function animateBackwards(card, stats) {
  const fakeCard = document.querySelector('.fake-card');
  const fakeCardOffSet = fakeCard.getBoundingClientRect();
  stats.style.height = '0px';

  card.animate(
    {
      top: `${fakeCardOffSet.top}px`,
      left: `${fakeCardOffSet.left}px`,
      translate: '0% 0%',
      transform: `scale(1)`,
    },
    { duration: 500, fill: 'forwards' }
  );
  setTimeout(() => {
    card.style.position = 'static';
    fakeCard.remove();
  }, 500);
  setTimeout(() => {
    card.style['z-index'] = 0;
  }, 250);
}

getPokemons();

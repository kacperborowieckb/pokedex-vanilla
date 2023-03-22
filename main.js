const pokemonNumber = 150;
const url = 'https://pokeapi.co/api/v2/pokemon/';
const pokemons = [];
const container = document.querySelector('.container');
const searchInput = document.querySelector('.search-pokemon-input');
const selectBox = document.querySelector('.select-box');
const navButtons = document.querySelector('.buttons');
const previousBtn = document.querySelector('.btn-previous');
const nextBtn = document.querySelector('.btn-next');
let currentFirstIndex = 0;
let currentLastIndex = pokemonNumber;

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

function displayPokemons(pokemons) {
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

    let offsets = card.getBoundingClientRect();
    card.parentNode.insertBefore(fakeCard, card.nextSibling);

    card.style.position = 'fixed';
    card.style['z-index'] = 1;
    stats.style.height = '60px';
    let scale = window.innerWidth > 500 ? 1.5 : 1.1;
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
          transform: `scale(${scale})`,
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

searchInput.addEventListener('keyup', () => {
  currentFirstIndex = 0;
  searchPokemon();
});
selectBox.addEventListener('change', () => {
  currentFirstIndex = 0;
  searchPokemon();
});

function searchPokemon() {
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

function addOptions() {
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

navButtons.addEventListener('click', (e) => {
  console.log('click');
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

getPokemons();

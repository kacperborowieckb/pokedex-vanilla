import { container } from './variables.js';

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

container.addEventListener('click', (e) => {
  const testFakeCard = document.querySelectorAll('.fake-card');
  if (e.target.closest('.card') && testFakeCard.length < 2) {
    animateCard(e.target.closest('.card'));
  }
});

import './src/css/index.css';
import {
  shuffle,
  joinAnd,
  initAutoresize,
  copyToClipboard,
} from './src/js/utils';

const speakingOrderElement = document.getElementById('speaking-order');

function generate(names) {
  const shuffledNames = shuffle(names);
  speakingOrderElement.innerHTML = `Speaking order: ${joinAnd(shuffledNames, {
    lastSeparator: 'then',
  })}`;
  speakingOrderElement.parentNode.classList.remove('hidden');
}

function handleCopy(copyTarget) {
  copyToClipboard(copyTarget.innerText);
}

const form = document.getElementById('generate');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const names = event.target.names.value;
  const namesArray = names
    .split(/[\n\s,]+/)
    .map((n) => n.trim())
    .filter((n) => n !== '' && n !== ' ');
  generate(namesArray);

  if (event.target.remember.checked) {
    localStorage.setItem('names', JSON.stringify(namesArray));
  } else {
    localStorage.removeItem('names');
  }
});

const names = JSON.parse(localStorage.getItem('names'));
if (names) {
  document.getElementById('names').value = names.join(', ');
  document.getElementById('remember').checked = true;

  document.querySelectorAll('[data-autoresize]').forEach((el) => {
    el.style.height = `${el.scrollHeight + 2}px`; // +2 to fix ???
  });

  generate(names);
}

document.querySelectorAll('[data-copy]').forEach((el) => {
  const copyTarget = document.getElementById(el.dataset.copy);
  el.addEventListener('click', () => handleCopy(copyTarget));
});

initAutoresize();

export function shuffle(array) {
  if (!Array.isArray(array)) {
    throw new Error('shuffle() expects an array');
  }

  const returnArray = [...array];
  if (array.length <= 1) {
    return returnArray;
  }

  // Fisher-Yates shuffle
  for (let i = returnArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = returnArray[i];
    returnArray[i] = returnArray[j];
    returnArray[j] = temp;
  }

  return returnArray;
}

export function joinAnd(
  array,
  { separator = ',', lastSeparator = 'and' } = {}
) {
  if (array.length === 0) {
    return '';
  }
  if (array.length === 1) {
    return array[0];
  }
  if (array.length === 2) {
    return `${array[0]} ${lastSeparator} ${array[1]}`;
  }
  const last = array.pop();
  return `${array.join(`${separator} `)} ${lastSeparator} ${last}`;
}

export function initAutoresize() {
  const autoResize = document.querySelectorAll('[data-autoresize]');
  autoResize.forEach((el) => {
    el.addEventListener('input', () => {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight + 2}px`; // +2 to fix ???
    });
  });
}

export function copyToClipboard(text) {
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  copyContent();
}

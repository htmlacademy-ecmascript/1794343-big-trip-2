function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function makeFirstCharBig(word) {
  const bigFirstChar = word.charAt(0).toUpperCase();
  return bigFirstChar + word.slice(1);
}

export {getRandomArrayElement, makeFirstCharBig};

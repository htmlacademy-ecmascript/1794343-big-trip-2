function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function makeFirstCharBig(word) {
  const bigFirstChar = word.charAt(0).toUpperCase();
  return bigFirstChar + word.slice(1);
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {getRandomArrayElement, makeFirstCharBig, updateItem};

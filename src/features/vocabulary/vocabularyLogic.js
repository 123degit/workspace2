export function isSpellingComplete(placed, expected) {
  return placed.length === expected.length && placed.every((part, index) => part === expected[index]);
}

export function canPlaceSpellingPart(partIndex, targetIndex, expected) {
  return Number.isInteger(partIndex) && partIndex === targetIndex && expected[partIndex] !== undefined;
}

export function calculateMatchScore(correct, total) {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}


export function findSpellingDropTarget(elementFromPoint, clientX, clientY) {
  const element = elementFromPoint(clientX, clientY);
  const target = element?.closest?.('[data-spelling-target]');
  const targetIndex = Number(target?.dataset.spellingTarget);

  return Number.isInteger(targetIndex) ? targetIndex : null;
}

export function isVocabularyMatch(word, shelfWord) {
  return word === shelfWord;
}

export function shuffleVocabularyItems(items, random = Math.random) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

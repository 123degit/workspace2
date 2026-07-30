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

export function isSpellingComplete(placed, expected) {
  return placed.length === expected.length && placed.every((part, index) => part === expected[index]);
}

export function calculateMatchScore(correct, total) {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

export function calculateReviewScore(correct, total) {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

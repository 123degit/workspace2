export function calculateReviewScore(correct, total) {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

export function getAnswerResult(answer, selected) {
  return answer === selected ? 'correct' : 'wrong';
}

export function createReviewSummary(correct, total) {
  return {
    correct,
    total,
    score: calculateReviewScore(correct, total),
    points: 20,
  };
}

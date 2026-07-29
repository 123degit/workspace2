import { describe, expect, it } from 'vitest';
import { calculateReviewScore, createReviewSummary, getAnswerResult } from './reviewLogic';

describe('review game scoring', () => {
  it('returns the percentage of correct answers out of eight questions', () => {
    expect(calculateReviewScore(6, 8)).toBe(75);
  });

  it('identifies correct and incorrect yes/no selections', () => {
    expect(getAnswerResult('yes', 'yes')).toBe('correct');
    expect(getAnswerResult('no', 'yes')).toBe('wrong');
  });

  it('creates a summary with score and completion reward', () => {
    expect(createReviewSummary(6, 8)).toEqual({ correct: 6, total: 8, score: 75, points: 20 });
    expect(createReviewSummary(0, 8)).toEqual({ correct: 0, total: 8, score: 0, points: 20 });
  });
});

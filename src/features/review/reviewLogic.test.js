import { describe, expect, it } from 'vitest';
import { calculateReviewScore } from './reviewLogic';

describe('review game scoring', () => {
  it('returns the percentage of correct answers out of eight questions', () => {
    expect(calculateReviewScore(6, 8)).toBe(75);
  });
});

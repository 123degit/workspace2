import { describe, expect, it } from 'vitest';
import { calculateMatchScore, isSpellingComplete } from './vocabularyLogic';

describe('vocabulary game logic', () => {
  it('recognizes a correctly ordered spelling', () => {
    expect(isSpellingComplete(['ch', 'e', 'rr', 'y'], ['ch', 'e', 'rr', 'y'])).toBe(true);
    expect(isSpellingComplete(['e', 'ch', 'rr', 'y'], ['ch', 'e', 'rr', 'y'])).toBe(false);
  });

  it('calculates matching challenge percentage', () => {
    expect(calculateMatchScore(4, 5)).toBe(80);
  });
});

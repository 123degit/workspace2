import { describe, expect, it } from 'vitest';
import { calculateMatchScore, findSpellingDropTarget, isSpellingComplete, isVocabularyMatch, shuffleVocabularyItems } from './vocabularyLogic';

describe('vocabulary game logic', () => {
  it('recognizes a correctly ordered spelling', () => {
    expect(isSpellingComplete(['ch', 'e', 'rr', 'y'], ['ch', 'e', 'rr', 'y'])).toBe(true);
    expect(isSpellingComplete(['e', 'ch', 'rr', 'y'], ['ch', 'e', 'rr', 'y'])).toBe(false);
  });

  it('calculates matching challenge percentage', () => {
    expect(calculateMatchScore(4, 5)).toBe(80);
  });

  it('accepts only a word matched to its shelf', () => {
    expect(isVocabularyMatch('lemon', 'lemon')).toBe(true);
    expect(isVocabularyMatch('lemon', 'mango')).toBe(false);
  });

  it('shuffles vocabulary items without mutating their source order', () => {
    const items = ['cherry', 'lemon', 'mango'];
    const shuffled = shuffleVocabularyItems(items, () => 0);

    expect(shuffled).toEqual(['lemon', 'mango', 'cherry']);
    expect(items).toEqual(['cherry', 'lemon', 'mango']);
  });

  it('finds a spelling target from the element under a released pointer', () => {
    const target = { closest: () => ({ dataset: { spellingTarget: '2' } }) };

    expect(findSpellingDropTarget(() => target, 120, 240)).toBe(2);
    expect(findSpellingDropTarget(() => null, 120, 240)).toBeNull();
  });
});

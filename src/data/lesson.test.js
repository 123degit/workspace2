import { describe, expect, it } from 'vitest';
import { lessonWords } from './lesson';

describe('lesson words', () => {
  it('uses the supplied color words and images', () => {
    expect(lessonWords.map(({ word, image }) => [word, image])).toEqual([
      ['red', '/assets/docx/red.png'],
      ['blue', '/assets/docx/blue.png'],
      ['yellow', '/assets/docx/yellow.png'],
      ['green', '/assets/docx/green.png'],
      ['black', '/assets/docx/black.png'],
    ]);
  });
});

import { describe, expect, it } from 'vitest';
import { lessonWords } from './lesson';

describe('lesson words', () => {
  it('uses the fruit words and images shown in the lesson', () => {
    expect(lessonWords.map(({ word, image }) => [word, image])).toEqual([
      ['cherry', '/assets/docx/image28.png'],
      ['lemon', '/assets/docx/image27.png'],
      ['mango', '/assets/docx/image29.png'],
      ['melon', '/assets/docx/image31.png'],
      ['strawberry', '/assets/docx/image33.png'],
    ]);
  });
});

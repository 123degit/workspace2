import { describe, expect, it } from 'vitest';
import { colorQuestions } from './colorReview';

describe('color review questions', () => {
  it('provides five color prompts for the L1 review game', () => {
    expect(colorQuestions.map((question) => question.word)).toEqual(['red', 'black', 'blue', 'green', 'yellow']);
    expect(colorQuestions).toHaveLength(5);
    expect(colorQuestions.map((question) => question.audio)).toEqual([
      '/music/red拼读音频.mp3',
      '/music/black拼读音频.mp3',
      '/music/blue拼读音频.mp3',
      '/music/green拼读音频.mp3',
      '/music/yellow拼读音频.mp3',
    ]);
    expect(colorQuestions.every((question) => question.answer === 'correct')).toBe(true);
  });
});

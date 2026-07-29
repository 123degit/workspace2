import { expect, it } from 'vitest';
import { getReviewFeedbackAudio, playReviewAudio } from './reviewAudio';

it('uses the supplied correct and incorrect feedback sounds', () => {
  expect(getReviewFeedbackAudio('correct')).toBe('/music/激光.mp3');
  expect(getReviewFeedbackAudio('wrong')).toBe('/music/啊哦.mp3');
});

it('returns false when no audio source is available', async () => {
  await expect(playReviewAudio('')).resolves.toBe(false);
});

it('returns false when browser playback is rejected', async () => {
  const audio = { play: () => Promise.reject(new Error('blocked')) };

  await expect(playReviewAudio('/media/question.mp3', () => audio)).resolves.toBe(false);
});

it('returns true after playback starts', async () => {
  const audio = { play: () => Promise.resolve() };

  await expect(playReviewAudio('/media/question.mp3', () => audio)).resolves.toBe(true);
});

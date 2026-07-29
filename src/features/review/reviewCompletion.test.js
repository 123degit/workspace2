import { describe, expect, it } from 'vitest';
import { getCompletionOverlay } from './reviewCompletion';

describe('review completion overlay', () => {
  it('defines the course completion overlay for the summary stage', () => {
    expect(getCompletionOverlay('summary')).toEqual({
      title: '恭喜你完成今日课程！',
      artwork: '/assets/docx/review-completion-parrot.png',
      destination: '/report',
    });
  });

  it('does not show an overlay during a question', () => {
    expect(getCompletionOverlay('question')).toBeNull();
  });
});

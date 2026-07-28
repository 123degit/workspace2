import { describe, expect, it } from 'vitest';
import { useLearningStore } from './useLearningStore';

describe('learning progress store', () => {
  it('unlocks review after completing the lesson video', () => {
    useLearningStore.setState({ videoDone: false });
    useLearningStore.getState().completeVideo();
    expect(useLearningStore.getState().videoDone).toBe(true);
  });

  it('deducts points only when the selected shop items are affordable', () => {
    useLearningStore.setState({ points: 50, redeemed: [] });
    useLearningStore.getState().redeem(['song-lamb']);
    expect(useLearningStore.getState().points).toBe(20);
    expect(useLearningStore.getState().redeemed).toContain('song-lamb');
    useLearningStore.getState().redeem(['beach']);
    expect(useLearningStore.getState().points).toBe(20);
  });
});

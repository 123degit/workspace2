import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shopItems } from '../data/lesson';

export const useLearningStore = create()(persist((set, get) => ({
  videoDone: false,
  reviewScore: 0,
  reviewResult: null,
  spellingScore: 0,
  matchingScore: 0,
  speakingScore: null,
  points: 120,
  redeemed: [],
  completeVideo: () => set({ videoDone: true }),
  setReviewScore: (score) => set({ reviewScore: score }),
  setReviewResult: (result) => set({ reviewResult: result }),
  setSpellingScore: (score) => set({ spellingScore: score }),
  setMatchingScore: (score) => set({ matchingScore: score }),
  setSpeakingScore: (score) => set({ speakingScore: score }),
  redeem: (ids) => {
    const cost = ids.reduce((sum, id) => sum + (shopItems.find((item) => item.id === id)?.points ?? 0), 0);
    if (cost <= get().points) {
      set((state) => ({ points: state.points - cost, redeemed: [...new Set([...state.redeemed, ...ids])]}));
    }
  },
}), { name: 'bobo-learning-demo' }));

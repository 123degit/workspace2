import { expect, it } from 'vitest';
import { getReviewReportMetric } from './reportMetrics';

it('shows a pending review metric before the game is completed', () => {
  expect(getReviewReportMetric(null)).toEqual({
    subtitle: '完成复习乐园后显示结果',
    progress: '0%',
    value: '待完成',
  });
});

it('shows the actual review score and answer count after completion', () => {
  expect(getReviewReportMetric({ correct: 6, total: 8, score: 75, points: 20 })).toEqual({
    subtitle: '答对 6 / 8 题',
    progress: '75%',
    value: '75%',
  });
});

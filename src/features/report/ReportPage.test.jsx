// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ReportPage } from './ReportPage';

afterEach(cleanup);

describe('ReportPage storybook view', () => {
  it('uses the forest report layout with three report cards', () => {
    const { container } = render(<ReportPage />);
    expect(container.querySelector('.report-page--storybook')).toBeTruthy();
    expect(container.querySelectorAll('.report-story-card')).toHaveLength(3);
  });
});

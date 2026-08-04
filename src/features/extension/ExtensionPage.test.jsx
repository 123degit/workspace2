// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ExtensionPage } from './ExtensionPage';

afterEach(cleanup);

describe('ExtensionPage storybook view', () => {
  it('renders four forest storybook course cards', () => {
    const { container } = render(<ExtensionPage />);

    expect(container.querySelector('.extension-page--storybook')).toBeTruthy();
    expect(container.querySelectorAll('.extension-story-card')).toHaveLength(4);
    expect(screen.getByText('儿歌')).toBeTruthy();
    expect(screen.getByText('动画')).toBeTruthy();
  });
});

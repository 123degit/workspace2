// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { VocabularyPage } from './VocabularyPage';

afterEach(cleanup);

describe('VocabularyPage storybook view', () => {
  it('renders the vocabulary overview in the illustrated storybook layout', () => {
    const { container } = render(<MemoryRouter><VocabularyPage /></MemoryRouter>);

    expect(container.querySelector('.vocab-page--storybook')).toBeTruthy();
    expect(screen.getByText('学习时长：50 min')).toBeTruthy();
    expect(screen.getByRole('button', { name: '播放单词发音' })).toBeTruthy();
  });

  it('does not show the spelling master navigation tab', () => {
    const { container } = render(<MemoryRouter><VocabularyPage /></MemoryRouter>);

    expect(container.querySelector('.subnav')?.textContent).not.toContain('拼写大师');
  });

  it('opens the matching game from the vocabulary challenge lobby', () => {
    render(<MemoryRouter><VocabularyPage /></MemoryRouter>);

    fireEvent.click(screen.getByRole('button', { name: '词汇大闯关' }));
    expect(screen.getByTestId('vocabulary-challenge-lobby')).toBeTruthy();
    expect(screen.getByRole('button', { name: '开始词汇大闯关' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: '开始词汇大闯关' }));
    expect(screen.getByTestId('undersea-match')).toBeTruthy();
  });
});

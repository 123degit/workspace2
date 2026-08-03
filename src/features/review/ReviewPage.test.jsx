// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useLearningStore } from '../../store/useLearningStore';
import { ReviewPage } from './ReviewPage';

afterEach(cleanup);

beforeEach(() => {
  globalThis.Audio = class { play = () => Promise.resolve(); };
});

describe('ReviewPage', () => {
  it('shows correct feedback and the next-question control after the correct flag', () => {
    useLearningStore.setState({ videoDone: true, reviewScore: 0, reviewResult: null });
    render(<MemoryRouter><ReviewPage /></MemoryRouter>);

    fireEvent.click(screen.getByRole('button', { name: '正确' }));

    expect(screen.getByAltText('回答正确')).toBeTruthy();
    expect(screen.getByRole('button', { name: /下一题/ })).toBeTruthy();
  });
});

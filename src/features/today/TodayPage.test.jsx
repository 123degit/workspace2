// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { useLearningStore } from '../../store/useLearningStore';
import { TodayPage } from './TodayPage';

describe('course preparation', () => {
  it('opens the review garden from the course preparation button', () => {
    useLearningStore.setState({ videoDone: false });
    const { container } = render(<MemoryRouter initialEntries={['/today']}><Routes><Route path="/today" element={<TodayPage />} /><Route path="/review" element={<p>review garden</p>} /></Routes></MemoryRouter>);

    fireEvent.click(container.querySelector('.primary'));

    expect(screen.getByText('review garden')).toBeTruthy();
    expect(useLearningStore.getState().videoDone).toBe(true);
  });
});

afterEach(cleanup);

describe('TodayPage', () => {
  it('shows the requested lesson sequence', () => {
    render(<MemoryRouter><TodayPage /></MemoryRouter>);

    ['颜色', '数字', '身体', '方向', '家人', '课堂', '居家', '形状', '动作', '情绪'].forEach((lesson, index) => {
      expect(screen.getByRole('button', { name: new RegExp(`L${index + 1}.*${lesson}`) })).toBeTruthy();
    });
  });

  it('presents L1 as a color course while its video is being prepared', () => {
    render(<MemoryRouter><TodayPage /></MemoryRouter>);

    expect(screen.getByRole('heading', { name: 'Color Play' })).toBeTruthy();
    expect(screen.getByText('认识 red、yellow、blue、green、orange')).toBeTruthy();
    expect(screen.getByText('颜色课程准备中')).toBeTruthy();
  });
});

// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { TodayPage } from './TodayPage';

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

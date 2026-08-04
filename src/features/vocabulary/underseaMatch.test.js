import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('vocabulary train sorting stage', () => {
  it('renders image cards and numbered train carriages', () => {
    const page = readFileSync(new URL('./VocabularyPage.jsx', import.meta.url), 'utf8');

    expect(page).toContain('train-sort-game');
    expect(page).toContain('data-train-carriage={index + 1}');
    expect(page).toContain('按顺序将颜色图片拖到火车上。');
  });
});

import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';

const page = readFileSync(new URL('./ReviewPage.jsx', import.meta.url), 'utf8');

it('uses the five-question color review data and speaks each prompt on entry', () => {
  expect(page).toContain("import { colorQuestions, speakColor } from './colorReview';");
  expect(page).toContain('if (unlocked && !summary) speakColor(question.audio);');
  expect(page).toContain('colorQuestions.length');
});

it('locks both flags after an answer and displays supplied feedback art', () => {
  expect(page).toContain('disabled={Boolean(result)}');
  expect(page).toContain("const CORRECT_ART = '/assets/docx/20260723122549.png';");
  expect(page).toContain("const WRONG_ART = '/assets/docx/20260723122552.png';");
});

it('uses the supplied celebration artwork for the five-question summary', () => {
  expect(page).toContain("const CELEBRATION_ART = '/assets/docx/20260723154038.png';");
  expect(page).toContain('你完成了 5 道颜色辨识题。');
});

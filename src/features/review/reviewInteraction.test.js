import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';

it('renders the wrong-answer replay affordance as a clickable button', () => {
  const page = readFileSync(new URL('./ReviewPage.jsx', import.meta.url), 'utf8');

  expect(page).toContain('<button className="wrong-mark" type="button" onClick={retryQuestion}');
});

it('does not render the redundant bottom replay controls', () => {
  const page = readFileSync(new URL('./ReviewPage.jsx', import.meta.url), 'utf8');

  expect(page).not.toContain('className="audio-button"');
  expect(page).not.toContain('点击喇叭重播题目。');
});

it('resets the wrong-answer feedback before replaying the current question', () => {
  const page = readFileSync(new URL('./ReviewPage.jsx', import.meta.url), 'utf8');

  expect(page).toContain('const retryQuestion = () => setResult(null);');
  expect(page).toContain('onClick={retryQuestion}');
});

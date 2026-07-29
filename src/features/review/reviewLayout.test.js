import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';

it('anchors the review scene elements with absolute canvas coordinates', () => {
  const styles = readFileSync(new URL('./review-layout.css', import.meta.url), 'utf8');

  expect(styles).toContain('.prompt-strip{position:absolute;top:24px;left:50%;width:980px;margin:0;transform:translateX(-50%)}');
  expect(styles).toContain('.prompt-image{position:absolute;top:0;left:-10px}');
  expect(styles).toContain('.prompt-image{border:0;border-radius:0;box-shadow:none}');
  expect(styles).toContain('.prompt-image img{object-fit:contain}');
  expect(styles).toContain('.prompt-copy{position:absolute;top:92px;left:calc(62% - 50px);transform:translateX(-50%)}');
  expect(styles).toContain('.fruit-choice{position:absolute;top:242px;left:50%;width:980px;height:340px;min-height:0;padding:0;transform:translateX(-50%)}');
  expect(styles).toContain('.fruit-option--yes{position:absolute;top:30px;left:80px;transform:none}');
  expect(styles).toContain('.fruit-option--no{position:absolute;top:30px;right:80px;transform:none}');
});

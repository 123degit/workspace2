import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';

const page = readFileSync(new URL('./ReviewPage.jsx', import.meta.url), 'utf8');

it('waits for the current prompt and fixed choice assets before enabling answers', () => {
  expect(page).toContain("import { preloadImage, preloadImages } from './reviewAssets';");
  expect(page).toContain('const [assetsReady, setAssetsReady] = useState(false);');
  expect(page).toContain('disabled={stage !== \'question\' || !assetsReady}');
});

it('preloads the following prompt only after current assets are ready', () => {
  expect(page).toContain('preloadImages([question.image, ...FRUIT_IMAGE_SOURCES])');
  expect(page).toContain('const nextQuestion = questions[questionIndex + 1];');
  expect(page).toContain('if (nextQuestion) preloadImage(nextQuestion.image);');
});

it('marks the rendered question group busy until all current assets settle', () => {
  expect(page).toContain('aria-busy={!assetsReady}');
  expect(page).toContain('review-question-group--ready');
});

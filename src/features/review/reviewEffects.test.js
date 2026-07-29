import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { getFruitEffectAssets } from './reviewEffects';

describe('review fruit effects', () => {
  it('restores the original three-layer watermelon success effect', () => {
    expect(getFruitEffectAssets('yes')).toEqual({
      cut: '/assets/docx/image22.png',
      sparkle: '/assets/docx/image19.png',
      extra: '/assets/docx/image23.png',
    });
  });

  it('restores the original three-layer pineapple success effect', () => {
    expect(getFruitEffectAssets('no')).toEqual({
      cut: '/assets/docx/image25.png',
      sparkle: '/assets/docx/image19.png',
      extra: '/assets/docx/image26.png',
    });
  });

  it('renders juice, sparkle, and cut fruit above the original fruit in order', () => {
    const styles = readFileSync(new URL('./review.css', import.meta.url), 'utf8');

    expect(styles).toContain('.fruit-extra{z-index:2}');
    expect(styles).toContain('.fruit-cut{z-index:3}');
    expect(styles).toContain('.fruit-sparkle{z-index:4}');
  });
});

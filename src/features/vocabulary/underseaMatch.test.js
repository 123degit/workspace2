import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('undersea matching stage', () => {
  it('shows each fruit image before its word is matched', () => {
    const page = readFileSync(new URL('./VocabularyPage.jsx', import.meta.url), 'utf8');

    expect(page).toContain('<img src={item.image} alt={item.word} />');
    expect(page).not.toContain('{matched.includes(item.word) && <img src={item.image} alt={item.word} />}');
  });
});

import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const readStyle = (relativePath) => readFileSync(new URL(relativePath, import.meta.url), 'utf8');

describe('Android mobile style contracts', () => {
  it('defines a phone breakpoint for the shell and shared stacked layouts', () => {
    const styles = readStyle('./styles.css');

    expect(styles).toContain('@media (max-width:768px)');
    expect(styles).toContain('body{min-width:0;overflow-x:hidden}');
    expect(styles).toContain('nav{order:3;flex-basis:100%;overflow-x:auto');
    expect(styles).toContain('.page-grid,.word-layout,.review-card,.word-card,.extension-stage{grid-template-columns:minmax(0,1fr)}');
  });

  it('defines phone overrides for vocabulary, review, and report layouts', () => {
    const vocabularyStyles = readStyle('./features/vocabulary/vocabulary.css');
    const reviewStyles = readStyle('./features/review/review.css');
    const reviewLayoutStyles = readStyle('./features/review/review-layout.css');
    const reportStyles = readStyle('./features/report/report.css');
    const extensionStyles = readStyle('./features/extension/extension.css');

    expect(vocabularyStyles).toContain('.lesson-board,.lesson-detail{grid-template-columns:minmax(0,1fr)}');
    expect(vocabularyStyles).toContain('.lesson-word-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));max-height:none;overflow:visible;padding:8px;gap:4px}');
    expect(vocabularyStyles).toContain('.lesson-word-list .challenge-button{grid-column:1/-1;margin:8px 0 0;width:auto}');
    expect(reviewStyles).toContain('@media (max-width:768px)');
    expect(reviewLayoutStyles).toContain('@media (max-width:480px){.fruit-choice{grid-template-columns:repeat(2,minmax(0,1fr));max-width:none;margin:0}');
    expect(reviewLayoutStyles).toContain('@media (min-width:769px){.review-stage{min-height:760px}');
    expect(reviewLayoutStyles).toContain('.fruit-option{width:340px;height:410px}');
    expect(reportStyles).toContain('@media (max-width:600px)');
    expect(reportStyles).toContain('@media (max-width:768px){.report-page{margin:-24px -16px 0');
    expect(extensionStyles).toContain('@media (max-width:768px){.extension-page{margin:-24px -16px 0');
  });

  it('defines a one-screen lesson card for narrow phone viewports', () => {
    const vocabularyStyles = readStyle('./features/vocabulary/vocabulary.css');
    const sharedStyles = readStyle('./styles.css');

    expect(vocabularyStyles).toContain('@media (max-width:480px){.vocab-page.vocab-page--lesson-mobile');
    expect(vocabularyStyles).toContain('height:100dvh;overflow:hidden');
    expect(vocabularyStyles).toContain('.vocab-page--lesson-mobile .overview-stats{display:none}');
    expect(vocabularyStyles).toContain('.vocab-page--lesson-mobile .lesson-word-list{display:flex;flex-direction:row;overflow-x:auto');
    expect(vocabularyStyles).toContain('.vocab-page--lesson-mobile .lesson-detail{grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr)');
    expect(sharedStyles).toContain('.app-frame:has(.vocab-page--lesson-mobile){height:100dvh;overflow:hidden;display:flex;flex-direction:column}');
    expect(sharedStyles).toContain('.content:has(.vocab-page--lesson-mobile){display:flex;flex:1;min-height:0;overflow:hidden');
  });

  it('defines compact phone layouts for spelling and rolling review', () => {
    const vocabularyStyles = readStyle('./features/vocabulary/vocabulary.css');

    expect(vocabularyStyles).toContain('@media (max-width:480px){.vocab-page:not(.vocab-page--lesson-mobile)');
    expect(vocabularyStyles).toContain('.vocab-page--mobile-game .spelling-game .game-word-image{position:static;width:100%;height:150px;background:transparent;border:0;box-shadow:none');
    expect(vocabularyStyles).toContain('.vocab-page--mobile-game .spelling-visual .leaf-board{position:static;grid-template-columns:repeat(2,minmax(0,1fr))');
    expect(vocabularyStyles).toContain('.vocab-page--mobile-game .rolling-grid{grid-template-columns:repeat(4,minmax(0,1fr))');
    expect(vocabularyStyles).toContain('body .vocab-page--mobile-game .letter-tray span{background-image:url(\'/assets/docx/image37.png\')');
  });
});

# 复习乐园优化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, replayable L1 review game with document-matched questions, audio fallback, answer feedback, and score reporting.

**Architecture:** Keep question metadata in `src/data/lesson.js` and pure score/answer helpers in `src/features/review/reviewLogic.js`. `ReviewPage` owns the UI state machine and invokes the Zustand store only when a round finishes. CSS is consolidated by responsibility so each answer state affects only the selected fruit.

**Tech Stack:** React 18, Vite, Zustand, Vitest, existing DOCX-exported assets.

## Global Constraints

- Preserve the existing 16:9 landscape shell and reuse `public/assets/docx` visuals.
- Use exactly the eight L1 questions and answers from the approved specification.
- Missing or blocked audio must never block a child from answering or advancing.
- Keep all newly added Chinese text UTF-8 encoded and readable.
- Write a failing unit test before each new pure-logic behavior.

---

### Task 1: Define Review Round Data and Logic

**Files:**
- Modify: `src/data/lesson.js`
- Modify: `src/features/review/reviewLogic.js`
- Modify: `src/features/review/reviewLogic.test.js`

**Interfaces:**
- Produces: each `questions` item has `{ sentence, image, answer, audio }` where `answer` is `'yes' | 'no'`.
- Produces: `getAnswerResult(answer, selected)` returns `'correct' | 'wrong'`; `createReviewSummary(correct, total)` returns `{ correct, total, score, points }`.
- Consumes: `calculateReviewScore(correct, total)` remains available to existing imports.

- [ ] **Step 1: Write failing logic tests**

```js
import { calculateReviewScore, createReviewSummary, getAnswerResult } from './reviewLogic';

it('identifies correct and incorrect yes/no selections', () => {
  expect(getAnswerResult('yes', 'yes')).toBe('correct');
  expect(getAnswerResult('no', 'yes')).toBe('wrong');
});

it('creates an eight-question summary with a fixed completion reward', () => {
  expect(createReviewSummary(6, 8)).toEqual({ correct: 6, total: 8, score: 75, points: 20 });
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `pnpm test src/features/review/reviewLogic.test.js`

Expected: FAIL because `getAnswerResult` and `createReviewSummary` are not exported.

- [ ] **Step 3: Add the minimal logic and audio metadata**

```js
export function getAnswerResult(answer, selected) {
  return answer === selected ? 'correct' : 'wrong';
}

export function createReviewSummary(correct, total) {
  return { correct, total, score: calculateReviewScore(correct, total), points: 20 };
}
```

Add `audio: '/media/<matching filename>.mp3'` to each of the eight existing question records, using the filenames in `public/media/manifest.json`.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `pnpm test src/features/review/reviewLogic.test.js`

Expected: PASS with all review logic tests passing.

### Task 2: Add Accessible Question Audio Playback

**Files:**
- Create: `src/features/review/reviewAudio.js`
- Create: `src/features/review/reviewAudio.test.js`
- Modify: `src/features/review/ReviewPage.jsx`

**Interfaces:**
- Produces: `playReviewAudio(src, audioFactory = () => new Audio())` returns `Promise<boolean>`; resolves `true` after a play request and `false` for absent, rejected, or failed media.
- Consumes: `question.audio` from Task 1.

- [ ] **Step 1: Write failing audio helper tests**

```js
import { expect, it } from 'vitest';
import { playReviewAudio } from './reviewAudio';

it('returns false when no source is available', async () => {
  await expect(playReviewAudio('')).resolves.toBe(false);
});

it('returns false when browser playback is rejected', async () => {
  const audio = { play: () => Promise.reject(new Error('blocked')) };
  await expect(playReviewAudio('/media/question.mp3', () => audio)).resolves.toBe(false);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `pnpm test src/features/review/reviewAudio.test.js`

Expected: FAIL because `reviewAudio.js` does not exist.

- [ ] **Step 3: Implement non-blocking playback and wire the page**

```js
export async function playReviewAudio(src, audioFactory = () => new Audio()) {
  if (!src) return false;
  try {
    const audio = audioFactory(src);
    await audio.play();
    return true;
  } catch {
    return false;
  }
}
```

In `ReviewPage`, call the helper whenever `questionIndex` changes and from the replay control. Store its boolean result to show `点击重播题目` only after a failed automatic attempt; do not disable either answer button.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `pnpm test src/features/review/reviewAudio.test.js`

Expected: PASS with both fallback cases passing.

### Task 3: Implement the Review State Machine and Summary

**Files:**
- Modify: `src/features/review/ReviewPage.jsx`
- Modify: `src/features/review/reviewLogic.test.js`
- Modify: `src/store/useLearningStore.test.js`

**Interfaces:**
- Consumes: `getAnswerResult`, `createReviewSummary`, `playReviewAudio`, `questions`, and `setReviewScore`.
- Produces: UI stages `locked`, `question`, `answered`, and `summary`; every summary persists its calculated score through `setReviewScore(score)`.

- [ ] **Step 1: Write failing state and store tests**

```js
it('creates a zero-score summary for a completed round', () => {
  expect(createReviewSummary(0, 8)).toEqual({ correct: 0, total: 8, score: 0, points: 20 });
});

it('stores the latest review score for reports', () => {
  useLearningStore.getState().setReviewScore(75);
  expect(useLearningStore.getState().reviewScore).toBe(75);
});
```

- [ ] **Step 2: Run tests and verify the new summary assertion is RED**

Run: `pnpm test src/features/review/reviewLogic.test.js src/store/useLearningStore.test.js`

Expected: FAIL until Task 1 summary behavior exists; the store assertion passes because the existing store supports score replacement.

- [ ] **Step 3: Replace page flow with explicit answer and advance handlers**

Use `stage` state and derive the selected feedback from the pure helper:

```js
const answerQuestion = (selected) => {
  if (stage !== 'question') return;
  const result = getAnswerResult(question.answer, selected);
  setSelectedAnswer(selected);
  setAnswerResult(result);
  setCorrectCount((count) => count + (result === 'correct' ? 1 : 0));
  setStage('answered');
};
```

On advance, either increment `questionIndex` and restore `question`, or create the summary, call `setReviewScore(summary.score)`, and set `stage` to `summary`. The replay action resets all round-local state to question one. Render locked, question/answered, and summary sections with readable Chinese labels, semantic image text, and `aria-hidden` for decorative overlays.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `pnpm test src/features/review/reviewLogic.test.js src/store/useLearningStore.test.js`

Expected: PASS.

### Task 4: Consolidate Review Visual Feedback

**Files:**
- Modify: `src/features/review/review.css`
- Modify: `src/features/review/review-layout.css`
- Modify: `src/features/review/review-position.css`

**Interfaces:**
- Consumes: `review-stage--correct`, `review-stage--wrong`, `fruit-option--selected`, and `review-stage--summary` classes from Task 3.
- Produces: only the selected fruit receives success cut/sparkle or wrong shake; summary displays existing celebration assets.

- [ ] **Step 1: Establish the expected class contract in the page markup**

```jsx
<div className={`review-stage review-stage--${stage} ${answerResult ? `review-stage--${answerResult}` : ''}`}>
  <div className={`fruit-option ${selectedAnswer === 'yes' ? 'fruit-option--selected' : ''}`}>
```

- [ ] **Step 2: Replace competing override selectors with focused feedback rules**

Keep background/overall colors in `review.css`, responsive layout in `review-layout.css`, and absolute positioning in `review-position.css`. Delete only review selectors superseded by these stable classes. Use `image22.png`/`image25.png` for selected fruit cutting, `image19.png` for correct sparkle, a `@keyframes` transform shake for a selected wrong answer, and `image17.png` plus a CSS confetti layer for the summary.

- [ ] **Step 3: Build and visually inspect the route**

Run: `pnpm build`

Expected: production build succeeds. Open `/review`, complete one correct and one incorrect answer, then finish the round; verify only the selected fruit animates and the summary is legible at landscape width.

### Task 5: Run Regression Verification

**Files:**
- Modify: no additional files unless a test identifies a review-specific defect.

**Interfaces:**
- Consumes: all completed implementation tasks.
- Produces: verified review flow and production bundle.

- [ ] **Step 1: Run the full test suite**

Run: `pnpm test --run`

Expected: PASS for review, vocabulary, and store tests.

- [ ] **Step 2: Run the production build**

Run: `pnpm build`

Expected: Vite build completes without errors.

- [ ] **Step 3: Verify the browser flow manually**

At `http://localhost:5175/review`, verify the locked screen before course completion, course-to-review navigation after completion, automatic/replay audio fallback, eight-question progress, both feedback states, summary/replay, and current score on `/report`.

## Self-Review

- Spec coverage: Tasks 1–3 cover question data, locking, audio, score persistence, and replay; Task 4 covers visual and celebration requirements; Task 5 covers full regression and the report route.
- Placeholder scan: no deferred work markers or unspecified interfaces remain.
- Type consistency: question `audio`, `getAnswerResult`, `createReviewSummary`, `playReviewAudio`, and `setReviewScore` use the same names throughout.

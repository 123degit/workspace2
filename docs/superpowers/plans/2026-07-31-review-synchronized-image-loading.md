# Review Synchronized Image Loading Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reveal the current review prompt and fixed answer images together, while preloading the next prompt image in the background.

**Architecture:** Keep image lifecycle logic in a focused review asset helper. `ReviewPage` owns readiness for the current question and ignores stale asynchronous completions; it invokes the helper to preload the current visual group and the next prompt. CSS reserves the existing stage geometry and transitions the whole question group after it becomes ready.

**Tech Stack:** React, Vite, Vitest, Testing Library, CSS.

## Global Constraints

- Gate only the review question stage.
- Current-question prompt, `yes`, and `no` assets load concurrently.
- Next-question prompt preloads after current assets become ready; do not preload the entire bank.
- Image errors settle loading so they cannot block play.
- Preserve the existing responsive review layout and accessibility labels.
- Do not modify unrelated, pre-existing untracked files.

---

### Task 1: Isolate image preload behavior

**Files:**
- Create: `src/features/review/reviewAssets.js`
- Test: `src/features/review/reviewAssets.test.js`

**Interfaces:**
- Produces: `preloadImage(src): Promise<void>` resolving on `load` or `error`.
- Produces: `preloadImages(sources): Promise<void>` resolving after all supplied source requests settle.

- [ ] **Step 1: Write failing helper tests**

```js
import { preloadImage, preloadImages } from './reviewAssets';

it('resolves preloadImage when an image loads', async () => { /* mock Image and dispatch load */ });
it('resolves preloadImage when an image errors', async () => { /* mock Image and dispatch error */ });
it('starts all preloadImages requests before awaiting completion', async () => { /* inspect Image calls */ });
```

- [ ] **Step 2: Run helper tests and verify failure**

Run: `pnpm test -- --run src/features/review/reviewAssets.test.js`
Expected: FAIL because `reviewAssets.js` does not exist.

- [ ] **Step 3: Implement minimal preload helpers**

```js
export function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });
}

export function preloadImages(sources) {
  return Promise.all(sources.map(preloadImage)).then(() => undefined);
}
```

- [ ] **Step 4: Run helper tests and verify pass**

Run: `pnpm test -- --run src/features/review/reviewAssets.test.js`
Expected: PASS.

### Task 2: Gate and synchronize review question rendering

**Files:**
- Modify: `src/features/review/ReviewPage.jsx`
- Modify: `src/features/review/review.css`
- Test: `src/features/review/reviewInteraction.test.js`

**Interfaces:**
- Consumes: `preloadImages(sources)` from `reviewAssets.js`.
- Produces: a ready-only answer interaction and a `review-question-group` visual state.

- [ ] **Step 1: Write failing interaction tests**

```js
it('keeps answer buttons disabled until current image assets settle', async () => { /* control Image mock */ });
it('preloads the next prompt after the current asset group is ready', async () => { /* assert next question image source */ });
it('does not preload a prompt beyond the final question', async () => { /* render final question state */ });
```

- [ ] **Step 2: Run interaction tests and verify failure**

Run: `pnpm test -- --run src/features/review/reviewInteraction.test.js`
Expected: FAIL because readiness gating and next-prompt preloading do not exist.

- [ ] **Step 3: Implement current-image lifecycle**

- Store `assetsReady` state and reset it when the question index changes.
- In an effect, preload `[question.image, ...optionImageSources]`; guard its completion with an active flag so an earlier effect cannot reveal a newer question.
- Once ready, preload `questions[questionIndex + 1]?.image` without awaiting it.
- Add a stable loading status and apply `aria-busy` to the question group.
- Disable answers while the stage is not `question` or assets are not ready.

- [ ] **Step 4: Implement grouped loading styles**

- Preserve the stage dimensions while assets load.
- Hide the question group with opacity and prevent pointer interaction until ready.
- Reveal it as one group with a short transition.
- Disable the transition under `prefers-reduced-motion: reduce`.

- [ ] **Step 5: Run focused interaction tests and verify pass**

Run: `pnpm test -- --run src/features/review/reviewInteraction.test.js src/features/review/reviewAssets.test.js`
Expected: PASS.

### Task 3: Validate the review flow

**Files:**
- Verify: `src/features/review/ReviewPage.jsx`
- Verify: `src/features/review/review.css`

- [ ] **Step 1: Run all review tests**

Run: `pnpm test -- --run src/features/review`
Expected: PASS.

- [ ] **Step 2: Build production bundle**

Run: `pnpm build`
Expected: Vite production build succeeds.

- [ ] **Step 3: Manually inspect in browser**

Run: open `http://127.0.0.1:5174/review`, unlock review if needed, advance through several questions.
Expected: each current prompt and option group appears together; the next prompt has no visible late-load flash.

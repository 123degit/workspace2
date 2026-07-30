# Vocabulary One-Screen Mobile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the vocabulary course overview fit within one Android phone viewport while preserving its existing learning interactions.

**Architecture:** Keep the existing `VocabularyOverview` state and handlers intact. Add a narrowly-scoped `max-width:480px` presentation layer to turn the lesson word list into a horizontal selector and the lesson detail into the one-screen card; desktop and larger mobile rules remain unchanged.

**Tech Stack:** React, Vite, CSS media queries, Vitest.

## Global Constraints

- Apply one-screen behavior only at `max-width:480px`.
- Use `100dvh` for the course overview height and prevent document-level vertical and horizontal overflow in that mode.
- Preserve `selected`, `playLessonAudio(current.audio)`, previous/next word controls, and `onChallenge`.
- Do not change lesson data, routing, score logic, dependencies, or desktop/tablet layout.
- Do not create a commit unless the user explicitly requests one.

---

### Task 1: Define the Mobile Layout Contract

**Files:**
- Modify: `src/mobileStyles.test.js`

**Interfaces:**
- Consumes: the vocabulary stylesheet as UTF-8 text through `readStyle('./features/vocabulary/vocabulary.css')`.
- Produces: regression assertions for the one-screen mobile CSS contract.

- [ ] **Step 1: Write the failing test**

Add a test that reads `vocabulary.css` and asserts it contains all of the following exact fragments:

```js
expect(vocabularyStyles).toContain('@media (max-width:480px){.vocab-page.vocab-page--lesson-mobile');
expect(vocabularyStyles).toContain('height:100dvh;overflow:hidden');
expect(vocabularyStyles).toContain('.vocab-page--lesson-mobile .overview-stats{display:none}');
expect(vocabularyStyles).toContain('.vocab-page--lesson-mobile .lesson-word-list{display:flex;overflow-x:auto');
expect(vocabularyStyles).toContain('.vocab-page--lesson-mobile .lesson-detail{grid-template-columns:minmax(0,1fr)');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test --run src/mobileStyles.test.js`

Expected: FAIL because `vocabulary.css` has no `.vocab-page--lesson-mobile` one-screen rule.

- [ ] **Step 3: Leave production code unchanged**

The red test documents the required selector and will be satisfied in Task 2.

- [ ] **Step 4: Record the red result**

Keep the failing output in the task transcript before changing `VocabularyPage.jsx` or `vocabulary.css`.

### Task 2: Add an Isolated Mobile Lesson Marker

**Files:**
- Modify: `src/features/vocabulary/VocabularyPage.jsx`

**Interfaces:**
- Consumes: existing `tab` state with the `overview` value.
- Produces: `vocab-page--lesson-mobile` class only when the course overview is displayed.

- [ ] **Step 1: Add the minimal component change**

Replace the root vocabulary page element with a class name that conditionally adds the mobile marker while retaining the base class:

```jsx
const isCourseOverview = tab === 'overview';

return <div className={`vocab-page${isCourseOverview ? ' vocab-page--lesson-mobile' : ''}`}>
```

Keep the existing child rendering and all event handlers unchanged.

- [ ] **Step 2: Verify the component still compiles**

Run: `pnpm test --run src/mobileStyles.test.js`

Expected: still FAIL only on missing CSS fragments; the component change must not introduce a parse error.

### Task 3: Implement the One-Screen Phone Styles

**Files:**
- Modify: `src/features/vocabulary/vocabulary.css`
- Test: `src/mobileStyles.test.js`

**Interfaces:**
- Consumes: `.vocab-page--lesson-mobile`, `.overview-stats`, `.lesson-board`, `.lesson-word-list`, `.lesson-detail`, `.detail-copy`, `.detail-visual`, `.detail-arrow`, and `.challenge-button`.
- Produces: a `max-width:480px` mobile-only layout that is bounded by the dynamic viewport.

- [ ] **Step 1: Add the minimal one-screen rule**

Append one `@media (max-width:480px)` rule beginning with the selector asserted in Task 1. It must set the page to `height:100dvh;overflow:hidden`, hide `.overview-stats`, make `.lesson-board` a remaining-space flex container, turn `.lesson-word-list` into a single-line horizontally scrolling selector, and reduce the detail card/image/type spacing so it stays inside the viewport.

- [ ] **Step 2: Keep core controls available**

Within the same media rule, ensure the selected word remains visible, retain the full-width challenge button in the selector, keep previous/next arrows above the card content, and use `min-width:0` / `max-width:100%` where needed to prevent horizontal overflow.

- [ ] **Step 3: Run the targeted test to verify it passes**

Run: `pnpm test --run src/mobileStyles.test.js`

Expected: PASS with all mobile style contract assertions green.

- [ ] **Step 4: Run the full automated suite**

Run: `pnpm test --run`

Expected: PASS with no test failures.

### Task 4: Verify the Built Layout in a Phone Viewport

**Files:**
- Verify only: `src/features/vocabulary/VocabularyPage.jsx`
- Verify only: `src/features/vocabulary/vocabulary.css`

**Interfaces:**
- Consumes: the Vite development server and the vocabulary page route.
- Produces: visual and DOM evidence that the phone overview does not scroll and controls work.

- [ ] **Step 1: Build the project**

Run: `pnpm build`

Expected: Vite completes successfully.

- [ ] **Step 2: Inspect at 354 × 844**

Open the vocabulary course overview in a `354 × 844` viewport. Confirm the document has no vertical or horizontal overflow with:

```js
({
  vertical: document.documentElement.scrollHeight <= document.documentElement.clientHeight,
  horizontal: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
})
```

- [ ] **Step 3: Check interactive paths**

Click a word selector, previous and next arrows, the audio button, and the challenge button. Confirm the selected word changes, arrows cycle words, audio action remains callable, and the challenge button opens the existing match game.

- [ ] **Step 4: Check the patch**

Run: `git diff --check`

Expected: no whitespace errors.

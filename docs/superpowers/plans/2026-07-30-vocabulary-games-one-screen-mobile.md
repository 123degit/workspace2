# Vocabulary Games One-Screen Mobile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize the spelling game and rolling review for a complete Android phone viewport.

**Architecture:** Preserve existing vocabulary data and score updates. Add a reusable tap placement path beside desktop drag/drop, map review words to known lesson audio when available, and use `max-width:480px` CSS overrides for the compact game scene, `4 × 5` review grid, and scene-integrated fruit artwork.

**Tech Stack:** React, Vite, CSS media queries, Vitest.

## Global Constraints

- Apply the redesigned layouts only at `max-width:480px`.
- The `354 × 844` document must have no vertical or horizontal overflow.
- Keep desktop drag/drop, existing audio paths, scoring, and routes unchanged.
- Do not add dependencies or create a commit.

---

### Task 1: Define Mobile Game Contracts

**Files:**
- Modify: `src/mobileStyles.test.js`

**Interfaces:**
- Consumes: `vocabulary.css` as text.
- Produces: style assertions for touch spelling, fruit integration, and the review grid.

- [ ] Add failing assertions for the exact fragments `@media (max-width:480px){.vocab-page:not(.vocab-page--lesson-mobile)`, `.spelling-game .game-word-image{background:transparent;border:0;box-shadow:none`, `.spelling-visual .leaf-board{grid-template-columns:repeat(2,minmax(0,1fr))`, and `.rolling-grid{grid-template-columns:repeat(4,minmax(0,1fr))`.
- [ ] Run `pnpm test --run src/mobileStyles.test.js` and confirm it fails on the new contracts.

### Task 2: Add Touch-First Spelling and Review Audio

**Files:**
- Modify: `src/features/vocabulary/VocabularyPage.jsx`

**Interfaces:**
- Consumes: `canPlaceSpellingPart(partIndex, targetIndex, word.spelling)`, `playLessonAudio(audioPath)`, `lessonWords`, and `overviewWords`.
- Produces: click handlers for selecting a spelling part, tapping an answer slot, and playing audio for matching review words.

- [ ] Extract the shared placement logic into `placePart(partIndex, targetIndex)` and call it from the existing drop handler.
- [ ] Add `selectedPartIndex` state. A leaf click selects its index; an empty answer slot click calls `placePart(selectedPartIndex, targetIndex)` then clears the selection.
- [ ] Add a `selected` class to the chosen leaf button and preserve drag handlers.
- [ ] For each rolling review word, find `lessonWords.find((word) => word.word === item)` and play audio only when the match exists.
- [ ] Run `pnpm test --run` and confirm the existing suite remains green.

### Task 3: Implement One-Screen Game and Review Styles

**Files:**
- Modify: `src/features/vocabulary/vocabulary.css`
- Test: `src/mobileStyles.test.js`

**Interfaces:**
- Consumes: `.spelling-game`, `.game-word-image`, `.leaf-board`, `.letter-tray`, `.rolling-grid`, `.overview-word`, and the tab-specific root class.
- Produces: a compact touch game and review grid restricted to narrow phone viewports.

- [ ] Add a mobile-only non-course overview page shell using dynamic viewport height and hidden document overflow.
- [ ] Remove the white image card/chrome in the spelling game, display the transparent fruit image inside the pond scene, and retain the image audio button.
- [ ] Size the leaf grid and answer tray so every spelling part and slot is visible; add a selected-leaf visual state.
- [ ] Set the rolling review grid to four columns and five rows with compact touch targets.
- [ ] Run `pnpm test --run src/mobileStyles.test.js` and confirm all assertions pass.

### Task 4: Validate Android Viewport Behavior

**Files:**
- Verify only: `src/features/vocabulary/VocabularyPage.jsx`
- Verify only: `src/features/vocabulary/vocabulary.css`

- [ ] Run `pnpm test --run`, `pnpm build`, and `git diff --check`.
- [ ] At `354 × 844`, verify both tabs satisfy `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth`.
- [ ] Verify a spelling part can be selected and placed through taps, the fruit image retains its audio action, and the review grid has 20 visible word cards.

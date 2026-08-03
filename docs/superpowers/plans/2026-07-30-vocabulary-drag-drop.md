# Vocabulary Drag-and-Drop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task.

**Goal:** Make spelling practice accept only correctly ordered drag-and-drop placements while preserving the existing lily-pad interface and image audio playback.

**Architecture:** Keep the word data and visual layout unchanged. Add a small pure drop-validation helper, then have `SpellingGame` track placed positions and a currently dragged letter index. A successful drop permanently fills its matching target; an incorrect drop changes no state so the source button returns to its original location.

**Tech Stack:** React, native HTML drag-and-drop, Vitest.

## Global Constraints

- Preserve the decorative empty lily pad created by `.letter-tray::after`.
- Do not add automated tests for the spelling module, per user request.
- Clicking the word image continues to play its spelling audio.
- Letter placement is drag-only; clicking letter pads does not place a letter.

---

### Task 1: Add drop validation and wire drag events

**Files:**
- Modify: `src/features/vocabulary/vocabularyLogic.js`
- Modify: `src/features/vocabulary/VocabularyPage.jsx`

**Interfaces:**
- Produces: `canPlaceSpellingPart(partIndex, targetIndex, expectedParts)` returns `true` only when the dragged source and target both represent the expected spelling position.
- Consumes: `word.spelling` from `src/data/lesson.js`.

- [ ] Add `canPlaceSpellingPart` for the single valid target position.
- [ ] On drag start, store the source part index with `dataTransfer` and React state.
- [ ] On target drop, place the part only when the helper returns `true`; otherwise leave state unchanged.
- [ ] Mark placed source pads disabled and targets filled; automatically show completion and score once all target positions are filled.

### Task 2: Make dragging clear and preserve pond layout

**Files:**
- Modify: `src/features/vocabulary/vocabulary.css`

**Interfaces:**
- Consumes: `.is-dragging`, `.is-drop-target`, `.is-filled`, and disabled attributes emitted by `SpellingGame`.

- [ ] Add visual feedback for active drop targets and a dragged source pad.
- [ ] Ensure filled target pads do not accept more drops.
- [ ] Preserve the existing lily-pad backgrounds, animation, and `.letter-tray::after` decorative pad.

### Task 3: Verify interaction and production build

**Files:**
- Verify: `src/features/vocabulary/VocabularyPage.jsx`
- Verify: `src/features/vocabulary/vocabulary.css`

- [ ] Manually verify a correct drag remains on its matching target.
- [ ] Manually verify an incorrect target leaves the source pad in place.
- [ ] Verify clicking the image requests the current word's audio.
- [ ] Run `pnpm test -- --run` and `pnpm build`.

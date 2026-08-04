# Vocabulary Challenge Lobby Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render a storybook vocabulary-challenge lobby before the existing matching game.

**Architecture:** `MatchGame` owns an internal lobby/game view state. The lobby consumes the existing `lessonWords` data and hands control to the unchanged matching interaction through its start button.

**Tech Stack:** React, Vitest, Testing Library, CSS.

## Global Constraints

- Retain the five existing color words, assets, audio paths, and matching rules.
- Keep the existing forest storybook palette and responsive behavior.

---

### Task 1: Challenge lobby behaviour

**Files:**
- Modify: `src/features/vocabulary/VocabularyPage.test.jsx`
- Modify: `src/features/vocabulary/VocabularyPage.jsx`

- [x] **Step 1: Write the failing test**

```jsx
it('opens the matching game from the vocabulary challenge lobby', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><VocabularyPage /></MemoryRouter>);
  await user.click(screen.getByRole('button', { name: '词汇大闯关' }));
  expect(screen.getByTestId('vocabulary-challenge-lobby')).toBeTruthy();
  expect(screen.getByRole('button', { name: '开始词汇大闯关' })).toBeTruthy();
  await user.click(screen.getByRole('button', { name: '开始词汇大闯关' }));
  expect(screen.getByTestId('undersea-match')).toBeTruthy();
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `pnpm.cmd test -- src/features/vocabulary/VocabularyPage.test.jsx`

- [x] **Step 3: Write minimal implementation**

Add a `VocabularyChallengeLobby` rendered by `MatchGame` before the matching board, with the five `lessonWords` entries and a start button that switches to the existing board.

- [x] **Step 4: Run test to verify it passes**

Run: `pnpm.cmd test -- src/features/vocabulary/VocabularyPage.test.jsx`

### Task 2: Storybook challenge styling

**Files:**
- Modify: `src/features/vocabulary/vocabulary.css`

- [x] **Step 1: Add responsive lobby styles**

Add the `vocabulary-challenge-lobby` card layout, pale-blue mode controls, color-word grid, and cream-yellow start button beneath the existing storybook selectors.

- [x] **Step 2: Verify the application**

Run: `pnpm.cmd test` and `pnpm.cmd build`

# Android H5 Adaptation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every learning route usable in Android 8+ Chrome at phone and tablet widths without changing React learning logic.

**Architecture:** Preserve all existing components and routes. Add scoped CSS media-query overrides: shared shell behavior lives in `src/styles.css`, while page-specific grid and fixed-size overrides stay in their feature stylesheets. No new runtime dependencies or JavaScript browser polyfills are introduced.

**Tech Stack:** React, React Router, Vite, CSS media queries, Vitest.

## Global Constraints

- Target Android 8+ Chromium browsers.
- Do not add Tailwind, FastClick, or legacy-browser polyfills.
- Preserve the existing viewport tag and desktop layout above 768px.
- Do not modify lesson data, routes, store behavior, or learning interactions.
- Verify widths of 360px, 390px, and 768px without document-level horizontal overflow.

---

### Task 1: Make the application shell phone-safe

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: Existing `.app-frame`, `.topbar`, `nav`, `.content`, and shared grid classes.
- Produces: Mobile shell rules at `max-width: 768px` and compact rules at `max-width: 480px`.

- [ ] **Step 1: Add the failing visual acceptance check**

Open `/today` at 390px width and check the document scroll width in DevTools:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

Expected before implementation: `false` because the desktop shell and header require a wide layout.

- [ ] **Step 2: Add shared mobile CSS overrides**

Append the following rules to `src/styles.css`:

```css
@media (max-width: 768px) {
  body { min-width: 0; overflow-x: hidden; }
  .app-frame { min-height: 100vh; min-height: 100dvh; }
  .topbar { height: auto; min-height: 68px; padding: 10px 16px; gap: 10px; flex-wrap: wrap; }
  .brand { min-width: 0; flex: 1; }
  .brand > div:last-child span { display: none; }
  nav { order: 3; flex-basis: 100%; overflow-x: auto; padding-bottom: 2px; scrollbar-width: none; }
  nav::-webkit-scrollbar { display: none; }
  nav a { flex: 0 0 auto; min-height: 44px; padding: 10px 12px; }
  .content { padding: 24px 16px 32px; }
  .page-grid, .word-layout, .review-card, .word-card, .extension-stage { grid-template-columns: minmax(0, 1fr); }
  .page-grid { gap: 24px; }
  .review-card, .word-card, .extension-stage { gap: 20px; padding: 20px; }
  .video-card { height: min(62vw, 360px); min-height: 240px; }
  .metric-grid, .category-grid, .shop-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .stage-head, .game-top, .shop-title { align-items: flex-start; gap: 12px; flex-wrap: wrap; }
  .word-info { padding: 0; }
  .word-image { min-height: 240px; }
  .word-info h2 { font-size: clamp(36px, 12vw, 48px); }
  .card-nav { position: static; justify-content: flex-end; margin-top: 20px; }
  .report-note, .shop-footer { align-items: flex-start; flex-wrap: wrap; }
}

@media (max-width: 480px) {
  .brand b { font-size: 13px; }
  .top-actions { gap: 8px; }
  .points { padding: 7px 10px; }
  .metric-grid, .category-grid, .shop-grid { grid-template-columns: minmax(0, 1fr); }
  .lesson-list h1, .page-title h1, .game-top h1, .vocab-head h1 { font-size: 26px; }
  .answer-row, .summary-actions { flex-wrap: wrap; }
  .answer-row > *, .summary-actions > * { flex: 1 1 140px; text-align: center; }
}
```

- [ ] **Step 3: Re-run the visual acceptance check**

At 360px, 390px, and 768px on `/today`, run:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

Expected: `true` at all three widths, with the header navigation horizontally scrollable rather than clipped.

### Task 2: Stack vocabulary and review learning interfaces

**Files:**
- Modify: `src/features/vocabulary/vocabulary.css`
- Modify: `src/features/vocabulary/spellingDrag.css`
- Modify: `src/features/review/review-layout.css`
- Modify: `src/features/review/review.css`

**Interfaces:**
- Consumes: Existing vocabulary `.lesson-board`, `.lesson-detail`, `.spelling-visual`, `.match-board`; review stage classes.
- Produces: Single-column layouts and touch-safe controls below 768px.

- [ ] **Step 1: Add the failing visual acceptance checks**

At 390px, visit `/vocabulary` and `/review`. Verify the lesson board, spelling board, review choices, and completion overlay do not require horizontal scrolling.

- [ ] **Step 2: Add vocabulary phone overrides**

Append a `max-width: 768px` block to `src/features/vocabulary/vocabulary.css` that sets `.lesson-board`, `.lesson-detail`, `.spelling-visual`, and `.match-board` to one column; sets `.rolling-grid` and `.match-images` to two columns; reduces `.lesson-word-list > button:not(.challenge-button)` to `18px`; makes `.detail-copy h2` `clamp(38px, 15vw, 52px)`; reduces `.detail-copy p`, `.detail-sentence`, and `.detail-spelling span` to phone-safe sizes; and changes `.detail-arrow` to `44px` controls.

Append a `max-width: 480px` block that makes `.overview-grid` and `.rolling-grid` two columns, keeps `.letter-tray` horizontally scrollable with `justify-content: flex-start`, and gives its buttons `min-width: 44px`.

- [ ] **Step 3: Add review phone overrides**

Append a `max-width: 768px` block to `src/features/review/review-layout.css` or `review.css` that stacks the review card and completion panel, makes visual assets fluid with `max-width: 100%`, allows summary text to wrap, and keeps answer controls at least 44px high. Add a `prefers-reduced-motion: reduce` block that disables non-essential review transition and celebration animations without hiding completion feedback.

- [ ] **Step 4: Verify both learning routes**

At 360px and 390px, select a vocabulary lesson, start a spelling activity, answer a review question, and open completion feedback. Expected: all controls remain visible, tappable, and within the viewport.

### Task 3: Adapt report, extension, and shop grids

**Files:**
- Modify: `src/features/report/report.css`
- Modify: `src/features/extension/extension.css`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: Existing report `.report-summary`, `.report-metrics`, `.report-details`; extension content grid; shop shared classes.
- Produces: Narrow-screen report cards and single-column detail rows.

- [ ] **Step 1: Add the failing visual acceptance checks**

At 390px, open `/report`, `/extension`, and `/shop`. Verify the five report metrics, progress detail rows, extension media, and shop cards remain within the viewport.

- [ ] **Step 2: Add report and extension overrides**

Append a `max-width: 600px` block to `src/features/report/report.css` that makes `.report-summary` two columns, `.report-metrics` one column, `.report-details > div` one column, and `.report-parrot` smaller and non-overlapping. Add a `max-width: 768px` block to `src/features/extension/extension.css` that stacks its menu and media area, removes fixed media height in favor of `min-height: 260px`, and makes its primary action static when necessary.

- [ ] **Step 3: Verify secondary routes**

At 360px, 390px, and 768px, inspect `/report`, `/extension`, and `/shop`. Expected: cards use one or two columns as appropriate; headings, progress values, and buttons stay visible; document overflow check returns `true`.

### Task 4: Build and regression-check the responsive implementation

**Files:**
- Modify: none unless validation exposes a layout issue.

**Interfaces:**
- Consumes: All responsive rules from Tasks 1-3.
- Produces: Verified production bundle.

- [ ] **Step 1: Run automated tests**

Run: `pnpm test --run`

Expected: all existing Vitest tests pass.

- [ ] **Step 2: Run production build**

Run: `pnpm build`

Expected: Vite completes successfully and writes the production bundle to `dist`.

- [ ] **Step 3: Perform final viewport smoke test**

Use browser device emulation at 360px, 390px, and 768px for `/today`, `/review`, `/vocabulary`, `/extension`, `/report`, and `/shop`.

Expected: every route stays inside the viewport; navigation remains reachable; content is readable; all visible interactive elements are tappable.

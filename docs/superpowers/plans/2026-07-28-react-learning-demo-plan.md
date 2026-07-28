# AI 幼儿启蒙 L1 React Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a horizontal, real-asset-first React learning demo for the L1 fruit lesson.

**Architecture:** Vite React TypeScript app with a shared 16:9 shell, route-level feature pages, typed domain data, and Zustand persistence for learning progress and points.

**Tech Stack:** React, JavaScript, Vite, React Router, Zustand, Vitest, Testing Library.

## Global Constraints

- Use Chinese UI copy with English learning content.
- Keep all media references under `public/assets` or `public/media`.
- Missing media must render an explicit fallback state.
- Optimize for horizontal 16:9 use.

### Task 1: Scaffold and asset extraction

**Files:** `package.json`, `index.html`, `src/main.jsx`, `src/styles.css`, `public/assets/*`, `public/media/README.md`, `vite.config.js`.

- Initialize Vite React TypeScript dependencies and scripts.
- Extract DOCX embedded media into `public/assets/docx` with a repeatable script/command note.
- Add app entry and global reset/theme tokens.
- Verify with `npm install` and `npm run build`.

### Task 2: Domain data and app state

**Files:** `src/data/lesson.js`, `src/store/useLearningStore.js`, `src/store/useLearningStore.test.js`.

- Define typed lesson, vocabulary, game question, report, and shop item contracts.
- Add L1 fruit data for five target words and eight review questions.
- Implement actions for video completion, review answers, spelling/matching completion, and shop redemption; persist state.
- Write failing tests first for unlock and points behavior, then implement and run Vitest.

### Task 3: Shared shell and routing

**Files:** `src/app/App.jsx`, `src/components/layout/LearningShell.jsx`, `src/components/ui/MediaFallback.jsx`.

- Add navigation for six modules and nested feature routes.
- Add 16:9 shell, progress badge, points badge, and missing-media fallback.
- Test route rendering and shell navigation.

### Task 4: Learning and game pages

**Files:** `src/features/today/*`, `src/features/review/*`, `src/features/vocabulary/*`.

- Implement lesson catalog/video panel and unlock behavior.
- Implement eight-question review flow with answer feedback and completion summary.
- Implement word cards, spelling drag/drop, rolling review, and five-word matching game.
- Add focused component tests for completion and score calculations.

### Task 5: Extension, report, and shop pages

**Files:** `src/features/extension/*`, `src/features/report/*`, `src/features/shop/*`.

- Implement extension category/course list, picture-book pager, and speaking recording placeholder tied to media fallback.
- Render five report metric cards from store data, including no-speaking-record copy.
- Implement category carousel, checkbox selection, estimated cost, and redemption action.
- Add tests for report fallback copy and shop totals.

### Task 6: Verification and handoff

- Run `npm test -- --run`, `npm run build`, and `npm run lint`.
- Fix all errors and document local run commands in `README.md`.

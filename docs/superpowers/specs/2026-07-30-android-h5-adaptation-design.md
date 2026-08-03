# Android H5 Adaptation Design

## Goal

Make the existing React learning application comfortable to use in Android 8+ Chrome and other current Android browsers. The product remains a browser-delivered H5 app; no native packaging, WebView integration, or React business-logic changes are included.

## Scope

- Preserve the existing `index.html` viewport declaration and React routes.
- Add mobile-first override rules at 768px and 480px breakpoints.
- Keep desktop and tablet layouts unchanged outside those breakpoints.
- Support touch-first use, including safe scrolling, tap targets, and dynamic viewport sizing.
- Respect `prefers-reduced-motion` where animations can distract or reduce comfort.

## Layout Strategy

Global styles will remove the desktop-only minimum page width on phone screens. The top bar will become compact, with the primary navigation horizontally scrollable instead of forcing the page wider than the viewport.

Shared desktop grids will reduce columns progressively. Two-column learning, review, vocabulary, and extension panels will stack into a single column on phones. Fixed content dimensions will use smaller mobile values or fluid values so cards, media, and imagery stay inside the viewport.

Feature-specific mobile overrides will cover the report metrics, vocabulary boards and games, review experience, shop cards, and lesson pages. Existing visual hierarchy and interactions remain intact.

## Android Browser Behavior

The implementation targets Android 8+ Chromium browsers, so it will not add FastClick or legacy JavaScript syntax polyfills. CSS will avoid relying on unstable viewport height alone; full-height mobile screens will prefer `100dvh` with a `100vh` fallback. Scrollable horizontal controls will use touch scrolling and avoid clipped focus or active states.

Buttons and other interactive controls will retain a touch target of at least 44px where practical. Input-specific keyboard handling is out of scope because the current application has no text-entry workflow.

## Files and Boundaries

- `src/styles.css`: global viewport, header/navigation, shared grids, and shared-card phone overrides.
- `src/features/*/*.css`: feature-local responsive overrides only when a page has unique grid, media, or fixed-size layout.
- `index.html` and React components: unchanged unless inspection finds an element whose markup prevents accessible scrolling or touch use.

## Validation

- Run the existing test suite and production build.
- Check each route at 360px, 390px, and 768px widths.
- Verify no horizontal document overflow, reachable navigation, stacked content panels, visible controls, and usable touch targets.
- Check reduced-motion rendering does not break content visibility or state feedback.

## Non-Goals

- Native Android app, APK packaging, or offline PWA work.
- Android 4-7 or non-Chromium legacy-browser support.
- Redesigning learning content, data, or application flows.

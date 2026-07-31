# Review Synchronized Image Loading Design

## Goal

Make the review prompt image and the two answer images appear as one visual group. Keep the first-screen wait limited to the current question's assets, and preload only the next prompt image while the learner answers.

## Scope

- Apply to the review question stage only.
- Gate each question on its prompt image plus the fixed `yes` and `no` option images.
- Preload the next question's prompt image after the current question becomes ready.
- Do not preload all eight prompt images.

## Behavior

1. When a question becomes current, mark its assets as not ready.
2. Load the current prompt, `yes`, and `no` images concurrently.
3. Keep the question layout's reserved space visible with a compact loading state while the assets load.
4. When all three requests settle, reveal the prompt, progress, instruction, and choices together with a short opacity transition.
5. Disable answer controls until the current visual group is ready.
6. After the current group is ready, begin a background preload of the next question's prompt image, unless the learner is on the final question.
7. Treat image-load errors as settled so an unavailable asset cannot block the learner indefinitely; the existing image element remains responsible for its fallback behavior.

## Implementation

- Add a small image-preload helper near `ReviewPage` that resolves on either `load` or `error`.
- Track readiness by question index, preventing a late request from a previous question from revealing a newer question.
- Derive the fixed option asset URLs from `FRUITS` so the render path and preloader cannot diverge.
- Add loading and ready-state CSS that preserves the existing responsive layout and uses reduced-motion-safe transitions.
- Add focused tests for the preload asset set and stale-request protection where existing review test conventions permit.

## Validation

- On first entry, no partial prompt/option image group appears before all current assets settle.
- After advancing, the next question's visual group appears together.
- Advancing through the final question creates no out-of-range preload.
- An image error still allows the question UI to become usable.

# Vocabulary Challenge Lobby Design

## Goal

Replace the initial "Vocabulary Challenge" tab view with the forest storybook layout from the supplied reference, while retaining the existing matching game after an explicit start action.

## Interaction

The challenge tab opens on a lobby with four learning-stat cards, course/review mode pills, the five color vocabulary items, and a cream-yellow start button. Selecting the start button opens the existing undersea matching game in place. No learning data, word images, audio, or matching rules change.

## Visual design

The lobby reuses the existing forest background and the page's storybook palette: translucent white cards, pale blue controls, and a cream-yellow primary action. The grid remains responsive and exposes the five existing color words.

## Validation

A component test will prove the challenge lobby renders the five words and that the start control changes the view to the existing matching game. The full test suite and production build will be run after the change.

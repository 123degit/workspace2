import { expect, it } from 'vitest';
import { questions } from './lesson';

it('maps every review prompt to its supplied image, answer, and narration', () => {
  expect(questions.map(({ sentence, image, answer, audio }) => ({ sentence, image, answer, audio }))).toEqual([
    { sentence: 'This is a lemon.', image: '/assets/docx/review-lemon.png', answer: 'yes', audio: '/music/This is a lemon..mp3' },
    { sentence: 'I can see some oranges.', image: '/assets/docx/review-cherries.png', answer: 'no', audio: '/music/I can see some oranges..mp3' },
    { sentence: 'This is a mango.', image: '/assets/docx/review-mango.png', answer: 'yes', audio: '/music/This is a mango..mp3' },
    { sentence: 'This is a cherry.', image: '/assets/docx/review-watermelon.png', answer: 'no', audio: '/music/This is a cherry..mp3' },
    { sentence: 'This is a banana.', image: '/assets/docx/review-cantaloupe.png', answer: 'no', audio: '/music/This is a banana..mp3' },
    { sentence: 'This is a melon.', image: '/assets/docx/review-melon.png', answer: 'yes', audio: '/music/This is a melon..mp3' },
    { sentence: "This isn't a strawberry.", image: '/assets/docx/review-strawberry.png', answer: 'no', audio: "/music/This isn't a strawberry..mp3" },
    { sentence: 'There are some mangoes.', image: '/assets/docx/review-mangoes.png', answer: 'yes', audio: '/music/There are some mangoes..mp3' },
  ]);
});

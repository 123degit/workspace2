export const colorQuestions = [
  { word: 'red', shownWord: 'red', image: '/assets/docx/red.png', audio: '/music/red拼读音频.mp3', answer: 'correct' },
  { word: 'black', shownWord: 'black', image: '/assets/docx/black.png', audio: '/music/black拼读音频.mp3', answer: 'correct' },
  { word: 'blue', shownWord: 'blue', image: '/assets/docx/blue.png', audio: '/music/blue拼读音频.mp3', answer: 'correct' },
  { word: 'green', shownWord: 'green', image: '/assets/docx/green.png', audio: '/music/green拼读音频.mp3', answer: 'correct' },
  { word: 'yellow', shownWord: 'yellow', image: '/assets/docx/yellow.png', audio: '/music/yellow拼读音频.mp3', answer: 'correct' },
];

export function speakColor(audio) {
  if (!audio) return;
  const player = new Audio(audio);
  player.play().catch(() => {});
}

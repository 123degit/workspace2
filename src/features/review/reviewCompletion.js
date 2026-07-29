export function getCompletionOverlay(stage) {
  if (stage !== 'summary') return null;

  return {
    title: '恭喜你完成今日课程！',
    artwork: '/assets/docx/review-completion-parrot.png',
    destination: '/report',
  };
}

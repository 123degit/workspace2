export async function playReviewAudio(src, audioFactory = (source) => new Audio(source)) {
  if (!src) return false;

  try {
    const audio = audioFactory(src);
    await audio.play();
    return true;
  } catch {
    return false;
  }
}

export function getReviewFeedbackAudio(result) {
  return result === 'correct' ? '/music/胜利 (1).mp3' : '/music/失败 (1).mp3';
}

export function getReviewReportMetric(reviewResult) {
  if (!reviewResult) {
    return {
      subtitle: '完成复习乐园后显示结果',
      progress: '0%',
      value: '待完成',
    };
  }

  return {
    subtitle: `答对 ${reviewResult.correct} / ${reviewResult.total} 题`,
    progress: `${reviewResult.score}%`,
    value: `${reviewResult.score}%`,
  };
}

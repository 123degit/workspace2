import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLearningStore } from '../../store/useLearningStore';
import { colorQuestions, speakColor } from './colorReview';
import { createReviewSummary } from './reviewLogic';
import { getReviewFeedbackAudio, playReviewAudio } from './reviewAudio';
import './colorReview.css';

const CORRECT_ART = '/assets/docx/20260723122549.png';
const WRONG_ART = '/assets/docx/20260723122552.png';
const CELEBRATION_ART = '/assets/docx/20260723154038.png';

export function ReviewPage() {
  const unlocked = useLearningStore((state) => state.videoDone);
  const setScore = useLearningStore((state) => state.setReviewScore);
  const setReviewResult = useLearningStore((state) => state.setReviewResult);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [result, setResult] = useState(null);
  const [summary, setSummary] = useState(false);
  const question = colorQuestions[questionIndex];

  useEffect(() => {
    if (unlocked && !summary) speakColor(question.audio);
  }, [question.audio, summary, unlocked]);

  const chooseFlag = (selection) => {
    if (result) return;
    const nextResult = selection === question.answer ? 'correct' : 'wrong';
    setResult(nextResult);
    playReviewAudio(getReviewFeedbackAudio(nextResult));
  };

  const nextQuestion = () => {
    const nextCorrectCount = correctCount + 1;
    if (questionIndex === colorQuestions.length - 1) {
      const reviewResult = createReviewSummary(nextCorrectCount, colorQuestions.length);
      setCorrectCount(nextCorrectCount);
      setScore(reviewResult.score);
      setReviewResult(reviewResult);
      setSummary(true);
      playReviewAudio('/music/胜利 (1).mp3');
      return;
    }
    setCorrectCount(nextCorrectCount);
    setQuestionIndex((index) => index + 1);
    setResult(null);
  };

  const retryQuestion = () => setResult(null);

  const restart = () => {
    setQuestionIndex(0);
    setCorrectCount(0);
    setResult(null);
    setSummary(false);
  };

  if (!unlocked) {
    return <div className="empty-state review-locked"><span aria-hidden="true">🔒</span><h2>复习乐园暂未开放</h2><p>完成今日学习视频后，就能来这里挑战颜色小游戏。</p><Link className="primary" to="/today">去完成视频学习</Link></div>;
  }

  if (summary) {
    return <main className="color-summary" aria-live="polite"><div className="color-ribbons" aria-hidden="true" /><section className="color-summary__panel"><img src={CELEBRATION_ART} alt="庆祝完成颜色复习的小鹦鹉" /><div className="summary-badge">完成挑战</div><h1>太棒啦，颜色游戏完成！</h1><p>你完成了 5 道颜色辨识题。</p><div className="summary-score"><b>{correctCount * 20}</b><span>分</span></div><div className="summary-actions"><button className="primary" onClick={restart}>再玩一次</button><Link className="secondary-button" to="/report">查看学习报告</Link></div></section></main>;
  }

  return <main className="color-review"><span className="color-progress">{questionIndex + 1} / {colorQuestions.length}</span><section className="color-review__game"><div className="color-board"><div className="color-board__card"><img className="color-board__swatch" src={question.image} alt={question.word} /><span>{question.shownWord}</span></div></div>{['correct', 'wrong'].map((flag) => <button className="flag-choice" key={flag} type="button" disabled={Boolean(result)} onClick={() => chooseFlag(flag)} aria-label={flag === 'correct' ? '正确' : '错误'}><span>{flag === 'correct' ? '√' : '×'}</span></button>)}</section>{result && <div className="color-feedback" aria-live="polite"><img src={result === 'correct' ? CORRECT_ART : WRONG_ART} alt={result === 'correct' ? '回答正确' : '回答错误'} /></div>}{result === 'correct' && <button className="primary color-next" onClick={nextQuestion}>{questionIndex === colorQuestions.length - 1 ? '查看总结' : '下一题'} →</button>}{result === 'wrong' && <button className="wrong-mark" type="button" onClick={retryQuestion}>再试一次</button>}</main>;
}

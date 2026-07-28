import { useState } from 'react';
import { Link } from 'react-router-dom';
import { questions } from '../../data/lesson';
import { useLearningStore } from '../../store/useLearningStore';
import { MediaFallback } from '../../components/ui/MediaFallback';
import { calculateReviewScore } from './reviewLogic';
import './review.css';

export function ReviewPage() {
  const unlocked = useLearningStore((state) => state.videoDone);
  const setScore = useLearningStore((state) => state.setReviewScore);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [choice, setChoice] = useState(null);
  const [finished, setFinished] = useState(false);

  if (!unlocked) {
    return <div className="empty-state review-locked"><span>🔒</span><h2>完成今日视频后解锁</h2><p>先去“今日学习”认识水果朋友吧</p><Link className="primary" to="/today">去今日学习 →</Link></div>;
  }

  if (finished) {
    const score = calculateReviewScore(correctCount, questions.length);
    return <div className="review-summary"><div className="confetti" aria-hidden="true">✦　✧　✦　✧　✦</div><div className="summary-badge">🎉</div><span className="eyebrow">复习乐园 · 完成啦</span><h1>你是水果小达人！</h1><p>今天的水果判断挑战全部完成</p><div className="summary-score"><b>{score}</b><span>分</span></div><div className="summary-stats"><span>答对 <b>{correctCount}</b> / {questions.length} 题</span><span>获得 <b>+20</b> 积分</span></div><div className="summary-actions"><button className="primary" onClick={() => { setQuestionIndex(0); setCorrectCount(0); setChoice(null); setFinished(false); }}>再玩一次</button><Link className="secondary-button" to="/vocabulary">去复习单词 →</Link></div></div>;
  }

  const question = questions[questionIndex];
  const answer = (value) => {
    if (choice) return;
    setChoice(value);
    if (value === question.answer) setCorrectCount((count) => count + 1);
  };
  const next = () => {
    if (questionIndex === questions.length - 1) {
      const finalCorrect = correctCount + (choice === question.answer ? 1 : 0);
      setScore(calculateReviewScore(finalCorrect, questions.length));
      setFinished(true);
    } else {
      setQuestionIndex((index) => index + 1);
      setChoice(null);
    }
  };
  const isCorrect = choice === question.answer;

  return <div className="review-experience"><div className="review-hero"><div><span className="eyebrow">复习乐园 · 水果大侦探</span><h1>听一听，选出正确的水果</h1><p>先听句子，再点击 Yes 或 No。答对会有惊喜动画哦！</p></div><div className="question-progress"><b>{questionIndex + 1}</b><span>/ {questions.length}</span><div className="progress-track"><i style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div></div></div><div className={`review-card ${choice ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}`}><div className="fruit-visual"><div className="sparkle sparkle-one">✦</div><div className="sparkle sparkle-two">✧</div><img src={question.image} alt="水果插画" onError={(event) => { event.currentTarget.style.display = 'none'; }} /><MediaFallback label="水果素材" /></div><div className="question"><div className="audio-line"><span>🔊 自动播放句子音频</span><button className="audio-button" aria-label="播放句子音频">▶</button></div><h2>{question.sentence}</h2><div className="answer-row"><button className="answer yes" disabled={Boolean(choice)} onClick={() => answer('yes')}>✓ Yes</button><button className="answer no" disabled={Boolean(choice)} onClick={() => answer('no')}>✕ No</button></div>{choice && <div className={isCorrect ? 'feedback good' : 'feedback bad'}><strong>{isCorrect ? '太棒了，回答正确！' : '再听一次，继续加油！'}</strong><span>{isCorrect ? '水果切开啦 ✨' : '水果抖一抖～'}</span><button onClick={next}>{questionIndex === questions.length - 1 ? '查看结果' : '下一题'} →</button></div>}</div></div><div className="review-tip">💡 小提示：听清楚句子里的水果名称，再做判断</div></div>;
}

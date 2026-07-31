import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { questions } from '../../data/lesson';
import { useLearningStore } from '../../store/useLearningStore';
import { createReviewSummary, getAnswerResult } from './reviewLogic';
import { getReviewFeedbackAudio, playReviewAudio } from './reviewAudio';
import { getFruitEffectAssets } from './reviewEffects';
import { getCompletionOverlay } from './reviewCompletion';
import { preloadImage, preloadImages } from './reviewAssets';
import './review.css';
import './review-position.css';
import './review-layout.css';

const FRUITS = {
  yes: { image: '/assets/docx/image21.png', cut: '/assets/docx/image22.png', label: 'Yes 西瓜' },
  no: { image: '/assets/docx/image24.png', cut: '/assets/docx/image25.png', label: 'No 菠萝' },
};

const FRUIT_IMAGE_SOURCES = Object.values(FRUITS).map((fruit) => fruit.image);

export function ReviewPage() {
  const unlocked = useLearningStore((state) => state.videoDone);
  const setScore = useLearningStore((state) => state.setReviewScore);
  const setReviewResult = useLearningStore((state) => state.setReviewResult);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [stage, setStage] = useState('question');
  const [assetsReady, setAssetsReady] = useState(false);

  const question = questions[questionIndex];

  useEffect(() => {
    let active = true;

    if (!unlocked) {
      setAssetsReady(false);
      return () => { active = false; };
    }

    setAssetsReady(false);
    preloadImages([question.image, ...FRUIT_IMAGE_SOURCES]).then(() => {
      if (!active) return;
      setAssetsReady(true);
      const nextQuestion = questions[questionIndex + 1];
      if (nextQuestion) preloadImage(nextQuestion.image);
    });

    return () => { active = false; };
  }, [question.image, questionIndex, unlocked]);

  const replayPrompt = () => playReviewAudio(question.audio);

  const retryQuestion = () => { setSelectedAnswer(null); setAnswerResult(null); setStage('question'); };

  useEffect(() => {
    if (unlocked && stage !== 'summary') replayPrompt();
  }, [questionIndex, stage, unlocked]);

  if (!unlocked) {
    return <div className="empty-state review-locked"><span aria-hidden="true">🔒</span><h2>复习乐园暂未开放</h2><p>完成今日课程视频后，就能来这里挑战听辨小游戏。</p><Link className="primary" to="/today">去完成今日学习</Link></div>;
  }

  const chooseAnswer = (selected) => {
    if (stage !== 'question' || !assetsReady) return;
    const result = getAnswerResult(question.answer, selected);
    setSelectedAnswer(selected);
    setAnswerResult(result);
    if (result === 'correct') setCorrectCount((count) => count + 1);
    setStage('answered');
    playReviewAudio(getReviewFeedbackAudio(result));
  };

  const advance = () => {
    if (questionIndex === questions.length - 1) {
      const finalCorrect = correctCount;
      const summary = createReviewSummary(finalCorrect, questions.length);
      setScore(summary.score);
      setReviewResult(summary);
      setStage('summary');
      return;
    }
    setQuestionIndex((index) => index + 1);
    setSelectedAnswer(null);
    setAnswerResult(null);
    setStage('question');
  };

  const restart = () => {
    setQuestionIndex(0);
    setCorrectCount(0);
    setSelectedAnswer(null);
    setAnswerResult(null);
    setStage('question');
  };

  const completionOverlay = getCompletionOverlay(stage);

  if (completionOverlay) {
    return <main className="review-experience review-completion-screen"><Link className="review-completion" to={completionOverlay.destination} aria-label="查看学习报告"><section className="review-completion__panel" aria-live="polite"><h1>{completionOverlay.title}</h1><img className="review-completion__artwork" src={completionOverlay.artwork} alt="庆祝完成课程的小鹦鹉" /></section></Link></main>;
  }

  if (stage === 'summary') {
    const summary = createReviewSummary(correctCount, questions.length);
    return <section className="review-summary" aria-live="polite"><div className="summary-confetti" aria-hidden="true">✦ ✦ ✦ ✦ ✦ ✦ ✦</div><div className="summary-badge">完成挑战</div><p className="eyebrow">Bobo 的水果听辨乐园</p><h1>太棒啦，挑战完成！</h1><p>你完成了 8 道水果听辨题。</p><div className="summary-score"><b>{summary.score}</b><span>分</span></div><div className="summary-stats"><span>答对 <b>{summary.correct}</b> / {summary.total} 题</span><span>获得 <b>+{summary.points}</b> 积分</span></div><div className="summary-actions"><button className="primary" onClick={restart}>再玩一次</button><Link className="secondary-button" to="/vocabulary">前往词句宝库</Link></div></section>;
  }

  return <main className={`review-experience review-stage--${stage} ${answerResult ? `review-stage--${answerResult}` : ''}`}><section className="review-stage"><div className={`review-question-group ${assetsReady ? 'review-question-group--ready' : ''}`} aria-busy={!assetsReady}><header className="prompt-strip"><div className="prompt-image"><img src={question.image} alt={`第 ${questionIndex + 1} 题图片`} /></div><div className="prompt-copy"><span className="prompt-number">{questionIndex + 1} / {questions.length}</span><strong className="prompt-sentence">{question.sentence}</strong></div><div className="prompt-progress" aria-label={`当前进度 ${questionIndex + 1} / ${questions.length}`}><i style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div></header><p className="review-instruction">听一听，判断图片和句子是否一致。</p><div className="fruit-choice">{Object.entries(FRUITS).map(([value, fruit]) => { const isSelected = selectedAnswer === value; const effects = getFruitEffectAssets(value); return <div className={`fruit-option fruit-option--${value} ${isSelected ? 'fruit-option--selected' : ''}`} key={value}><button className="answer" disabled={stage !== 'question' || !assetsReady} onClick={() => chooseAnswer(value)} aria-label={`选择 ${value}`}><img src={fruit.image} alt={fruit.label} /><span>{value}</span></button>{isSelected && answerResult === 'correct' && <><img className="fruit-cut" src={effects.cut} alt="回答正确" /><img className="fruit-sparkle" src={effects.sparkle} alt="" aria-hidden="true" /><img className="fruit-extra" src={effects.extra} alt="" aria-hidden="true" /></>}{isSelected && answerResult === 'wrong' && <button className="wrong-mark" type="button" onClick={retryQuestion} aria-label="重播题目音频">再听一次</button>}</div>; })}</div></div>{!assetsReady && <p className="review-loading" role="status">正在准备本题图片…</p>}<footer className="stage-controls">{stage === 'answered' && <div className={`feedback feedback--${answerResult}`} aria-live="polite"><strong>{answerResult === 'correct' ? '答对啦！水果切开咯！' : '再想一想，下一题继续加油！'}</strong><button onClick={advance}>{questionIndex === questions.length - 1 ? '查看总结' : '下一题'}</button></div>}</footer></section></main>;
}

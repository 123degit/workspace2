import { useLearningStore } from '../../store/useLearningStore';

export function ReportPage() {
  const state = useLearningStore();
  const metrics = [
    ['今日学习时长', '主课程 18 min · 自学 6 min', '24 min', '☀'],
    ['互动游戏正确率', '复习乐园 · 8 道题', `${state.reviewScore}%`, '✦'],
    ['单词朗读发音正确率', '课课清录音练习', '—', '🎙'],
    ['单词拼写正确率', '拼写大师', state.spellingScore ? `${state.spellingScore}%` : '—', 'Aa'],
    ['口语输出准确度', '趣味口语', state.speakingScore === null ? '—' : `${state.speakingScore}%`, '◔'],
  ];
  return <div className="report-page"><div className="page-title"><span className="eyebrow">成长反馈 · 2026.07.28</span><h1>今天的学习报告</h1><p>每一次尝试，都值得被看见和鼓励 ✨</p></div><div className="metric-grid">{metrics.map(([title, subtitle, value, icon], index) => <article className="metric" key={title}><div className="metric-icon">{icon}</div><div className="donut" style={{ '--progress': `${index === 1 ? state.reviewScore : 0}%` }}><span>{value}</span></div><h3>{title}</h3><p>{index === 4 && state.speakingScore === null ? '今日无趣味口语互动记录' : subtitle}</p></article>)}</div><section className="report-note"><span>🌱</span><div><b>今日学习建议</b><p>今天认识了 cherry、lemon、mango、melon、strawberry 五个水果单词。可以和家人玩“你画我猜”，用 It's a ... 的句式表达。</p></div></section></div>;
}

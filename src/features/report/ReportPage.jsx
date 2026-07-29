import { useLearningStore } from '../../store/useLearningStore';
import { getReviewReportMetric } from './reportMetrics';
import './report.css';

export function ReportPage() {
  const state = useLearningStore();
  const reviewMetric = getReviewReportMetric(state.reviewResult);
  const metrics = [
    ['学习时长', '主课程 10 min + 自学 12 min', '46%', '10 min'],
    ['互动游戏', reviewMetric.subtitle, reviewMetric.progress, reviewMetric.value],
    ['单词朗读', '发音正确率 95%', '95%', '95%'],
    ['单词拼写', '拼写正确率 85%', `${state.spellingScore || 85}%`, `${state.spellingScore || 85}%`],
    ['口语输出', '准确度 90%', `${state.speakingScore || 90}%`, `${state.speakingScore || 90}%`],
  ];

  return <div className="report-page"><div className="report-summary"><span>（用户名）</span><span>学习时长：65 min</span><span>积分：{state.points}</span><span>积分商城</span></div><img className="report-parrot" src="/assets/docx/image42.png" alt="" /><div className="report-metrics">{metrics.map(([title, subtitle, progress, value]) => <article className="report-metric" key={title}><h3>{title}</h3><div className="report-pie" style={{ '--progress': progress }}><span>{value}</span></div><p>{subtitle}</p></article>)}</div><section className="report-details"><div><b>学习内容</b><p>今天完成了水果主题课程，重点学习 lemon、mango、melon、cherry 等单词。</p></div><div><b>拓展学习</b><p>通过趣味口语和单词朗读练习，孩子的表达准确度持续提升。</p></div><div><b>学习建议</b><p>继续练习单词拼写，并和家人用 “It's a ...” 句式进行互动表达。</p></div></section></div>;
}

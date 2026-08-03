import { useLearningStore } from '../../store/useLearningStore';
import { MediaFallback } from '../../components/ui/MediaFallback';
import './today.css';

const lessons = ['颜色', '数字', '身体', '方向', '家人', '课堂', '居家', '形状', '动作', '情绪'];

export function TodayPage() {
  const done = useLearningStore((state) => state.videoDone);
  const complete = useLearningStore((state) => state.completeVideo);
  return <div className="today-page page-grid"><aside className="lesson-list"><div className="eyebrow">L1 · 今日课程</div><h1>今天学什么？</h1>{lessons.map((lesson, index) => <button className={index === 0 ? 'lesson selected' : 'lesson'} key={lesson} onClick={() => index === 0 && complete()}><span>L{index + 1}</span><b>{lesson}</b><em>{index === 0 && done ? '已完成' : index === 0 ? '学习中' : '待解锁'}</em></button>)}</aside><section className="lesson-stage"><div className="stage-head"><div><span className="pill">主课程 · 12 min</span><h2>Color Play</h2><p>认识 red、yellow、blue、green、orange</p></div><button className="primary" disabled>课程准备中</button></div><div className="video-card"><MediaFallback label="颜色课程准备中"/></div></section></div>;
}

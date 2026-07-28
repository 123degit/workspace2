import { useNavigate } from 'react-router-dom';
import { useLearningStore } from '../../store/useLearningStore';
import { MediaPlayer } from '../../components/ui/MediaPlayer';
import './today.css';

const lessons = ['水果', '学校', '手工', '游戏', '动作', '食物', '餐桌', '教室', '蔬菜', '服饰'];

export function TodayPage() {
  const navigate = useNavigate();
  const done = useLearningStore((state) => state.videoDone);
  const complete = useLearningStore((state) => state.completeVideo);
  return <div className="today-page page-grid"><aside className="lesson-list"><div className="eyebrow">L1 · 今日课程</div><h1>今天学什么？</h1>{lessons.map((lesson, index) => <button className={index === 0 ? 'lesson selected' : 'lesson'} key={lesson} onClick={() => index === 0 && complete()}><span>L{index + 1}</span><b>{lesson}</b><em>{index === 0 && done ? '已完成' : index === 0 ? '学习中' : '待解锁'}</em></button>)}</aside><section className="lesson-stage"><div className="stage-head"><div><span className="pill">主课程 · 12 min</span><h2>Bobo's Fruit Shop</h2><p>认识 cherry、lemon、mango、melon、strawberry</p></div><button className="primary" onClick={() => { complete(); navigate('/review'); }}>{done ? '进入复习乐园' : '播放课程'} <span>→</span></button></div><div className="video-card"><MediaPlayer src="/media/l1-bobos-fruit-shop.mp4" label="L1 主课程视频"/><div className="video-caption"><span>▶</span><div><b>点按播放学习视频</b><small>课程结束后即可解锁复习乐园</small></div></div></div></section></div>;
}

import { useState } from 'react';
import './extension.css';

const courses = [
  { title: '趣味口语', progress: '1/2', tone: 'cyan', image: '/assets/docx/image40-transparent.png', bubble: 'hello' },
  { title: '音标发音', progress: '1/2', tone: 'blue', image: '/assets/docx/image41-transparent.png', bubble: '/æ/' },
  { title: '儿歌', progress: '30/30', tone: 'yellow', image: '/assets/docx/image42-transparent.png' },
  { title: '字母', progress: '26/26', tone: 'pink', image: '/assets/docx/image43-transparent.png' },
  { title: '绘本', progress: '10/12', tone: 'orange', image: '/assets/docx/image44-transparent.png' },
  { title: '动画', progress: '10/10', tone: 'purple', image: '/assets/docx/image45-transparent.png' },
];

export function ExtensionPage() {
  const [selected, setSelected] = useState(null);
  return <div className="extension-page"><div className="extension-stats"><span>（用户名）</span><span>学习时长：55 min</span><span>积分：130</span><span>积分商城</span></div><div className="extension-grid">{courses.map((course) => <button key={course.title} className={`extension-card ${course.tone} ${selected === course.title ? 'selected' : ''}`} onClick={() => setSelected(course.title)}><img src={course.image} alt="" /><strong>{course.title}</strong><small>已完成：{course.progress}</small></button>)}</div>{selected && <div className="extension-toast">已选择「{selected}」，准备开始学习</div>}</div>;
}

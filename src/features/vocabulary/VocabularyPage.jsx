import { useState } from 'react';
import { words } from '../../data/lesson';
import { useLearningStore } from '../../store/useLearningStore';
import { MediaFallback } from '../../components/ui/MediaFallback';
import { isSpellingComplete, calculateMatchScore } from './vocabularyLogic';
import './vocabulary.css';

const tabs = ['课课清', '拼写大师', '滚动复习', '词汇大闯关'];

function WordCard({ word, index, onPrevious, onNext }) {
  return <section className="word-card"><div className="word-image"><img src={word.image} alt={word.word} onError={(event) => { event.currentTarget.style.display = 'none'; }} /><MediaFallback label="单词卡插画" /></div><div className="word-info"><span className="word-tag">FRUIT · L1</span><h2>{word.word}</h2><p className="phonetic">{word.phonetic} <button>🔊</button></p><div className="meaning">{word.meaning}</div><div className="spelling">{word.spelling.map((part, partIndex) => <span key={`${part}-${partIndex}`}>{part}</span>)}</div><p className="sentence">“{word.sentence}”</p><button className="record">🎙 录下你的发音</button></div><div className="card-nav"><button onClick={onPrevious}>←</button><span>{index + 1} / {words.length}</span><button onClick={onNext}>→</button></div></section>;
}

function SpellingGame() {
  const setScore = useLearningStore((state) => state.setSpellingScore);
  const [wordIndex, setWordIndex] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [message, setMessage] = useState('');
  const word = words[wordIndex];
  const place = (part) => { if (placed.length < word.spelling.length) setPlaced((items) => [...items, part]); };
  const check = () => { const correct = isSpellingComplete(placed, word.spelling); setMessage(correct ? '拼对啦！太棒了 ✨' : '顺序不对，再试一次'); if (correct) setScore(100); };
  const next = () => { setWordIndex((index) => (index + 1) % words.length); setPlaced([]); setMessage(''); };
  return <div className="game-panel spelling-game"><div className="game-panel-head"><div><span className="eyebrow">拼写大师 · {wordIndex + 1}/{words.length}</span><h2>把字母拖到荷叶上</h2></div><button className="audio-button">🔊</button></div><div className="spelling-visual"><div className="game-word-image"><img src={word.image} alt={word.word} /><small>点击图片听单词</small></div><div className="leaf-board">{word.spelling.map((_, index) => <span key={index}>{placed[index] || '·'}</span>)}</div></div><div className="letter-tray">{word.spelling.map((part, index) => <button draggable onDragStart={(event) => event.dataTransfer.setData('text/plain', part)} onClick={() => place(part)} key={`${part}-${index}`}>{part}</button>)}</div><div className="game-actions"><button className="secondary-button" onClick={() => { setPlaced([]); setMessage(''); }}>重置</button><button className="primary" onClick={check}>检查答案 →</button>{message && <button className="secondary-button" onClick={next}>{message.includes('拼对') ? '下一词' : '继续尝试'}</button>}</div>{message && <p className="game-message">{message}</p>}</div>;
}

function MatchGame() {
  const setScore = useLearningStore((state) => state.setMatchingScore);
  const [selectedWord, setSelectedWord] = useState(null);
  const [matched, setMatched] = useState([]);
  const [message, setMessage] = useState('');
  const chooseImage = (word) => { if (!selectedWord || matched.includes(word.word)) return; if (selectedWord === word.word) { const next = [...matched, word.word]; setMatched(next); setMessage('配对正确！'); if (next.length === words.length) setScore(calculateMatchScore(next.length, words.length)); } else setMessage('再想一想，这不是它'); setSelectedWord(null); };
  return <div className="game-panel match-game"><div className="game-panel-head"><div><span className="eyebrow">词汇大闯关 · 5 题</span><h2>把单词送到对应的水果</h2></div><span className="progress">{matched.length} / {words.length}</span></div><p className="game-instruction">先点击左侧单词，再点击右侧图片完成配对。</p><div className="match-board"><div className="match-words">{words.map((word) => <button className={selectedWord === word.word ? 'match-word active' : 'match-word'} disabled={matched.includes(word.word)} onClick={() => setSelectedWord(word.word)} key={word.word}>{word.word}</button>)}</div><div className="match-images">{words.map((word) => <button className={matched.includes(word.word) ? 'match-image matched' : 'match-image'} onClick={() => chooseImage(word)} key={word.word}><img src={word.image} alt={word.word} onError={(event) => { event.currentTarget.style.display = 'none'; }} /><b>{matched.includes(word.word) ? '✓ ' : ''}{word.word}</b></button>)}</div></div>{message && <p className="game-message">{matched.length === words.length ? '全部配对成功，太厉害了！🎉' : message}</p>}</div>;
}

export function VocabularyPage() {
  const [tab, setTab] = useState('课课清');
  const [index, setIndex] = useState(0);
  const word = words[index];
  const changeIndex = (offset) => setIndex((current) => (current + offset + words.length) % words.length);
  return <div className="vocab-page"><div className="vocab-head"><div><span className="eyebrow">词句宝库</span><h1>{tab}</h1></div><div className="subnav">{tabs.map((item) => <button className={tab === item ? 'active' : ''} onClick={() => setTab(item)} key={item}>{item}</button>)}</div></div>{tab === '拼写大师' ? <SpellingGame /> : tab === '词汇大闯关' ? <MatchGame /> : <div className="word-layout"><aside className="word-list"><span>本课词汇 · 5</span>{words.map((item, itemIndex) => <button className={itemIndex === index ? 'active' : ''} onClick={() => setIndex(itemIndex)} key={item.word}><b>{item.word}</b><small>{item.meaning}</small></button>)}<button className="spell-link" onClick={() => setTab('拼写大师')}>✦ 去玩拼写大师 →</button></aside><WordCard word={word} index={index} onPrevious={() => changeIndex(-1)} onNext={() => changeIndex(1)} /></div>}</div>;
}

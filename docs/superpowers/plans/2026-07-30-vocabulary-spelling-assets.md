# 拼写大师素材配置实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让荷叶拼写大师按截图中的五个水果词顺序展示正确的拼读分块、图片和拼读音频。

**Architecture:** `src/data/lesson.js` 中的 `words` 继续作为题目唯一来源，并为每个词条增加音频路径。`SpellingGame` 读取当前词条的音频字段，在图片和音频按钮交互时播放该文件；现有荷叶布局和额外空白伪元素保持不变。

**Tech Stack:** React、Zustand、Vite、Vitest。

## Global Constraints

- 题目严格按 `cherry`、`lemon`、`mango`、`melon`、`strawberry` 顺序。
- 分块严格为 `ch-e-rr-y`、`l-e-m-o-n`、`m-a-n-g-o`、`m-e-l-o-n`、`s-tr-aw-b-e-rr-y`。
- 音频必须来自 `public/music/<单词>拼读音频.mp3`，图片必须来自现有 `public/assets/docx`。
- 不修改 `.letter-tray::after`，不新增自动化测试。

---

### Task 1: 配置拼写题目素材

**Files:**
- Modify: `src/data/lesson.js`

**Interfaces:**
- Produces: `words` 中每项包含 `word`、`spelling`、`image`、`audio`。

- [ ] **Step 1: 更新五个词条的顺序和资源字段**

```js
{ word: 'cherry', spelling: ['ch', 'e', 'rr', 'y'], image: '/assets/docx/image1.jpeg', audio: '/music/cherry拼读音频.mp3' }
{ word: 'lemon', spelling: ['l', 'e', 'm', 'o', 'n'], image: '/assets/docx/image2.png', audio: '/music/lemon拼读音频.mp3' }
{ word: 'mango', spelling: ['m', 'a', 'n', 'g', 'o'], image: '/assets/docx/image3.png', audio: '/music/mango拼读音频.mp3' }
{ word: 'melon', spelling: ['m', 'e', 'l', 'o', 'n'], image: '/assets/docx/image4.png', audio: '/music/melon拼读音频.mp3' }
{ word: 'strawberry', spelling: ['s', 'tr', 'aw', 'b', 'e', 'rr', 'y'], image: '/assets/docx/image5.png', audio: '/music/strawberry拼读音频.mp3' }
```

- [ ] **Step 2: 检查资源文件均存在**

Run: `Get-ChildItem public/music/*拼读音频.mp3; Get-ChildItem public/assets/docx/image1.jpeg,public/assets/docx/image2.png,public/assets/docx/image3.png,public/assets/docx/image4.png,public/assets/docx/image5.png`

Expected: 返回五个音频和五个图片文件。

### Task 2: 接入拼读音频交互

**Files:**
- Modify: `src/features/vocabulary/VocabularyPage.jsx`

**Interfaces:**
- Consumes: 当前 `word.audio`。
- Produces: 图片和音频按钮均调用同一播放函数。

- [ ] **Step 1: 新增当前词条播放函数**

```js
const playSpellingAudio = () => {
  const audio = new Audio(word.audio);
  void audio.play();
};
```

- [ ] **Step 2: 绑定图片和音频按钮**

```jsx
<button className="game-word-image" type="button" onClick={playSpellingAudio}>
  <img src={word.image} alt={word.word} />
  <small>点击图片听单词</small>
</button>
<button className="audio-button" type="button" onClick={playSpellingAudio} aria-label="播放拼读音频">🔊</button>
```

- [ ] **Step 3: 保持现有荷叶伪元素和拼写交互不变**

Do not modify: `src/features/vocabulary/vocabulary.css` rules for `.letter-tray::after`.

### Task 3: 回归验证

**Files:**
- Verify: `src/features/vocabulary/VocabularyPage.jsx`
- Verify: `src/data/lesson.js`

- [ ] **Step 1: 运行现有测试**

Run: `pnpm test`

Expected: 所有现有 Vitest 测试通过。

- [ ] **Step 2: 执行生产构建**

Run: `pnpm build`

Expected: Vite 输出 `built`，且没有编译错误。

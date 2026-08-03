# Android 拼写触摸拖拽实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为安卓拼写游戏提供与网页端相同的按住、拖动、松手放置操作。

**Architecture:** 抽取拼写槽的命中判定函数，通过注入的 `elementFromPoint` 查询可测试地解析槽位索引。组件使用 Pointer Events 创建指针跟随的拖拽预览，松手后复用现有的放置和校验逻辑；鼠标端 HTML5 拖放保持不变。

**Tech Stack:** React、Pointer Events、Vite、Vitest。

## Global Constraints

- 触摸端保持拖拽操作，不退化为点选。
- 保留桌面 HTML5 拖放与现有音效、计分逻辑。
- 不新增依赖，不创建提交。

---

### Task 1: 测试槽位命中判定

**Files:**
- Modify: `src/features/vocabulary/vocabularyLogic.js`
- Modify: `src/features/vocabulary/vocabularyLogic.test.js`

- [ ] 添加 `findSpellingDropTarget(elementFromPoint, clientX, clientY)` 的失败测试：命中带 `data-spelling-target` 的后代元素时返回数字索引，未命中时返回 `null`。
- [ ] 运行 `pnpm.cmd test --run src/features/vocabulary/vocabularyLogic.test.js`，确认失败。
- [ ] 编写最小实现并重新运行定向测试。

### Task 2: 接入触摸指针拖拽

**Files:**
- Modify: `src/features/vocabulary/VocabularyPage.jsx`
- Modify: `src/features/vocabulary/spellingDrag.css`

- [ ] 抽取现有放置逻辑，使 HTML5 拖放和 Pointer Events 共用。
- [ ] 在触摸 `pointerdown` 记录字母索引和指针位置；在移动时更新拖拽预览；在松手时用命中判定执行放置。
- [ ] 为拖拽预览增加固定定位、忽略指针事件的视觉样式，并为拖动字母提供触摸行为约束。
- [ ] 运行相关测试。

### Task 3: 验证回归

- [ ] 运行 `pnpm.cmd test --run`、`pnpm.cmd build`、`git diff --check`。

# Android 拼写页一屏适配实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在安卓窄屏上保持拼写大师一屏操作，且不裁切单词图、字母卡片或拼写槽。

**Architecture:** 保留现有的动态视口高度和页面级禁止滚动。仅调整窄屏拼写游戏 CSS：用显式的三段式网格将可用高度分配给单词图、树叶字母区和拼写槽；通过 `clamp()` 与短屏高度媒体查询压缩视觉元素。文本样式契约测试保护关键限制条件。

**Tech Stack:** React、Vite、CSS Media Queries、Vitest。

## Global Constraints

- 仅在 `max-width: 480px` 的拼写游戏规则内生效。
- 页面保持 `100dvh` 与 `overflow: hidden`，不开放纵向页面滚动。
- 不修改游戏逻辑、资源文件、路由或依赖。
- 不创建提交。

---

### Task 1: 定义短屏一屏布局契约

**Files:**
- Modify: `src/mobileStyles.test.js`

**Interfaces:**
- Consumes: `src/features/vocabulary/vocabulary.css` 的文本内容。
- Produces: 对可伸缩三段式拼写游戏及短屏压缩规则的回归断言。

- [ ] **Step 1: 写入失败的样式断言**

在现有拼写游戏断言中增加以下字符串断言：

```js
expect(vocabularyStyles).toContain('grid-template-rows:clamp(112px,20dvh,150px) minmax(0,1fr) clamp(52px,9dvh,62px)');
expect(vocabularyStyles).toContain('@media (max-width:480px) and (max-height:700px)');
expect(vocabularyStyles).toContain('.vocab-page--mobile-game .spelling-game .game-word-image{height:112px}');
```

- [ ] **Step 2: 运行定向测试确认失败**

运行：`pnpm test --run src/mobileStyles.test.js`

预期：测试失败，提示新增布局片段缺失。

### Task 2: 实现可伸缩的一屏拼写布局

**Files:**
- Modify: `src/features/vocabulary/vocabulary.css`

**Interfaces:**
- Consumes: `.vocab-page--mobile-game`、`.spelling-game`、`.spelling-visual`、`.game-word-image`、`.leaf-board`、`.letter-tray`。
- Produces: 高度受限安卓设备可完整显示的拼写游戏布局。

- [ ] **Step 1: 实现默认窄屏三段式网格**

替换窄屏拼写视觉区的固定行高：

```css
.vocab-page--mobile-game .spelling-visual{
  height:100%;
  display:grid;
  grid-template-rows:clamp(112px,20dvh,150px) minmax(0,1fr) clamp(52px,9dvh,62px);
  gap:4px;
}
```

将单词图高度和图片高度改为可收缩值，并让树叶区行高随可用高度收缩。

- [ ] **Step 2: 增加极短屏压缩规则**

添加 `@media (max-width:480px) and (max-height:700px)`，把单词图高度设为 `112px`，减小树叶区的内边距、行高、字重字号与拼写槽间距，同时保持每个交互目标不小于 44px。

- [ ] **Step 3: 运行定向测试确认通过**

运行：`pnpm test --run src/mobileStyles.test.js`

预期：该测试文件全部通过。

### Task 3: 验证生产构建与变更边界

**Files:**
- Verify: `src/mobileStyles.test.js`
- Verify: `src/features/vocabulary/vocabulary.css`

**Interfaces:**
- Consumes: 全部 Vitest 测试与 Vite 构建配置。
- Produces: 已验证的安卓一屏适配改动。

- [ ] **Step 1: 运行全量测试**

运行：`pnpm test --run`

预期：所有测试通过。

- [ ] **Step 2: 构建生产包**

运行：`pnpm build`

预期：Vite 构建完成且退出码为 0。

- [ ] **Step 3: 检查补丁格式**

运行：`git diff --check`

预期：无输出且退出码为 0。

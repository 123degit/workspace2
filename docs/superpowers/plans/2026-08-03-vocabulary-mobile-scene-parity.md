# Android 拼写场景一致性实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让安卓拼写页在一屏内保留桌面版完整场景层级与互动元素。

**Architecture:** 删除移动端将拼写场景改为普通网格流的覆盖规则，恢复相对桌面版的绝对定位结构。移动端只通过容器约束、`clamp()` 和短屏高度规则缩放舞台元素，并以文本样式契约保护关键定位关系。

**Tech Stack:** React、Vite、CSS Media Queries、Vitest。

## Global Constraints

- 仅调整 `max-width: 480px` 下的拼写游戏样式。
- 保留一屏体验、现有游戏交互和桌面布局。
- 不新增依赖，不创建提交。

---

### Task 1: 定义手机场景一致性契约

**Files:**
- Modify: `src/mobileStyles.test.js`

- [ ] 添加失败断言，要求移动端的单词卡保持绝对定位、树叶字母区保持绝对定位，并禁止旧的静态网格覆盖。
- [ ] 运行 `pnpm.cmd test --run src/mobileStyles.test.js`，确认因新契约缺失而失败。

### Task 2: 恢复场景布局并缩放

**Files:**
- Modify: `src/features/vocabulary/vocabulary.css`

- [ ] 让手机拼写舞台保持相对定位、溢出隐藏和完整背景比例。
- [ ] 将单词卡固定在右上、树叶字母区固定在底部，并保留拼写槽在场景中部。
- [ ] 用 `clamp()` 和 `max-height: 700px` 缩小场景元素而不隐藏互动目标。
- [ ] 运行定向样式测试，确认通过。

### Task 3: 验证构建结果

**Files:**
- Verify: `src/mobileStyles.test.js`
- Verify: `src/features/vocabulary/vocabulary.css`

- [ ] 运行 `pnpm.cmd test --run`、`pnpm.cmd build` 和 `git diff --check`。
- [ ] 验证手机场景不含旧的静态网格覆盖规则。

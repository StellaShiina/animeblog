# AnimeBlog - ACGN 二次元文化分享博客 🎀

> [!NOTE]
> 此README由AI生成

这是一个使用 Astro + Tailwind CSS + Framer Motion 开发的可爱粉嫩风格二次元分享博客。

## ✨ 特性

-   **可爱粉嫩风格**：专为二次元爱好者设计的视觉体验。
-   **全响应式**：支持大中小屏设备。
-   **亮/暗/系统主题**：完美适配各种光线环境。
-   **MDX 支持**：博客内容支持 Markdown 及 React 组件扩展。
-   **背景音乐**：支持为每篇博客配置专属 BGM。
-   **强大筛选**：支持搜索、分类、标签、时间线排序。
-   **高性能**：基于 Astro 6，纯静态导出，加载飞快。

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

## 📝 如何发布新博客？

本博客使用 Astro 的 Content Collections 管理内容。发布新博客非常简单：

1.  在 `src/content/blog/` 目录下创建一个新的 `.md` 或 `.mdx` 文件。
2.  在文件顶部添加 Frontmatter 配置：

```markdown
---
title: "你的文章标题"
description: "文章简短描述"
pubDate: "2024-03-24"
heroImage: "封面图链接"
category: "分类名称"
tags: ["标签1", "标签2"]
music: "背景音乐直链"
---

这里开始写你的正文内容...
```

3.  保存并提交 Git，触发自动化部署（如果配置了 CI/CD）。

## 🛠️ 可扩展性说明

-   **新增页面**：在 `src/pages/` 目录下添加 `.astro` 文件即可。
-   **自定义样式**：修改 `src/styles/global.css` 中的主题变量。
-   **新增组件**：在 `src/components/` 目录下创建 React 组件，并在 Astro 页面中使用 `client:load` 等指令激活。

## 🎨 样式规范

-   **主色调**：`#ff85a1` (粉色)
-   **圆角**：`1.5rem` (超圆润)
-   **阴影**：自定义实心阴影，模拟二次元描边效果。

---

祝你在二次元的世界里玩得开心！✨

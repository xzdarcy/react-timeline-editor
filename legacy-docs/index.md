---
title: 介绍
toc: 'menu'
---


## react timeline editor

`react-timeline-editor` 是基于react开发的，用于快速搭建时间线编辑能力的组件。

主要可用于构建动画编辑器、视频编辑器等。

![timeline](/assets/timeline.gif)


## ✨ 特性

- 🛠 支持拖拽、缩放模式，并提供方便的控制钩子。
- 🔗 提供网格吸附能力、辅助线吸附等交互能力。
- 🏷 自动识别动作长度，并无限滚动。
- 🎨 可快速便捷定制样式。
- 📡 提供强解藕的运行器能力，可脱离编辑器独立运行。

## 快速上手

```
npm install @xzdarcy/react-timeline-editor
```

```tsx | pure
import React from 'react';
import { Timeline } from '@xzdarcy/react-timeline-editor';

export const TimelineEditor = () => {
  return (
    <Timeline     
      editorData={[]}
      effects={{}}
    />
  )
}
```

## Props
<API hideTitle src="../src/components/timeline.tsx"></API>


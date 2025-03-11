---
title: 介绍
toc: 'menu'
group: 
  title: 运行器
---

## 运行器

我们提供了解藕于编辑器的运行器，用于运行编辑器生产的数据。

你可以通过定义每个<code><a href="/data#timelineeffect">TimelineEffect</a></code>中的运行能力（音频播放、动画播放等等），来实现你自己的运行体系。

+ 🛠 提供设置时间、设置运行速率等能力
+ ⚙️ 可独立使用


## 示例

你可以在以下两种场景中使用运行器：

### 编辑时运行
> 编辑器内置了一个运行器，提供了<code><a href="/data#timelinestate">TimelineState</a></code>用于更便捷的操控运行器。
> 
> 我们不提供默认的运行器样式，你需要自定义样式
> 
> 你可以通过监听器，很轻松的获取运行数据变化，从而定制自己的运行器样式

<code src="./engine-basic/index.tsx"></code>

### 独立使用

> 你也可以在任意地方使用运行器运行编辑器生产的数据
> 
> 这对于当你想要<b style="color: #a87654">编辑时</b>和<b style="color: #a87654">运行时</b>共用一套数据和运行能力时非常有用

<code src="./engine-standalone/index.tsx"></code>

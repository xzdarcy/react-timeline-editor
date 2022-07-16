---
title: API
group: 
  title: 运行器
---

## 运行器 API

### isPlaying

`boolean` 运行器是否正在运行

### isPaused

`boolean` 运行器是否停止

### effects

*setter*  <code>Record<string,<a href="/data#timelineeffect">TimelineEffect</a>></code> 运行效果

### data

*setter*  <code><a href="/data#timelinerow">TimelineRow</a>[]</code> 运行数据

### setPlayRate

`(rate: number) => void` 设置播放速率

### getPlayRate

`() => number` 获取播放速率

### setTime

`(time: number) => void` 设置播放时间

### getTime

`() => number` 获取播放时间

### reRender

`() => void` 重新渲染当前时间

### play

`(param: {toTime?: number; autoEnd?: boolean}) => boolean` 

从当前time开始播放（可通过`setTime`设置），返回是否播放成功
+ toTime (可选): 播放截止时间 
+ autoEnd (可选): 是否在播完全部actions后自动停止

```ts | pure
import { TimelineEngine } from '@xzdarcy/react-timeline-editor';
const engine = new TimelineEngine();
engine.play({autoEnd: true})
```

### pause

`() => void` 暂停

### listener

你可以监听运行器提供的一些事件，并响应逻辑

```ts | pure
import { TimelineEngine } from '@xzdarcy/react-timeline-editor';
const engine = new TimelineEngine();
```

+ `setTimeByTick`: 运行器tick引起的时间变化
```ts | pure
engine.on('setTimeByTick', ({time, engine}) => {...})
```

+ `beforeSetTime`: 设置时间前(手动)(可通过`return false`阻止设置)
```ts | pure
engine.on('beforeSetTime', ({time, engine}) => {...})
```

+ `afterSetTime`: 设置时间后(手动)
```ts | pure
engine.on('afterSetTime', ({time, engine}) => {...})
```

+ `beforeSetPlayRate`: 设置运行速率前(可通过`return false`阻止设置)
```ts | pure
engine.on('beforeSetPlayRate', ({rate, engine}) => {...})
```

+ `afterSetPlayRate`: 设置运行速率后
```ts | pure
engine.on('afterSetPlayRate', ({rate, engine}) => {...})

```

+ `play`: 监听运行事件
```ts | pure
engine.on('play', ({engine}) => {...})
```

+ `paused`: 监听暂停事件
```ts | pure
engine.on('paused', ({engine}) => {...})
```

+ `ended`: 监听播放完成事件
```ts | pure
engine.on('ended', ({engine}) => {...})
```

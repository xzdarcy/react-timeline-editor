---
title: 数据定义
toc: 'menu'
---

## TimelineRow

> 编辑器数据：行数据结构

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>描述</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
    <tr>
      <td>id</td>
      <td>动作行id</td>
      <td>
        <code>string</code>
      </td>
      <td>
        <code>（必选）</code>
      </td>
    </tr>
    <tr>
      <td>actions</td>
      <td>行的动作列表</td>
      <td>
        <code><a href="/data#timelineaction">TimelineAction</a>[]</code>
      </td>
      <td>
        <code>（必选）</code>
      </td>
    </tr>
    <tr>
      <td>rowHeight</td>
      <td>自定义行高（默认由props中的rowHeight决定）</td>
      <td>
        <code>number</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
    <tr>
      <td>selected</td>
      <td>行是否选中</td>
      <td>
        <code>boolean</code>
      </td>
      <td>
        <code>false</code>
      </td>
    </tr>
    <tr>
      <td>classNames</td>
      <td>行的扩展类名</td>
      <td>
        <code>string[]</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
</table>


## TimelineAction

> 编辑器数据：动作数据结构

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>描述</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
    <tr>
      <td>id</td>
      <td>动作id</td>
      <td>
        <code>string</code>
      </td>
      <td>
        <code>（必选）</code>
      </td>
    </tr>
    <tr>
      <td>start</td>
      <td>动作开始时间</td>
      <td>
        <code>number</code>
      </td>
      <td>
        <code>（必选）</code>
      </td>
    </tr>
    <tr>
      <td>end</td>
      <td>动作结束时间</td>
      <td>
        <code>number</code>
      </td>
      <td>
        <code>（必选）</code>
      </td>
    </tr>
    <tr>
      <td>effectId</td>
      <td>动作所对应的效果id索引</td>
      <td>
        <code>string</code>
      </td>
      <td>
        <code>（必选）</code>
      </td>
    </tr>
    <tr>
      <td>selected</td>
      <td>动作是否被选中</td>
      <td>
        <code>boolean</code>
      </td>
      <td>
        <code>false</code>
      </td>
    </tr>
    <tr>
      <td>flexible</td>
      <td>动作是否可伸缩</td>
      <td>
        <code>boolean</code>
      </td>
      <td>
        <code>true</code>
      </td>
    </tr>
    <tr>
      <td>movable</td>
      <td>动作是否可移动</td>
      <td>
        <code>boolean</code>
      </td>
      <td>
        <code>true</code>
      </td>
    </tr>
    <tr>
      <td>disable</td>
      <td>禁止动作运行</td>
      <td>
        <code>boolean</code>
      </td>
      <td>
        <code>false</code>
      </td>
    </tr>
    <tr>
      <td>minStart</td>
      <td>动作最小开始时间限制</td>
      <td>
        <code>number</code>
      </td>
      <td>
        <code>0</code>
      </td>
    </tr>
    <tr>
      <td>maxEnd</td>
      <td>动作最大结束时间限制</td>
      <td>
        <code>number</code>
      </td>
      <td>
        <code>Number.MAX_VALUE</code>
      </td>
    </tr>
</table>

## TimelineEffect

> 编辑器运行效果数据结构

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>描述</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
    <tr>
      <td>id</td>
      <td>效果id</td>
      <td>
        <code>string</code>
      </td>
      <td>
        <code>（必选）</code>
      </td>
    </tr>
     <tr>
      <td>name</td>
      <td>效果名称</td>
      <td>
        <code>string</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
     <tr>
      <td>source</td>
      <td>效果运行代码</td>
      <td>
        <code>TimeLineEffectSource</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
</table>

### TimeLineEffectSource 

> 编辑器效果运行代码数据结构

+ start 触发条件
  + 运行器开始play时，如时间在当前action时间范围内触发
+ enter 触发条件
  + 从非action时间区域进入当前action时间区域
+ update 触发条件
  + 播放当前action时每帧触发（包括reRender）
  + reRender时触发
+ leave 触发条件
  + 从当前action时间区域离开
+ stop 触发条件
  + 运行器pause时，如时间在当前action时间范围内触发

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>描述</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
    <tr>
      <td>start</td>
      <td>在当前动作时间区域开始播放时回调</td>
      <td>
        <code>(param: EffectSourceParam) => void</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
     <tr>
      <td>enter</td>
      <td>时间进入动作时执行回调</td>
      <td>
        <code>(param: EffectSourceParam) => void</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
     <tr>
      <td>update</td>
      <td> 动作更新时回调</td>
      <td>
        <code>(param: EffectSourceParam) => void</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
     <tr>
      <td>leave</td>
      <td> 时间离开动作时执行回调</td>
      <td>
        <code>(param: EffectSourceParam) => void</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
     <tr>
      <td>stop</td>
      <td> 在当前动作时间区域停止播放时回调</td>
      <td>
        <code>(param: EffectSourceParam) => void</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
</table>

### EffectSourceParam

> 编辑器效果运行代码参数

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>描述</th>
      <th>类型</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
    <tr>
      <td>time</td>
      <td>当前播放时间</td>
      <td>
        <code>number</code>
      </td>
    </tr>
    <tr>
      <td>isPlaying</td>
      <td>是否正在播放</td>
      <td>
        <code>boolean</code>
      </td>
    </tr>
     <tr>
      <td>action</td>
      <td>动作</td>
      <td>
        <code><a href="/data#timelineaction">TimelineAction</a></code>
      </td>
    </tr>
     <tr>
      <td>effect</td>
      <td>动作效果</td>
      <td>
        <code><a href="/data#timelineeffect">TimelineEffect</a></code>
      </td>
    </tr>
     <tr>
      <td>engine</td>
      <td>运行器</td>
      <td>
        <code>TimelineEngine</code>
      </td>
    </tr>
</table>

## TimelineState

> timeline组件数据

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>描述</th>
      <th>类型</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
    <tr>
      <td>target</td>
      <td>timeline所属的dom节点</td>
      <td>
        <code>HTMLElement</code>
      </td>
    </tr>
     <tr>
      <td>listener</td>
      <td>运行监听器</td>
      <td>
        <code>Emitter</code>
      </td>
    </tr>
     <tr>
      <td>isPlaying</td>
      <td>是否正在播放</td>
      <td>
        <code>boolean</code>
      </td>
    </tr>
     <tr>
      <td>isPaused</td>
      <td>是否暂停中</td>
      <td>
        <code>boolean</code>
      </td>
    </tr>
     <tr>
      <td>setTime</td>
      <td>设置当前播放时间</td>
      <td>
        <code>(time: number) => void</code>
      </td>
    </tr>
     <tr>
      <td>getTime</td>
      <td>获取当前播放时间</td>
      <td>
        <code>() => number</code>
      </td>
    </tr>
     <tr>
      <td>setPlayRate</td>
      <td>设置播放速率</td>
      <td>
        <code>(rate: number) => void</code>
      </td>
    </tr>
     <tr>
      <td>getPlayRate</td>
      <td>设置播放速率</td>
      <td>
        <code>() => number</code>
      </td>
    </tr>
     <tr>
      <td>reRender</td>
      <td>重新渲染当前时间</td>
      <td>
        <code>() => void</code>
      </td>
    </tr>
     <tr>
      <td>play</td>
      <td>运行</td>
      <td>
        <code>(param: { toTime?: number; autoEnd?: boolean; }) => boolean</code>
      </td>
    </tr>
     <tr>
      <td>pause</td>
      <td>暂停</td>
      <td>
        <code>() => void</code>
      </td>
    </tr>
     <tr>
      <td>setScrollLeft</td>
      <td>设置scrollLeft</td>
      <td>
        <code>(val: number) => void</code>
      </td>
    </tr>
     <tr>
      <td>setScrollTop</td>
      <td>设置scrollTop</td>
      <td>
        <code>(val: number) => void</code>
      </td>
    </tr>
</table>




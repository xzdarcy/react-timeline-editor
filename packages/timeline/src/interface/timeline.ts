import React, { ReactNode } from 'react';
import { OnScrollParams } from 'react-virtualized';
import { ITimelineEngine } from '..';
import { Emitter } from '../engine/emitter';
import { EventTypes } from '../engine/events';
import { TimelineAction, TimelineRow } from './action';
import { TimelineEffect } from './effect';
export * from './action';
export * from './effect';

export interface EditData {
  /**
   * @description 时间轴编辑数据
   */
  editorData: TimelineRow[];
  /**
   * @description 时间轴动作效果map
   */
  effects: Record<string, TimelineEffect>;
  /**
   * @description 单个刻度标记范畴（>0）
   * @default 1
   */
  scale?: number;
  /**
   * @description 最少刻度个数（>=1）
   * @default 20
   */
  minScaleCount?: number;
  /**
   * @description 最大刻度个数（>=minScaleCount）
   * @default Infinity
   */
  maxScaleCount?: number;
  /**
   * @description 单个刻度细分单元数（>0整数）
   * @default 10
   */
  scaleSplitCount?: number;
  /**
   * @description 单个刻度的显示宽度（>0, 单位：px）
   * @default 160
   */
  scaleWidth?: number;
  /**
   * @description 刻度开始距离左侧的距离（>=0, 单位：px）
   * @default 20
   */
  startLeft?: number;
  /**
   * @description 每个编辑行默认高度（>0, 单位：px）
   * @default 32
   */
  rowHeight?: number;
  /**
   * @description 是否启动网格移动吸附
   * @default false
   */
  gridSnap?: boolean;
  /**
   * @description 启动拖拽辅助线吸附
   * @default false
   */
  dragLine?: boolean;
  /**
   * @description 是否隐藏光标
   * @default false
   */
  hideCursor?: boolean;
  /**
   * @description 禁止全部动作区域拖动
   * @default false
   */
  disableDrag?: boolean;
  /**
   * @description timeline运行器，不传则使用内置运行器
   */
  engine?: ITimelineEngine;
  /**
   * @description 自定义action区域渲染
   */
  getActionRender?: (action: TimelineAction, row: TimelineRow) => ReactNode;
  /**
   * @description 自定义scale渲染
   */
  getScaleRender?: (scale: number) => ReactNode;
  /**
   * @description 开始移动回调
   */
  onActionMoveStart?: (params: { action: TimelineAction; row: TimelineRow }) => void;
  /**
   * @description 移动回调（return false可阻止移动）
   */
  onActionMoving?: (params: { action: TimelineAction; row: TimelineRow; start: number; end: number }) => void | boolean;
  /**
   * @description 移动结束回调（return false可阻止onChange触发）
   */
  onActionMoveEnd?: (params: { action: TimelineAction; row: TimelineRow; start: number; end: number }) => void;
  /**
   * @description 开始改变大小回调
   */
  onActionResizeStart?: (params: { action: TimelineAction; row: TimelineRow; dir: 'right' | 'left' }) => void;
  /**
   * @description 开始大小回调（return false可阻止改变）
   */
  onActionResizing?: (params: { action: TimelineAction; row: TimelineRow; start: number; end: number; dir: 'right' | 'left' }) => void | boolean;
  /**
   * @description 改变大小结束回调（return false可阻止onChange触发）
   */
  onActionResizeEnd?: (params: { action: TimelineAction; row: TimelineRow; start: number; end: number; dir: 'right' | 'left' }) => void;
  /**
   * @description 点击行回调
   */
  onClickRow?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description 点击动作回调
   */
  onClickAction?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      action: TimelineAction;
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description 点击动作回调（触发drag时不执行）
   */
  onClickActionOnly?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      action: TimelineAction;
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description 双击行回调
   */
  onDoubleClickRow?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description 双击动作回调
   */
  onDoubleClickAction?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      action: TimelineAction;
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description 右键行回调
   */
  onContextMenuRow?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description 右键动作回调
   */
  onContextMenuAction?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      action: TimelineAction;
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description 获取要提示辅助线的action id列表，在move/resize start 时进行计算，默认获取除当前移动action的全部
   */
  getAssistDragLineActionIds?: (params: { action: TimelineAction; editorData: TimelineRow[]; row: TimelineRow }) => string[];
  /**
   * @description cursor开始拖拽事件
   */
  onCursorDragStart?: (time: number) => void;
  /**
   * @description cursor结束拖拽事件
   */
  onCursorDragEnd?: (time: number) => void;
  /**
   * @description cursor拖拽事件
   */
  onCursorDrag?: (time: number) => void;
  /**
   * @description 点击时间区域事件, 返回false时阻止设置时间
   */
  onClickTimeArea?: (time: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => boolean | undefined;
}

export interface TimelineState {
  /** dom节点 */
  target: HTMLElement;
  /** 运行监听器 */
  listener: Emitter<EventTypes>;
  /** 是否正在播放 */
  isPlaying: boolean;
  /** 是否暂停中 */
  isPaused: boolean;
  /** 设置当前播放时间 */
  setTime: (time: number) => void;
  /** 获取当前播放时间 */
  getTime: () => number;
  /** 设置播放速率 */
  setPlayRate: (rate: number) => void;
  /** 设置播放速率 */
  getPlayRate: () => number;
  /** 重新渲染当前时间 */
  reRender: () => void;
  /** 播放 */
  play: (param: {
    /** 默认从头运行到尾, 优先级大于autoEnd */
    toTime?: number;
    /** 是否播放完后自动结束 */
    autoEnd?: boolean;
    /** 运行的actionId列表，不穿默认全部运行 */
    runActionIds?: string[];
  }) => boolean;
  /** 暂停 */
  pause: () => void;
  /** 设置scroll left */
  setScrollLeft: (val: number) => void;
  /** 设置scroll top */
  setScrollTop: (val: number) => void;
}

/**
 * 动画编辑器参数
 * @export
 * @interface TimelineProp
 */
export interface TimelineEditor extends EditData {
  /**
   * @description 编辑区域距离顶部滚动距离 (请使用ref.setScrollTop代替)
   * @deprecated
   */
  scrollTop?: number;
  /**
   * @description 编辑区域滚动回调 (用于控制与编辑行滚动同步)
   */
  onScroll?: (params: OnScrollParams) => void;
  /**
   * @description 拖拽时是否启动自动滚动
   * @default false
   */
  autoScroll?: boolean;
  /**
   * @description 自定义timeline样式
   */
  style?: React.CSSProperties;
  /**
   * @description 是否自动重新渲染（当数据改变或光标时间改变时update tick）
   * @default true
   */
  autoReRender?: boolean;
  /**
   * @description 数据改变回调，会在操作动作end改变数据后触发(返回false会阻止自动engine同步，用于减少性能开销)
   */
  onChange?: (editorData: TimelineRow[]) => void | boolean;
}

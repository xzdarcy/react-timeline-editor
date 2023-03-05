import { TimelineAction, TimelineRow } from '../interface/action';
import { TimelineEffect } from '../interface/effect';
import { Emitter } from './emitter';
import { Events, EventTypes } from './events';

const PLAYING = 'playing';
const PAUSED = 'paused';
type PlayState = 'playing' | 'paused';

export interface ITimelineEngine extends Emitter<EventTypes> {
  readonly isPlaying: boolean;
  readonly isPaused: boolean;
  effects: Record<string, TimelineEffect>;
  data: TimelineRow[];
  /** 设置播放速率 */
  setPlayRate(rate: number): boolean;
  /** 获取播放速率 */
  getPlayRate(): number;
  /** 重新渲染当前时间 */
  reRender(): void;
  /** 设置播放时间 */
  setTime(time: number, isTick?: boolean): boolean;
  /** 获取播放时间 */
  getTime(): number;
  /** 播放 */
  play(param: {
    /** 默认从头运行到尾, 优先级大于autoEnd */
    toTime?: number;
    /** 是否播放完后自动结束 */
    autoEnd?: boolean;
  }): boolean;
  /** 暂停 */
  pause(): void;
}

/**
 * 时间轴播放器
 * 可脱离编辑器单独运行
 * @export
 * @class TimelineEngine
 * @extends {Emitter<EventTypes>}
 */
export class TimelineEngine extends Emitter<EventTypes> implements ITimelineEngine {
  constructor() {
    super(new Events());
  }

  /** requestAnimationFrame timerId */
  private _timerId: number;

  /** 播放速率 */
  private _playRate = 1;
  /** 当前时间 */
  private _currentTime: number = 0;
  /** 播放状态 */
  private _playState: PlayState = 'paused';
  /** 时间帧pre数据 */
  private _prev: number;

  /** 动作效果map */
  private _effectMap: Record<string, TimelineEffect> = {};
  /** 需要运行的动作map */
  private _actionMap: Record<string, TimelineAction> = {};
  /** 按动作开始时间正序排列后的动作id数组 */
  private _actionSortIds: string[] = [];

  /** 当前遍历到的action index */
  private _next: number = 0;
  /** 动作时间范围包含当前时间的actionId列表 */
  private _activeActionIds: string[] = [];

  /** 是否正在播放 */
  get isPlaying() {
    return this._playState === 'playing';
  }
  /** 是否暂停中 */
  get isPaused() {
    return this._playState === 'paused';
  }

  set effects(effects: Record<string, TimelineEffect>) {
    this._effectMap = effects;
  }
  set data(data: TimelineRow[]) {
    if (this.isPlaying) this.pause();
    this._dealData(data);
    this._dealClear();
    this._dealEnter(this._currentTime);
  }

  /**
   * 设置播放速率
   * @memberof TimelineEngine
   */
  setPlayRate(rate: number): boolean {
    if (rate <= 0) {
      console.error('Error: rate cannot be less than 0!');
      return;
    }
    const result = this.trigger('beforeSetPlayRate', { rate, engine: this });
    if (!result) return false;
    this._playRate = rate;
    this.trigger('afterSetPlayRate', { rate, engine: this });

    return true;
  }
  /**
   * 获取播放速率
   * @memberof TimelineEngine
   */
  getPlayRate() {
    return this._playRate;
  }

  /**
   * 重新渲染当前时间
   * @return {*}
   * @memberof TimelineEngine
   */
  reRender() {
    if (this.isPlaying) return;
    this._tickAction(this._currentTime);
  }

  /**
   * 设置播放时间
   * @param {number} time
   * @param {boolean} [isTick] 是否是tick触发
   * @memberof TimelineEngine
   */
  setTime(time: number, isTick?: boolean): boolean {
    const result = isTick || this.trigger('beforeSetTime', { time, engine: this });
    if (!result) return false;

    this._currentTime = time;

    this._next = 0;
    this._dealLeave(time);
    this._dealEnter(time);

    if (isTick) this.trigger('setTimeByTick', { time, engine: this });
    else this.trigger('afterSetTime', { time, engine: this });
    return true;
  }
  /**
   * 获取当前时间
   * @return {*}  {number}
   * @memberof TimelineEngine
   */
  getTime(): number {
    return this._currentTime;
  }

  /**
   * 运行: 开始时间为当前time
   * @param param
   * @return {boolean} {boolean}
   */
  play(param: {
    /** 默认从头运行到尾, 优先级大于autoEnd */
    toTime?: number;
    /** 是否播放完后自动结束 */
    autoEnd?: boolean;
  }): boolean {
    const { toTime, autoEnd } = param;

    const currentTime = this.getTime();
    /** 当前状体啊正在播放中 or 运行终止时间小于开始时间 直接返回*/
    if (this.isPlaying || (toTime && toTime <= currentTime)) return false;

    // 设置运行状态
    this._playState = PLAYING;

    // activeIds 运行 start
    this._startOrStop('start');

    // 触发事件
    this.trigger('play', { engine: this });

    this._timerId = requestAnimationFrame((time: number) => {
      this._prev = time;
      this._tick({ now: time, autoEnd, to: toTime });
    });
    return true;
  }

  /**
   * 暂停播放
   * @memberof TimelineEngine
   */
  pause() {
    if (this.isPlaying) {
      this._playState = PAUSED;
      // activeIds 运行 stop
      this._startOrStop('stop');

      this.trigger('paused', { engine: this });
    }
    cancelAnimationFrame(this._timerId);
  }

  /** 播放完成 */
  private _end() {
    this.pause();
    this.trigger('ended', { engine: this });
  }

  private _startOrStop(type?: 'start' | 'stop') {
    for (let i = 0; i < this._activeActionIds.length; i++) {
      const actionId = this._activeActionIds[i];
      const action = this._actionMap[actionId];
      const effect = this._effectMap[action?.effectId];

      if (type === 'start') {
        effect?.source?.start && effect.source.start({ action, effect, engine: this, isPlaying: this.isPlaying, time: this.getTime() });
      } else if (type === 'stop') {
        effect?.source?.stop && effect.source.stop({ action, effect, engine: this, isPlaying: this.isPlaying, time: this.getTime() });
      }
    }
  }

  /** 每帧执行 */
  private _tick(data: { now: number; autoEnd?: boolean; to?: number }) {
    if (this.isPaused) return;
    const { now, autoEnd, to } = data;

    // 计算当前时间
    let currentTime = this.getTime() + (Math.min(1000, now - this._prev) / 1000) * this._playRate;
    this._prev = now;

    // 设置当前时间
    if (to && to <= currentTime) currentTime = to;
    this.setTime(currentTime, true);

    // 执行动作
    this._tickAction(currentTime);
    // 自动停止情况下，判断是否所有动作执行完毕
    if (!to && autoEnd && this._next >= this._actionSortIds.length && this._activeActionIds.length === 0) {
      this._end();
      return;
    }

    // 判断是否终止
    if (to && to <= currentTime) {
      this._end();
    }

    if (this.isPaused) return;
    this._timerId = requestAnimationFrame((time) => {
      this._tick({ now: time, autoEnd, to });
    });
  }

  /** tick运行actions */
  private _tickAction(time: number) {
    this._dealEnter(time);
    this._dealLeave(time);

    // render
    const length = this._activeActionIds.length;
    for (let i = 0; i < length; i++) {
      const actionId = this._activeActionIds[i];
      const action = this._actionMap[actionId];
      const effect = this._effectMap[action.effectId];
      if (effect && effect.source?.update) {
        effect.source.update({ time, action, isPlaying: this.isPlaying, effect, engine: this });
      }
    }
  }

  /** 重置active数据 */
  private _dealClear() {
    while (this._activeActionIds.length) {
      const actionId = this._activeActionIds.shift();
      const action = this._actionMap[actionId];

      const effect = this._effectMap[action?.effectId];
      if (effect?.source?.leave) {
        effect.source.leave({ action, effect, engine: this, isPlaying: this.isPlaying, time: this.getTime() });
      }
    }
    this._next = 0;
  }

  /** 处理action time enter */
  private _dealEnter(time: number) {
    // add to active
    while (this._actionSortIds[this._next]) {
      const actionId = this._actionSortIds[this._next];
      const action = this._actionMap[actionId];

      if (!action.disable) {
        // 判断动作开始时间是否到达

        if (action.start > time) break;
        // 动作可以执行开始
        if (action.end > time && !this._activeActionIds.includes(actionId)) {
          const effect = this._effectMap[action.effectId];
          if (effect && effect.source?.enter) {
            effect.source.enter({ action, effect, isPlaying: this.isPlaying, time, engine: this });
          }

          this._activeActionIds.push(actionId);
        }
      }
      this._next++;
    }
  }

  /** 处理action time leave */
  private _dealLeave(time: number) {
    let i = 0;
    while (this._activeActionIds[i]) {
      const actionId = this._activeActionIds[i];
      const action = this._actionMap[actionId];

      // 不在播放区域内
      if (action.start > time || action.end < time) {
        const effect = this._effectMap[action.effectId];

        if (effect && effect.source?.leave) {
          effect.source.leave({ action, effect, isPlaying: this.isPlaying, time, engine: this });
        }

        this._activeActionIds.splice(i, 1);
        continue;
      }
      i++;
    }
  }

  /** 处理数据 */
  private _dealData(data: TimelineRow[]) {
    const actions: TimelineAction[] = [];
    data.map((row) => {
      actions.push(...row.actions);
    });
    const sortActions = actions.sort((a, b) => a.start - b.start);
    const actionMap: Record<string, TimelineAction> = {};
    const actionSortIds: string[] = [];

    sortActions.forEach((action) => {
      actionSortIds.push(action.id);
      actionMap[action.id] = { ...action };
    });
    this._actionMap = actionMap;
    this._actionSortIds = actionSortIds;
  }
}

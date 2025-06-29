import { TimelineEngine } from "../engine/engine";
import { TimelineAction } from "./action";

export interface TimelineEffect {
  /** 效果id */
  id: string, 
  /** 效果名称 */
  name?: string, 
  /** 效果运行代码 */
  source?: TimeLineEffectSource,
}

export interface EffectSourceParam {
  /** 当前时间 */
  time: number,
  /** 是否正在运行 */
  isPlaying: boolean,
  /** 动作 */
  action: TimelineAction,
  /** 动作效果 */
  effect: TimelineEffect,
  /** 运行引擎 */
  engine: TimelineEngine,
}

/**
 * 效果执行回调
 * @export
 * @interface TimeLineEffectSource
 */
export interface TimeLineEffectSource {
  /** 在当前动作时间区域开始播放时回调 */
  start?: (param: EffectSourceParam) => void;
  /** 时间进入动作时执行回调 */
  enter?: (param: EffectSourceParam) => void;
  /** 动作更新时回调 */
  update?: (param: EffectSourceParam) => void;
  /** 时间离开动作时执行回调 */
  leave?: (param: EffectSourceParam) => void;
  /** 在当前动作时间区域停止播放时回调 */
  stop?: (param: EffectSourceParam) => void;
}
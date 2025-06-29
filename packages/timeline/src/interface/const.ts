export const PREFIX = `timeline-editor`;

/** 开始时光标所在时间 */
export const START_CURSOR_TIME = 0;
/** 默认刻度 */
export const DEFAULT_SCALE = 1;
/** 默认刻度分割数量 */
export const DEFAULT_SCALE_SPLIT_COUNT = 10;

/** 默认刻度显示宽度 */
export const DEFAULT_SCALE_WIDTH = 160;
/** 默认刻度左侧开始距离 */
export const DEFAULT_START_LEFT = 20;
/** 默认移动最小像素 */
export const DEFAULT_MOVE_GRID = 1;
/** 默认吸附像素 */
export const DEFAULT_ADSORPTION_DISTANCE = 8;
/** 默认动作行高度 */
export const DEFAULT_ROW_HEIGHT = 32;

/** 最小scale数量 */
export const MIN_SCALE_COUNT = 20;
/** 每次新增scale个数 */
export const ADD_SCALE_COUNT = 5;

/** 错误信息 */
export const ERROR = {
  START_TIME_LESS_THEN_ZERO: 'Action start time cannot be less than 0!',
  END_TIME_LESS_THEN_START_TIME: 'Action end time cannot be less then start time!',
}
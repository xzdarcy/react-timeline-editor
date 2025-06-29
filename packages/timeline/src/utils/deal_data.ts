import { TimelineAction, TimelineRow } from "../interface/action";
import { ADD_SCALE_COUNT } from "../interface/const";

/** 时间转像素 */
export function parserTimeToPixel(
  data: number,
  param: {
    startLeft: number;
    scale: number;
    scaleWidth: number;
  }
) {
  const { startLeft, scale, scaleWidth } = param;
  return startLeft + (data / scale) * scaleWidth;
}

/** 像素转时间 */
export function parserPixelToTime(
  data: number,
  param: {
    startLeft: number;
    scale: number;
    scaleWidth: number;
  }
) {
  const { startLeft, scale, scaleWidth } = param;
  return ((data - startLeft) / scaleWidth) * scale;
}

/** 位置 + 宽度 转 start + end */
export function parserTransformToTime(
  data: {
    left: number;
    width: number;
  },
  param: {
    startLeft: number;
    scale: number;
    scaleWidth: number;
  }
) {
  const { left, width } = data;
  const start = parserPixelToTime(left, param);
  const end = parserPixelToTime(left + width, param);
  return {
    start,
    end,
  };
}

/** start + end 转 位置 + 宽度 */
export function parserTimeToTransform(
  data: {
    start: number;
    end: number;
  },
  param: {
    startLeft: number;
    scale: number;
    scaleWidth: number;
  }
) {
  const { start, end } = data;
  const left = parserTimeToPixel(start, param);
  const width = parserTimeToPixel(end, param) - left;
  return {
    left,
    width,
  };
}

/** 根据数据获取刻度个数 */
export function getScaleCountByRows(data: TimelineRow[], param: { scale: number }) {
  let max = 0;
  data.forEach((row) => {
    row.actions.forEach((action) => {
      max = Math.max(max, action.end);
    });
  });
  const count = Math.ceil(max / param.scale);
  return count + ADD_SCALE_COUNT;
}

/** 根据时间获取目前刻度数 */
export function getScaleCountByPixel(
  data: number,
  param: {
    startLeft: number;
    scaleWidth: number;
    scaleCount: number;
  }
) {
  const { startLeft, scaleWidth } = param;
  const count = Math.ceil((data - startLeft) / scaleWidth);
  return Math.max(count + ADD_SCALE_COUNT, param.scaleCount);
}

/** 获取动作全部时间的位置集合 */
export function parserActionsToPositions(
  actions: TimelineAction[],
  param: {
    startLeft: number;
    scale: number;
    scaleWidth: number;
  }
) {
  const positions: number[] = [];
  actions.forEach((item) => {
    positions.push(parserTimeToPixel(item.start, param));
    positions.push(parserTimeToPixel(item.end, param));
  });
  return positions;
}

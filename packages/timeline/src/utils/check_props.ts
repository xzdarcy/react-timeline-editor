import { DEFAULT_ROW_HEIGHT, DEFAULT_SCALE, DEFAULT_SCALE_SPLIT_COUNT, DEFAULT_SCALE_WIDTH, DEFAULT_START_LEFT, MIN_SCALE_COUNT } from "../interface/const";
import { TimelineEditor } from "../interface/timeline";
import ConsoleLogger from "./logger";
const logger = new ConsoleLogger('timeline');

export function checkProps(props: TimelineEditor): TimelineEditor {
  let {
    editorData = [],
    effects = {},
    scrollTop = 0,
    scale = DEFAULT_SCALE,
    scaleSplitCount = DEFAULT_SCALE_SPLIT_COUNT,
    scaleWidth = DEFAULT_SCALE_WIDTH,
    startLeft = DEFAULT_START_LEFT,
    minScaleCount = MIN_SCALE_COUNT,
    maxScaleCount = Infinity,
    rowHeight = DEFAULT_ROW_HEIGHT,
  } = props;

  if(scale <= 0) {
    logger.error('Error: scale must be greater than 0!')
    scale = DEFAULT_SCALE;
  }

  if(scrollTop < 0) {
    logger.warn('Warning: scrollTop cannot be less than 0!')
    scrollTop = 0;
  }

  if(scaleSplitCount <= 0) {
    logger.warn('Warning: scaleSplitCount cannot be less than 1!')
    scaleSplitCount = 1
  }

  if(scaleWidth <= 0) {
    logger.warn('Warning: scaleWidth must be greater than 0!');
    scaleWidth = DEFAULT_SCALE_WIDTH;
  }

  if(startLeft < 0) {
    logger.warn('Warning: startLeft cannot be less than 0!')
    startLeft = 0
  }

  if(minScaleCount < 1) {
    logger.warn('Warning: minScaleCount must be greater than 1!')
    minScaleCount = MIN_SCALE_COUNT
  }
  minScaleCount = parseInt(minScaleCount + '');

  if(maxScaleCount < minScaleCount) {
    logger.warn('Warning: maxScaleCount cannot be less than minScaleCount!')
    maxScaleCount = minScaleCount
  }
  maxScaleCount = maxScaleCount === Infinity ? Infinity : parseInt(maxScaleCount + '');

  if(rowHeight <= 0) {
    logger.warn('Warning: rowHeight must be greater than 0!')
    rowHeight = DEFAULT_ROW_HEIGHT
  }

  const temp = {...props};
  delete temp['style'];
  return {
    ...temp,
    editorData,
    effects,
    scrollTop,
    scale,
    scaleSplitCount,
    scaleWidth,
    startLeft,
    minScaleCount,
    maxScaleCount,
    rowHeight,
  }
}
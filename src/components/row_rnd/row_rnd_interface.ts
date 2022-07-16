import { DragEvent, ResizeEvent } from "@interactjs/types/index";

type EventData = {
  lastLeft: number;
  left: number;
  lastWidth: number;
  width: number;
};

export type RndDragStartCallback = () => void;
export type RndDragCallback = (
  data: EventData,
  scrollDelta?: number,
) => boolean | void;
export type RndDragEndCallback = (data: Pick<EventData, 'left' | 'width'>) => void;

export type Direction = "left" | "right";
export type RndResizeStartCallback = (dir: Direction) => void;
export type RndResizeCallback = (
  dir: Direction,
  data: EventData
) => boolean | void;
export type RndResizeEndCallback = (
  dir: Direction,
  data: Pick<EventData, 'left' | 'width'>
) => void;

export interface RowRndApi {
  updateWidth: (size: number) => void;
  updateLeft: (left: number) => void;
  getLeft: () => number;
  getWidth: () => number;
}

export interface RowRndProps {
  width?: number;
  left?: number;
  grid?: number;
  start?: number;
  bounds?: { left: number; right: number };
  edges?: {left: boolean | string, right: boolean | string};

  onResizeStart?: RndResizeStartCallback;
  onResize?: RndResizeCallback;
  onResizeEnd?: RndResizeEndCallback;
  onDragStart?: RndDragStartCallback;
  onDrag?: RndDragCallback;
  onDragEnd?: RndDragEndCallback;
  // 同时传入parentRef和deltaScrollLeft时会启动自动滚动
  parentRef?: React.MutableRefObject<HTMLDivElement>;
  deltaScrollLeft?: (delta: number) => void;
  
  children?: React.ReactNode;

  enableResizing?: boolean;
  enableDragging?: boolean;
  adsorptionPositions?: number[];
  adsorptionDistance?: number;
}

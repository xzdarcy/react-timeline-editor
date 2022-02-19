import React, { FC, useEffect, useState } from "react";
import { prefix } from "../../utils/deal_class_prefix";
import './drag_lines.less';

export interface DragLineData {
  isMoving: boolean;
  movePositions: number[];
  assistPositions: number[];
}

export type DragLineProps = DragLineData & {scrollLeft: number};

/** 拖拽辅助线 */
export const DragLines: FC<DragLineProps> = ({
  isMoving,
  movePositions = [],
  assistPositions = [],
  scrollLeft,
}) => {
  return(
    <div className={prefix('drag-line-container')}>
      {
        isMoving && movePositions.filter(item => assistPositions.includes(item)).map(((linePos, index) => {
          return (
            <div key={index} className={prefix('drag-line')} style={{left: linePos - scrollLeft}} />
          )
        }))
      }
    </div>
  )
}
import React, { FC, useRef } from "react";
import { CommonProp } from "../../interface/common_prop";
import { prefix } from "../../utils/deal_class_prefix";
import { parserTimeToPixel } from "../../utils/deal_data";
import { RowDnd } from "../row_rnd/row_rnd";
import { RowRndApi } from "../row_rnd/row_rnd_interface";
import "./cursor.less";

/** 动画时间轴组件参数 */
export type CursorProps = CommonProp & {
  /** 距离左侧滚动距离 */
  scrollLeft: number;
  /** 设置光标位置 */
  setCursor: (param: { left?: number; time?: number }) => boolean;
};

export const Cursor: FC<CursorProps> = ({ disableDrag, cursorTime, setCursor, startLeft, scaleWidth, scale, scrollLeft }) => {
  const rowRnd = useRef<RowRndApi>();

  return (
    <RowDnd
      start={startLeft}
      ref={rowRnd}
      left={parserTimeToPixel(cursorTime, {startLeft, scaleWidth, scale}) - scrollLeft}
      bounds={{
        left: startLeft - scrollLeft,
        right: Number.MAX_SAFE_INTEGER,
      }}
      enableDragging={!disableDrag}
      enableResizing={false}
      onDrag={({ left }) => {
        return setCursor({ left: left + scrollLeft });
      }}
    >
      <div className={prefix("cursor")}>
        <svg className={prefix("cursor-top")} width="8" height="12" viewBox="0 0 8 12" fill="none">
          <path
            d="M0 1C0 0.447715 0.447715 0 1 0H7C7.55228 0 8 0.447715 8 1V9.38197C8 9.76074 7.786 10.107 7.44721 10.2764L4.44721 11.7764C4.16569 11.9172 3.83431 11.9172 3.55279 11.7764L0.552786 10.2764C0.214002 10.107 0 9.76074 0 9.38197V1Z"
            fill="#5297FF"
          />
        </svg>
        <div className={prefix("cursor-area")} />
      </div>
    </RowDnd>
  );
};

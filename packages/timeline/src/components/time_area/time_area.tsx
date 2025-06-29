import { parserPixelToTime } from '@/utils/deal_data';
import React, { FC, useEffect, useRef } from 'react';
import { AutoSizer, Grid, GridCellRenderer, OnScrollParams } from 'react-virtualized';
import { CommonProp } from '../../interface/common_prop';
import { prefix } from '../../utils/deal_class_prefix';
import './time_area.less';

/** 动画时间轴组件参数 */
export type TimeAreaProps = CommonProp & {
  /** 左侧滚动距离 */
  scrollLeft: number;
  /** 滚动回调，用于同步滚动 */
  onScroll: (params: OnScrollParams) => void;
  /** 设置光标位置 */
  setCursor: (param: { left?: number; time?: number }) => void;
};

/** 动画时间轴组件 */
export const TimeArea: FC<TimeAreaProps> = ({ setCursor, maxScaleCount, hideCursor, scale, scaleWidth, scaleCount, scaleSplitCount, startLeft, scrollLeft, onClickTimeArea, getScaleRender }) => {
  const gridRef = useRef<Grid>();
  /** 是否显示细分刻度 */
  const showUnit = scaleSplitCount > 0;

  /** 获取每个cell渲染内容 */
  const cellRenderer: GridCellRenderer = ({ columnIndex, key, style }) => {
    const isShowScale = showUnit ? columnIndex % scaleSplitCount === 0 : true;
    const classNames = ['time-unit'];
    if (isShowScale) classNames.push('time-unit-big');
    const item = (showUnit ? columnIndex / scaleSplitCount : columnIndex) * scale;
    return (
      <div key={key} style={style} className={prefix(...classNames)}>
        {isShowScale && <div className={prefix('time-unit-scale')}>{getScaleRender ? getScaleRender(item) : item}</div>}
      </div>
    );
  };

  useEffect(() => {
    gridRef.current?.recomputeGridSize();
  }, [scaleWidth, startLeft]);

  /** 获取列宽 */
  const getColumnWidth = (data: { index: number }) => {
    switch (data.index) {
      case 0:
        return startLeft;
      default:
        return showUnit ? scaleWidth / scaleSplitCount : scaleWidth;
    }
  };
  const estColumnWidth=getColumnWidth({index:1});
  return (
    <div className={prefix('time-area')}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <>
              <Grid
                ref={gridRef}
                columnCount={showUnit ? scaleCount * scaleSplitCount + 1 : scaleCount}
                columnWidth={getColumnWidth}
                estimatedColumnSize={estColumnWidth}
                rowCount={1}
                rowHeight={height}
                width={width}
                height={height}
                overscanRowCount={0}
                overscanColumnCount={10}
                cellRenderer={cellRenderer}
                scrollLeft={scrollLeft}
              ></Grid>
              <div
                style={{ width, height }}
                onClick={(e) => {
                  if (hideCursor) return;
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  const position = e.clientX - rect.x;
                  const left = Math.max(position + scrollLeft, startLeft);
                  if (left > maxScaleCount * scaleWidth + startLeft - scrollLeft) return;

                  const time = parserPixelToTime(left, { startLeft, scale, scaleWidth });
                  const result = onClickTimeArea && onClickTimeArea(time, e);
                  if (result === false) return; // 返回false时阻止设置时间
                  setCursor({ time });
                }}
                className={prefix('time-area-interact')}
              ></div>
            </>
          );
        }}
      </AutoSizer>
    </div>
  );
};

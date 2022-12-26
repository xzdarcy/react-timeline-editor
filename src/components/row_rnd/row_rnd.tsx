import { Interactable } from '@interactjs/core/Interactable';
import { DragEvent, ResizeEvent } from '@interactjs/types/index';
import React, { ReactElement, useEffect, useImperativeHandle, useRef } from 'react';
import { DEFAULT_ADSORPTION_DISTANCE, DEFAULT_MOVE_GRID, DEFAULT_START_LEFT } from '../../interface/const';
import { useAutoScroll } from './hooks/useAutoScroll';
import { InteractComp } from './interactable';
import { Direction, RowRndApi, RowRndProps } from './row_rnd_interface';

export const RowDnd = React.forwardRef<RowRndApi, RowRndProps>(
  (
    {
      children,
      edges,
      left,
      width,

      start = DEFAULT_START_LEFT,
      grid = DEFAULT_MOVE_GRID,
      bounds = {
        left: Number.MIN_SAFE_INTEGER,
        right: Number.MAX_SAFE_INTEGER,
      },
      enableResizing = true,
      enableDragging = true,
      adsorptionDistance = DEFAULT_ADSORPTION_DISTANCE,
      adsorptionPositions = [],
      onResizeStart,
      onResize,
      onResizeEnd,
      onDragStart,
      onDragEnd,
      onDrag,
      parentRef,
      deltaScrollLeft,
    },
    ref,
  ) => {
    const interactable = useRef<Interactable>();
    const deltaX = useRef(0);
    const isAdsorption = useRef(false);
    const { initAutoScroll, dealDragAutoScroll, dealResizeAutoScroll, stopAutoScroll } = useAutoScroll(parentRef);

    useEffect(() => {
      return () => {
        interactable.current && interactable.current.unset();
      };
    }, []);

    //#region [rgba(100,120,156,0.08)] 赋值相关api
    useImperativeHandle(ref, () => ({
      updateLeft: (left) => handleUpdateLeft(left || 0, false),
      updateWidth: (width) => handleUpdateWidth(width, false),
      getLeft: handleGetLeft,
      getWidth: handleGetWidth,
    }));
    useEffect(() => {
      const target = interactable.current.target as HTMLElement;
      handleUpdateWidth(typeof width === 'undefined' ? target.offsetWidth : width, false);
    }, [width]);
    useEffect(() => {
      handleUpdateLeft(left || 0, false);
    }, [left]);

    const handleUpdateLeft = (left: number, reset = true) => {
      if (!interactable.current || !interactable.current.target) return;
      reset && (deltaX.current = 0);
      const target = interactable.current.target as HTMLElement;
      target.style.left = `${left}px`;
      Object.assign(target.dataset, { left });
    };
    const handleUpdateWidth = (width: number, reset = true) => {
      if (!interactable.current || !interactable.current.target) return;
      reset && (deltaX.current = 0);
      const target = interactable.current.target as HTMLElement;
      target.style.width = `${width}px`;
      Object.assign(target.dataset, { width });
    };
    const handleGetLeft = () => {
      const target = interactable.current.target as HTMLElement;
      return parseFloat(target?.dataset?.left || '0');
    };
    const handleGetWidth = () => {
      const target = interactable.current.target as HTMLElement;
      return parseFloat(target?.dataset?.width || '0');
    };
    //#endregion

    //#region [rgba(188,188,120,0.05)] 回调api
    const handleMoveStart = (e: DragEvent) => {
      deltaX.current = 0;
      isAdsorption.current = false;
      initAutoScroll();
      onDragStart && onDragStart();
    };

    const move = (param: { preLeft: number; preWidth: number; scrollDelta?: number }) => {
      const { preLeft, preWidth, scrollDelta } = param;
      const distance = isAdsorption.current ? adsorptionDistance : grid;
      if (Math.abs(deltaX.current) >= distance) {
        const count = parseInt(deltaX.current / distance + '');
        let curLeft = preLeft + count * distance;

        // 控制吸附
        let adsorption = curLeft;
        let minDis = Number.MAX_SAFE_INTEGER;
        adsorptionPositions.forEach((item) => {
          const dis = Math.abs(item - curLeft);
          if (dis < adsorptionDistance && dis < minDis) adsorption = item;
          const dis2 = Math.abs(item - (curLeft + preWidth));
          if (dis2 < adsorptionDistance && dis2 < minDis) adsorption = item - preWidth;
        });

        if (adsorption !== curLeft) {
          // 采用吸附数据
          isAdsorption.current = true;
          curLeft = adsorption;
        } else {
          // 控制网格
          if ((curLeft - start) % grid !== 0) {
            curLeft = start + grid * Math.round((curLeft - start) / grid);
          }
          isAdsorption.current = false;
        }
        deltaX.current = deltaX.current % distance;

        // 控制bounds
        if (curLeft < bounds.left) curLeft = bounds.left;
        else if (curLeft + preWidth > bounds.right) curLeft = bounds.right - preWidth;

        if (onDrag) {
          const ret = onDrag(
            {
              lastLeft: preLeft,
              left: curLeft,
              lastWidth: preWidth,
              width: preWidth,
            },
            scrollDelta,
          );
          if (ret === false) return;
        }

        handleUpdateLeft(curLeft, false);
      }
    };

    const handleMove = (e: DragEvent) => {
      const target = e.target;

      if (deltaScrollLeft && parentRef?.current) {
        const result = dealDragAutoScroll(e, (delta) => {
          deltaScrollLeft(delta);

          let { left, width } = target.dataset;
          const preLeft = parseFloat(left);
          const preWidth = parseFloat(width);
          deltaX.current += delta;
          move({ preLeft, preWidth, scrollDelta: delta });
        });
        if (!result) return;
      }

      let { left, width } = target.dataset;
      const preLeft = parseFloat(left);
      const preWidth = parseFloat(width);

      deltaX.current += e.dx;
      move({ preLeft, preWidth });
    };

    const handleMoveStop = (e: DragEvent) => {
      deltaX.current = 0;
      isAdsorption.current = false;
      stopAutoScroll();

      const target = e.target;
      let { left, width } = target.dataset;
      onDragEnd && onDragEnd({ left: parseFloat(left), width: parseFloat(width) });
    };

    const handleResizeStart = (e: ResizeEvent) => {
      deltaX.current = 0;
      isAdsorption.current = false;
      initAutoScroll();

      let dir: Direction = e.edges?.right ? 'right' : 'left';
      onResizeStart && onResizeStart(dir);
    };

    const resize = (param: { preLeft: number; preWidth: number; dir: 'left' | 'right' }) => {
      const { dir, preWidth, preLeft } = param;
      const distance = isAdsorption.current ? adsorptionDistance : grid;

      if (dir === 'left') {
        // 拖动左侧
        if (Math.abs(deltaX.current) >= distance) {
          const count = parseInt(deltaX.current / distance + '');
          let curLeft = preLeft + count * distance;

          // 控制吸附
          let adsorption = curLeft;
          let minDis = Number.MAX_SAFE_INTEGER;
          adsorptionPositions.forEach((item) => {
            const dis = Math.abs(item - curLeft);
            if (dis < adsorptionDistance && dis < minDis) adsorption = item;
          });

          if (adsorption !== curLeft) {
            // 采用吸附数据
            isAdsorption.current = true;
            curLeft = adsorption;
          } else {
            // 控制grid网格
            if ((curLeft - start) % grid !== 0) {
              curLeft = start + grid * Math.round((curLeft - start) / grid);
            }
            isAdsorption.current = false;
          }
          deltaX.current = deltaX.current % distance;

          // 控制bounds
          const tempRight = preLeft + preWidth;
          if (curLeft < bounds.left) curLeft = bounds.left;
          const curWidth = tempRight - curLeft;

          if (onResize) {
            const ret = onResize('left', {
              lastLeft: preLeft,
              lastWidth: preWidth,
              left: curLeft,
              width: curWidth,
            });
            if (ret === false) return;
          }

          handleUpdateLeft(curLeft, false);
          handleUpdateWidth(curWidth, false);
        }
      } else if (dir === 'right') {
        // 拖动右侧
        if (Math.abs(deltaX.current) >= distance) {
          const count = parseInt(deltaX.current / grid + '');
          let curWidth = preWidth + count * grid;

          // 控制吸附
          let adsorption = preLeft + curWidth;
          let minDis = Number.MAX_SAFE_INTEGER;
          adsorptionPositions.forEach((item) => {
            const dis = Math.abs(item - (preLeft + curWidth));
            if (dis < adsorptionDistance && dis < minDis) adsorption = item;
          });

          if (adsorption !== preLeft + curWidth) {
            // 采用吸附数据
            isAdsorption.current = true;
            curWidth = adsorption - preLeft;
          } else {
            // 控制grid网格
            let tempRight = preLeft + curWidth;
            if ((tempRight - start) % grid !== 0) {
              tempRight = start + grid * Math.round((tempRight - start) / grid);
              curWidth = tempRight - preLeft;
            }
            isAdsorption.current = false;
          }
          deltaX.current = deltaX.current % distance;

          // 控制bounds
          if (preLeft + curWidth > bounds.right) curWidth = bounds.right - preLeft;

          if (onResize) {
            const ret = onResize('right', {
              lastLeft: preLeft,
              lastWidth: preWidth,
              left: preLeft,
              width: curWidth,
            });
            if (ret === false) return;
          }

          handleUpdateWidth(curWidth, false);
        }
      }
    };

    const handleResize = (e: ResizeEvent) => {
      const target = e.target;
      const dir = e.edges?.left ? 'left' : 'right';

      if (deltaScrollLeft && parentRef?.current) {
        const result = dealResizeAutoScroll(e, dir, (delta) => {
          deltaScrollLeft(delta);

          let { left, width } = target.dataset;
          const preLeft = parseFloat(left);
          const preWidth = parseFloat(width);
          deltaX.current += delta;
          resize({ preLeft, preWidth, dir });
        });
        if (!result) return;
      }

      let { left, width } = target.dataset;
      const preLeft = parseFloat(left);
      const preWidth = parseFloat(width);

      deltaX.current += dir === 'left' ? e.deltaRect.left : e.deltaRect.right;
      resize({ preLeft, preWidth, dir });
    };
    const handleResizeStop = (e: ResizeEvent) => {
      deltaX.current = 0;
      isAdsorption.current = false;
      stopAutoScroll();

      const target = e.target;
      let { left, width } = target.dataset;
      let dir: Direction = e.edges?.right ? 'right' : 'left';
      onResizeEnd &&
        onResizeEnd(dir, {
          left: parseFloat(left),
          width: parseFloat(width),
        });
    };
    //#endregion

    return (
      <InteractComp
        interactRef={interactable}
        draggable={enableDragging}
        resizable={enableResizing}
        draggableOptions={{
          lockAxis: 'x',
          onmove: handleMove,
          onstart: handleMoveStart,
          onend: handleMoveStop,
          cursorChecker: () => {
            return null;
          },
        }}
        resizableOptions={{
          axis: 'x',
          invert: 'none',
          edges: {
            left: true,
            right: true,
            top: false,
            bottom: false,
            ...(edges || {}),
          },
          onmove: handleResize,
          onstart: handleResizeStart,
          onend: handleResizeStop,
        }}
      >
        {React.cloneElement(children as ReactElement, {
          style: {
            ...((children as ReactElement).props.style || {}),
            left,
            width,
          },
        })}
      </InteractComp>
    );
  },
);

import { DragEvent, ResizeEvent } from '@interactjs/types/index';
import { useRef } from 'react';

const DEFAULT_SPEED = 1;
const MAX_SPEED = 3;
const CRITICAL_SIZE = 10;

export function useAutoScroll(target: React.MutableRefObject<HTMLDivElement>) {
  const leftBoundRef = useRef(Number.MIN_SAFE_INTEGER);
  const rightBoundRef = useRef(Number.MAX_SAFE_INTEGER);

  const speed = useRef(DEFAULT_SPEED);
  const frame = useRef<number>();

  const initAutoScroll = () => {
    if (target?.current) {
      const { left, width } = target.current.getBoundingClientRect();
      leftBoundRef.current = left;
      rightBoundRef.current = left + width;
    }
  };

  const dealDragAutoScroll = (e: DragEvent, deltaScroll?: (delta: number) => void) => {
    // 超出
    if (e.clientX >= rightBoundRef.current || e.clientX <= leftBoundRef.current) {
      cancelAnimationFrame(frame.current);
      const over = Math.abs(e.clientX >= rightBoundRef.current ? e.clientX - rightBoundRef.current : e.clientX - leftBoundRef.current);
      speed.current = Math.min(Number((over / CRITICAL_SIZE).toFixed(0)) * DEFAULT_SPEED, MAX_SPEED);

      const dir = e.clientX >= rightBoundRef.current ? 1 : -1;
      const delta = dir * speed.current;
      const loop = () => {
        deltaScroll && deltaScroll(delta);
        frame.current = requestAnimationFrame(loop);
      };

      frame.current = requestAnimationFrame(loop);
      return false;
    } else {
      cancelAnimationFrame(frame.current);
    }

    return true;
  };

  const dealResizeAutoScroll = (e: ResizeEvent, dir: 'left' | 'right', deltaScroll?: (delta: number) => void) => {
    if (e.clientX >= rightBoundRef.current || e.clientX < leftBoundRef.current) {
      cancelAnimationFrame(frame.current);
      const over = Math.abs(e.clientX >= rightBoundRef.current ? e.clientX - rightBoundRef.current : e.clientX - leftBoundRef.current);
      speed.current = Math.min(Number((over / CRITICAL_SIZE).toFixed(0)) * DEFAULT_SPEED, MAX_SPEED);

      const direction = e.clientX >= rightBoundRef.current ? 1 : -1;
      const delta = direction * speed.current;
      const loop = () => {
        deltaScroll && deltaScroll(delta);
        frame.current = requestAnimationFrame(loop);
      };

      frame.current = requestAnimationFrame(loop);

      return false;
    } else {
      cancelAnimationFrame(frame.current);
    }
    return true;
  };

  const stopAutoScroll = () => {
    leftBoundRef.current = Number.MIN_SAFE_INTEGER;
    rightBoundRef.current = Number.MAX_SAFE_INTEGER;
    speed.current = DEFAULT_SPEED;
    cancelAnimationFrame(frame.current);
  };

  return {
    initAutoScroll,
    dealDragAutoScroll,
    dealResizeAutoScroll,
    stopAutoScroll,
  };
}

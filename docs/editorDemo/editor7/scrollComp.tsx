import React, { useLayoutEffect, useRef } from 'react';
import { FC } from 'react';

export const ScrollComp: FC<{
  scrollTop?: number;
  className?: string;
  style?: React.CSSProperties;
  scrollLeft?: number;
  onScroll?: (param: { scrollLeft: number; scrollTop: number }) => void;
}> = ({ className, style, scrollTop, scrollLeft, children, onScroll }) => {
  const preLeftRef = useRef(0);
  const preTopRef = useRef(0);
  const isAllowRef = useRef(false);
  const domRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (scrollTop !== preTopRef.current) {
      domRef.current.scrollTop = scrollTop;
      preTopRef.current = scrollTop;
      isAllowRef.current = false;
    }
  }, [scrollTop]);

  useLayoutEffect(() => {
    if (scrollLeft !== preLeftRef.current) {
      domRef.current.scrollLeft = scrollLeft;
      preLeftRef.current = scrollLeft;
      isAllowRef.current = false;
    }
  }, [scrollLeft]);
  return (
    <div
      ref={domRef}
      style={{ overflow: 'overlay', ...(style || {}) }}
      onScroll={(e) => {
        const target = e.target as HTMLDivElement;
        if (isAllowRef.current) {
          const left = target.scrollLeft;
          const top = target.scrollTop;
          preLeftRef.current = left;
          preTopRef.current = top;
          onScroll(target);
        }
        isAllowRef.current = true;
      }}
      className={className}
    >
      {children}
    </div>
  );
};

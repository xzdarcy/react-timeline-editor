import { TimelineEditor } from "@xzdarcy/react-timeline-editor";
import { useEffect, useRef, useState } from "react";

export function useScrollTop() {
  const isAllowScrollRef = useRef(true);
  const topRef = useRef(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    topRef.current !== scrollTop && (isAllowScrollRef.current = false);
  }, [scrollTop]);

  const onScroll: TimelineEditor['onScroll'] = ({ scrollTop }) => {
    if (isAllowScrollRef.current) {
      topRef.current = scrollTop;
      setScrollTop(scrollTop)
    }
    isAllowScrollRef.current = true;
  }
  
  return {
    onScroll: onScroll,
    scrollTop: scrollTop,
  };
}

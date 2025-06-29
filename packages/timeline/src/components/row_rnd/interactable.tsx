import { DraggableOptions } from "@interactjs/actions/drag/plugin";
import { ResizableOptions } from "@interactjs/actions/resize/plugin";
import { DragEvent, Interactable } from "@interactjs/types";
import interact from "interactjs";
import { cloneElement, FC, ReactElement, useEffect, useRef } from "react";

export const InteractComp: FC<{
  interactRef?: React.MutableRefObject<Interactable>;
  draggable: boolean;
  draggableOptions: DraggableOptions;
  resizable: boolean;
  resizableOptions: ResizableOptions;
}> = ({ children, interactRef, draggable, resizable, draggableOptions, resizableOptions }) => {
  const nodeRef = useRef<HTMLElement>();
  const interactable = useRef<Interactable>();
  const draggableOptionsRef = useRef<DraggableOptions>();
  const resizableOptionsRef = useRef<ResizableOptions>();

  useEffect(() => {
    draggableOptionsRef.current = { ...draggableOptions };
    resizableOptionsRef.current = { ...resizableOptions };
  }, [draggableOptions, resizableOptions]);

  useEffect(() => {
    interactable.current && interactable.current.unset();
    interactable.current = interact(nodeRef.current);
    interactRef.current = interactable.current;
    setInteractions();
  }, [draggable, resizable]);

  const setInteractions = () => {
    if (draggable)
      interactable.current.draggable({
        ...draggableOptionsRef.current,
        onstart: (e) => draggableOptionsRef.current.onstart && (draggableOptionsRef.current.onstart as (e: DragEvent) => any)(e),
        onmove: (e) => draggableOptionsRef.current.onmove && (draggableOptionsRef.current.onmove as (e: DragEvent) => any)(e),
        onend: (e) => draggableOptionsRef.current.onend && (draggableOptionsRef.current.onend as (e: DragEvent) => any)(e),
      });
    if (resizable) interactable.current.resizable({ 
      ...resizableOptionsRef.current,
      onstart: (e) => resizableOptionsRef.current.onstart && (resizableOptionsRef.current.onstart as (e: DragEvent) => any)(e),
      onmove: (e) => resizableOptionsRef.current.onmove && (resizableOptionsRef.current.onmove as (e: DragEvent) => any)(e),
      onend: (e) => resizableOptionsRef.current.onend && (resizableOptionsRef.current.onend as (e: DragEvent) => any)(e),
    });
  };

  return cloneElement(children as ReactElement, {
    ref: nodeRef,
    draggable: false,
  });
};

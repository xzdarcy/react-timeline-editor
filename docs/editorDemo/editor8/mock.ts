import { TimelineEffect, TimelineRow } from '@xzdarcy/react-timeline-editor';

export const mockEffect: Record<string, TimelineEffect> = {
  effect0: {
    id: "effect0",
    name: "效果0",
  },
  effect1: {
    id: "effect1",
    name: "效果1",
  },
};


export const mockData: TimelineRow[] = [
  {
    id: "0",
    actions: [
      {
        id: "action00",
        start: 0,
        end: 2,
        effectId: "effect0",
      },
    ],
  },
  {
    id: "1",
    actions: [
      {
        id: "action10",
        start: 3,
        end: 3,
        flexible: false,
        effectId: "effect1",
      }
    ],
  },
  {
    id: "2",
    actions: [
      {
        id: "action20",
        flexible: false,
        start: 2.3,
        end: 4.6,
        effectId: "effect0",
      },
    ],
  },
  {
    id: "3",
    actions: [
      {
        id: "action30",
        start: 1.5,
        end: 1.5,
        effectId: "effect0",
      }
    ],
  },
  {
    id: "4",
    actions: [
      {
        id: "action40",
        start: 1,
        end: 1,
        flexible: false,
        effectId: "effect1",
      }
    ],
  },
  {
    id: "5",
    actions: [
      {
        id: "action50",
        movable: false,
        start: 1,
        end: 3,
        effectId: "effect0",
      }
    ],
  },
];

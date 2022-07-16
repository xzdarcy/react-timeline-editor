import { TimelineEffect, TimelineRow } from '@xzdarcy/react-timeline-editor';

export const mockEffect: Record<string, TimelineEffect> = {
  effect0: {
    id: 'effect0',
    name: '效果0',
  },
  effect1: {
    id: 'effect1',
    name: '效果1',
  },
};

export const mockData: TimelineRow[] = [
  {
    id: '0',
    actions: [
      {
        id: 'action00',
        maxEnd: 3,
        start: 0,
        end: 1,
        effectId: 'effect0',
      },
    ],
  },
  {
    id: '2',
    actions: [
      {
        id: 'action20',
        minStart: 1,
        maxEnd: 4,
        start: 2.3,
        end: 3.2,
        effectId: 'effect0',
      },
    ],
  },
  {
    id: '5',
    actions: [
      {
        id: 'action50',
        minStart: 2,
        start: 3,
        end: 5,
        effectId: 'effect0',
      },
    ],
  },
];

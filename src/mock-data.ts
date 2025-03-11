import { TimelineRow } from './interface/action';
import { TimelineEffect } from './interface/effect';

export const MockEffectData: Record<string, TimelineEffect> = {
  effect0: {
    id: 'effect0',
    name: 'Effect 0',
  },
  effect1: {
    id: 'effect1',
    name: 'Effect 1',
  },
};

export const MockRowData: TimelineRow[] = [
  {
    id: '0',
    name: 'First Row',
    actions: [
      {
        id: 'action00',
        start: 0,
        end: 2,
        effectId: 'effect0',
      },
    ],
  },
  {
    id: '1',
    name: 'Second Row',
    actions: [
      {
        id: 'action10',
        start: 1.5,
        end: 5,
        effectId: 'effect1',
      },
    ],
  },
  {
    id: '2',
    name: 'Third Row',
    actions: [
      {
        id: 'action20',
        flexible: false,
        movable: false,
        start: 3,
        end: 4,
        effectId: 'effect0',
      },
    ],
  },
  {
    id: '3',
    actions: [
      {
        id: 'action30',
        start: 4,
        end: 4.5,
        effectId: 'effect1',
      },
      {
        id: 'action31',
        start: 6,
        end: 8,
        effectId: 'effect1',
      },
    ],
  },
];

# React Timeline Editor
[![npm version](https://img.shields.io/npm/v/@rakesh.rk1/react-timeline-editor.svg?style=flat-square)](https://www.npmjs.com/package/@rakesh.rk1/react-timeline-editor)

**[React Timeline Editor](https://zdarcy.com/)** is a react component used to quickly build a timeline animation editor.

## Getting Started

```bash
npm i @rakesh.rk1/react-timeline-editor
```

```ts
import { Timeline, TimelineEffect, TimelineRow } from '@rakesh.rk1/react-timeline-editor';
import React from 'react';

const mockData: TimelineRow[] = [{
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
        start: 1.5,
        end: 5,
        effectId: "effect1",
      }
    ],
}]

const mockEffect: Record<string, TimelineEffect> = {
  effect0: {
    id: "effect0",
    name: "效果0",
  },
  effect1: {
    id: "effect1",
    name: "效果1",
  },
};

const TimelineEditor = () => {
  return (
      <Timeline
        editorData={mockData}
        effects={mockEffect}
      />
  );
};
```

## Documention
Checkout the [Docs](https://zdarcy.com/) for a demonstration of some basic and advanced features.


import { Timeline, TimelineAction } from '@xzdarcy/react-timeline-editor';
import { cloneDeep } from 'lodash';
import React, { useRef, useState } from 'react';
import './index.less';
import { mockData, mockEffect } from './mock';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);
  const idRef = useRef(0)

  return (
    <div className="timeline-editor-example0">
      <Timeline
        onChange={setData}
        editorData={data}
        effects={mockEffect}
        hideCursor={false}
        onDoubleClickRow={(e, {row, time}) => {
          setData((pre) => {
            const rowIndex = pre.findIndex(item => item.id === row.id);
            const newAction: TimelineAction = {
              id: `action${idRef.current++}`,
              start: time,
              end: time + 0.5,
              effectId: "effect0",
            }
            pre[rowIndex] = {...row, actions: row.actions.concat(newAction)};
            return [...pre];
          })
        }}
      />
    </div>
  );
};

export default TimelineEditor;

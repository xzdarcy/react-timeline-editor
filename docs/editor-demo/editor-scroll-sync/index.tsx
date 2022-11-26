import { Timeline, TimelineState } from '@xzdarcy/react-timeline-editor';
import { cloneDeep } from 'lodash';
import React, { useRef, useState } from 'react';
import './index.less';
import { mockData, mockEffect } from './mock';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);
  const domRef = useRef<HTMLDivElement>();
  const timelineState = useRef<TimelineState>();
  return (
    <div className="timeline-editor-example7">
      <div
        ref={domRef}
        style={{ overflow: 'overlay' }}
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          timelineState.current.setScrollTop(target.scrollTop);
        }}
        className={'timeline-list'}
      >
        {data.map((item) => {
          return (
            <div className="timeline-list-item" key={item.id}>
              <div className="text">{`row${item.id}`}</div>
            </div>
          );
        })}
      </div>
      <Timeline
        ref={timelineState}
        onChange={setData}
        editorData={data}
        effects={mockEffect}
        onScroll={({ scrollTop }) => {
          domRef.current.scrollTop = scrollTop;
        }}
      />
    </div>
  );
};

export default TimelineEditor;

import { Timeline } from '@xzdarcy/react-timeline-editor';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import './index.less';
import { mockData, mockEffect } from './mock';
import { ScrollComp } from './scrollComp';
import { useScrollTop } from './useScrollTop';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);
  const { scrollTop, onScroll } = useScrollTop();
  return (
    <div className="timeline-editor-example7">
      <ScrollComp
        scrollTop={scrollTop}
        onScroll={onScroll}
        className="timeline-list"
      >
        {data.map((item) => {
          return (
            <div className="timeline-list-item" key={item.id}>
              <div className="text">{`row${item.id}`}</div>
            </div>
          );
        })}
      </ScrollComp>
      <Timeline
        onChange={setData}
        editorData={data}
        effects={mockEffect}
        scrollTop={scrollTop}
        onScroll={onScroll}
      />
    </div>
  );
};

export default TimelineEditor;

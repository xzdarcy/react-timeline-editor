import { Timeline } from '@xzdarcy/react-timeline-editor';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { CustomRender0, CustomRender1 } from './custom';
import './index.less';
import { mockData, mockEffect } from './mock';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);

  return (
    <div className="timeline-editor-example2">
      <Timeline
        onChange={setData}
        editorData={data}
        effects={mockEffect}
        hideCursor={false}
        getActionRender={(action, row) => {
          if(action.effectId === 'effect0') {
            return <CustomRender0 action={action} row={row}/>
          } else if (action.effectId === 'effect1') {
            return <CustomRender1 action={action} row={row}/>
          }
        }}
      />
    </div>
  );
};

export default TimelineEditor;

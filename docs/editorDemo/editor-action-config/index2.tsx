import { Timeline } from '@xzdarcy/react-timeline-editor';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import { CustomRender0 } from './custom2';
import './index.less';
import { mockData, mockEffect } from './mock2';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);

  return (
    <div className="timeline-editor-example8">
      <Timeline
        onChange={setData}
        editorData={data}
        effects={mockEffect}
        hideCursor={false}
        getActionRender={(action, row) => {
          return <CustomRender0 action={action} row={row} />;
        }}
      />
    </div>
  );
};

export default TimelineEditor;

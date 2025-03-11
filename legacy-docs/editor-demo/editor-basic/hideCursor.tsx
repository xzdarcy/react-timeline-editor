import { Timeline } from '@xzdarcy/react-timeline-editor';
import { Switch } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import './index.less';
import { mockData, mockEffect } from './mock';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);
  const [showCursor, setShowCursor] = useState(false);

  return (
    <div className="timeline-editor-example0">
      <Switch
        checkedChildren="开启光标"
        unCheckedChildren="隐藏光标"
        checked={showCursor}
        onChange={e => setShowCursor(e)}
        style={{marginBottom: 20}}
      />
      <Timeline
        onChange={setData}
        editorData={data}
        effects={mockEffect}
        hideCursor={!showCursor}
      />
    </div>
  );
};

export default TimelineEditor;

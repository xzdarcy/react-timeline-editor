import { Timeline } from '@xzdarcy/react-timeline-editor';
import { Switch } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import './index.less';
import { mockData, mockEffect } from './mock';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);
  const [autoScroll, setAutoScroll] = useState(true);

  return (
    <div className="timeline-editor-example9">
      <Switch
        checkedChildren="开启自动滚动"
        unCheckedChildren="禁用自动滚动"
        checked={autoScroll}
        onChange={(e) => setAutoScroll(e)}
        style={{ marginBottom: 20 }}
      />
      <Timeline
        onChange={setData}
        editorData={data}
        effects={mockEffect}
        autoScroll={autoScroll}
      />
    </div>
  );
};

export default TimelineEditor;

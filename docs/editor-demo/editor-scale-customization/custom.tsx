import { Timeline } from '@xzdarcy/react-timeline-editor';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import './index.less';
import { mockData, mockEffect } from './mock';

const defaultEditorData = cloneDeep(mockData);

const CustomScale = (props: {scale: number}) => {
  const {scale} = props;
  const min = parseInt(scale / 60 + '');
  const second = (scale % 60 + '').padStart(2, '0');
  return <>{`${min}:${second}`}</>
}

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);

  return (
    <div className="timeline-editor-example1">
      <Timeline
        onChange={setData}
        editorData={data}
        effects={mockEffect}
        scale={10}
        scaleSplitCount={10}
        getScaleRender={(scale) => <CustomScale scale={scale}/>}
      />
    </div>
  );
};

export default TimelineEditor;

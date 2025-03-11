import { Timeline, TimelineState } from '@xzdarcy/react-timeline-editor';
import { Switch } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useRef, useState } from 'react';
import { CustomRender0, CustomRender1 } from './custom';
import './index.less';
import { CustomTimelineAction, CusTomTimelineRow, mockData, mockEffect, scale, scaleWidth, startLeft } from './mock';
import TimelinePlayer from './player';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);
  const timelineState = useRef<TimelineState>();
  const playerPanel = useRef<HTMLDivElement>();
  const autoScrollWhenPlay = useRef<boolean>(true);

  return (
    <div className="timeline-editor-engine">
      <div className="player-config">
        <Switch
          checkedChildren="开启运行时自动滚动"
          unCheckedChildren="禁用运行时自动滚动"
          defaultChecked={autoScrollWhenPlay.current}
          onChange={(e) => (autoScrollWhenPlay.current = e)}
          style={{ marginBottom: 20 }}
        />
      </div>
      <div className="player-panel" id="player-ground-1" ref={playerPanel}></div>
      <TimelinePlayer timelineState={timelineState} autoScrollWhenPlay={autoScrollWhenPlay} />
      <Timeline
        scale={scale}
        scaleWidth={scaleWidth}
        startLeft={startLeft}
        autoScroll={true}
        ref={timelineState}
        editorData={data}
        effects={mockEffect}
        onChange={(data) => {
          setData(data as CusTomTimelineRow[]);
        }}
        getActionRender={(action, row) => {
          if (action.effectId === 'effect0') {
            return <CustomRender0 action={action as CustomTimelineAction} row={row as CusTomTimelineRow} />;
          } else if (action.effectId === 'effect1') {
            return <CustomRender1 action={action as CustomTimelineAction} row={row as CusTomTimelineRow} />;
          }
        }}
      />
    </div>
  );
};

export default TimelineEditor;

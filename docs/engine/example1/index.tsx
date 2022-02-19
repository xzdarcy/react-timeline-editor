import { Timeline, TimelineState } from 'react-timeline-animation-editor';
import { cloneDeep } from 'lodash';
import React, { useRef, useState } from 'react';
import TimelinePlayer from './player';
import { CustomRender0, CustomRender1 } from './custom';
import { CustomTimelineAction, CusTomTimelineRow, mockData, mockEffect } from './mock';
import './index.less';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);
  const timelineState = useRef<TimelineState>();
  const playerPanel = useRef<HTMLDivElement>();

  return (
    <div className="timeline-editor-engine">
      <div className="player-panel" id="player-ground-1" ref={playerPanel}></div>
      <TimelinePlayer timelineState={timelineState} />
      <Timeline
        scale={5}
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

import React, { FC } from 'react';
import { TimelineAction, TimelineRow } from '@xzdarcy/react-timeline-editor';

export const CustomRender0: FC<{ action: TimelineAction; row: TimelineRow }> =
  ({ action, row }) => {
    return (
      <div className={'effect0'}>
        <div className={`effect0-text`}>{`播放音频: ${(
          action.end - action.start
        ).toFixed(2)}s`}</div>
      </div>
    );
  };

export const CustomRender1: FC<{ action: TimelineAction; row: TimelineRow }> =
  ({ action, row }) => {
    return (
      <div className={'effect1'}>
        <img src="/assets/flag.png"></img>
      </div>
    );
  };

import React, { FC } from 'react';
import { CustomTimelineAction, CusTomTimelineRow } from './mock';

export const CustomRender0: FC<{ action: CustomTimelineAction; row: CusTomTimelineRow }> = ({ action, row }) => {
  return (
    <div className={'effect0'}>
      <div className={`effect0-text`}>{`播放音频: ${action.data.name}`}</div>
    </div>
  );
};

export const CustomRender1: FC<{ action: CustomTimelineAction; row: CusTomTimelineRow }> = ({ action, row }) => {
  return (
    <div className={'effect1'}>
      <div className={`effect1-text`}>{`播放动画: ${action.data.name}`}</div>
    </div>
  );
};

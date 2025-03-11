import React, { FC } from 'react';
import { TimelineAction, TimelineRow } from '@xzdarcy/react-timeline-editor';

export const CustomRender0: FC<{ action: TimelineAction; row: TimelineRow }> =
  ({ action, row }) => {
    return (
      <div className={'effect0'}>
        <div className={`effect0-text`}>{`${typeof action.minStart === 'number' ? 'minStart:' + action.minStart : ''} ${
          typeof action.maxEnd === 'number' ? 'maxEnd:' + action.maxEnd : ''
        }`}</div>
      </div>
    );
  };
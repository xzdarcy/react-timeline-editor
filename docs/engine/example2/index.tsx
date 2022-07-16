import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { TimelineEngine } from '@xzdarcy/react-timeline-editor';
import { Slider } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import { mockData, mockEffect } from './mock';
import lottieControl from './lottieControl';

const TimelineEditor = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const timelineEngine = useRef<TimelineEngine>();
  const playerPanel = useRef<HTMLDivElement>();

  useEffect(() => {
    const engine = new TimelineEngine();
    timelineEngine.current = engine;
    timelineEngine.current.effects = mockEffect;
    timelineEngine.current.data = mockData;
    timelineEngine.current.on('play', () => setIsPlaying(true));
    timelineEngine.current.on('paused', () => setIsPlaying(false));
    timelineEngine.current.on('afterSetTime', ({ time }) => setTime(time));
    timelineEngine.current.on('setTimeByTick', ({ time }) => setTime(time));
    
    let dur = 0;
    mockData.forEach(row => {
      row.actions.forEach(action => dur = Math.max(dur, action.end));
    })
    setDuration(dur);

    return () => {
      if (!timelineEngine.current) return;
      timelineEngine.current.pause();
      timelineEngine.current.offAll();
      lottieControl.destroy();
    };
  }, []);

  // 开始或暂停
  const handlePlayOrPause = () => {
    if (!timelineEngine.current) return;
    if (timelineEngine.current.isPlaying) {
      timelineEngine.current.pause();
    } else {
      timelineEngine.current.play({ autoEnd: true });
    }
  };

  const handleSetTime = (value: number) => {
    timelineEngine.current.setTime(Number(value));
    timelineEngine.current.reRender();
  }

  // 时间展示
  const timeRender = (time: number) => {
    const float = (parseInt((time % 1) * 100 + '') + '').padStart(2, '0');
    const min = (parseInt(time / 60 + '') + '').padStart(2, '0');
    const second = (parseInt((time % 60) + '') + '').padStart(2, '0');
    return <>{`${min}:${second}.${float}`}</>;
  };

  return (
    <div className="timeline-editor-engine">
      <div className="player-panel" id="player-ground-2" ref={playerPanel}></div>
      <div className="timeline-player">
        <div className="play-control" onClick={handlePlayOrPause}>
          {isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
        </div>
        <div className="play-time">
          <div className="play-time-current">{timeRender(time)}</div>
          <Slider onChange={handleSetTime} className="play-time-slider" step={0.01} min={0} max={duration} value={time} />
          <div className="play-time-duration">{timeRender(duration)}</div>
        </div>
      </div>
    </div>
  );
};

export default TimelineEditor;

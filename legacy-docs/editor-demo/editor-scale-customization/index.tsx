import { Timeline } from '@xzdarcy/react-timeline-editor';
import { Col, Input, Row } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import './index.less';
import { mockData, mockEffect } from './mock';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);
  const [scale, setScale] = useState(5);
  const [scaleSplitCount, setScaleSplitCount] = useState(10);
  const [scaleWidth, setScaleWidth] = useState(160);
  const [startLeft, setStartLeft] = useState(20);

  return (
    <div className="timeline-editor-example1">
      <Input.Group style={{ marginBottom: 10 }} size="small">
        <Row gutter={[10, 10]}>
          <Col span={3} style={{ display: 'flex' }}>
            <span>scale：</span>
            <Input
              value={scale}
              onChange={(e) => {
                let value = e.target.value.replace(/[^\d]/g, '');
                setScale(Number(value));
              }}
            />
          </Col>
          <Col span={5} style={{ display: 'flex' }}>
            <span>scaleSplitCount：</span>
            <Input
              value={scaleSplitCount}
              onChange={(e) => {
                let value = e.target.value.replace(/[^\d]/g, '');
                setScaleSplitCount(Number(value));
              }}
            />
          </Col>
          <Col span={4} style={{ display: 'flex' }}>
            <span>scaleWidth：</span>
            <Input
              value={scaleWidth}
              onChange={(e) => {
                let value = e.target.value.replace(/[^\d]/g, '');
                setScaleWidth(Number(value));
              }}
            />
          </Col>
          <Col span={4} style={{ display: 'flex' }}>
            <span>startLeft：</span>
            <Input
              value={startLeft}
              onChange={(e) => {
                let value = e.target.value.replace(/[^\d]/g, '');
                setStartLeft(Number(value));
              }}
            />
          </Col>
        </Row>
      </Input.Group>
      <Timeline
        onChange={setData}
        autoScroll={true}
        editorData={data}
        effects={mockEffect}
        scale={scale}
        startLeft={startLeft}
        scaleSplitCount={scaleSplitCount}
        scaleWidth={scaleWidth}
      />
    </div>
  );
};

export default TimelineEditor;

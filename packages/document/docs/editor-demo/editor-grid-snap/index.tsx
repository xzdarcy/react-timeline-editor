import { Timeline } from '@xzdarcy/react-timeline-editor';
import { Input, Row, Col, Switch } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import './index.less';
import { mockData, mockEffect } from './mock';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);
  const [scaleSplitCount, setScaleSplitCount] = useState(10);
  const [gridSnip, setGridSnip] = useState(true);

  return (
    <div className="timeline-editor-example3">
      <Input.Group style={{ marginBottom: 10 }} size="small">
        <Row gutter={[8, 8]}>
          <Col flex={'0 0 auto'}>scaleSplitCount</Col>
          <Col span={2}>
            <Input
              value={scaleSplitCount}
              onChange={(e) => {
                let value = e.target.value.replace(/[^\d]/g, '');
                setScaleSplitCount(Number(value));
              }}
            />
          </Col>
          <Col flex={'0 0 auto'}>gridSnip</Col>
          <Col span={2}>
            <Switch checked={gridSnip} onChange={setGridSnip} />
          </Col>
        </Row>
      </Input.Group>
      <Timeline
        scale={5}
        onChange={setData}
        editorData={data}
        effects={mockEffect}
        gridSnap={gridSnip}
        scaleSplitCount={scaleSplitCount}
      />
    </div>
  );
};

export default TimelineEditor;

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Button } from 'antd';
import { wInfo } from '../../../.storybook/utils';
import mdGet from './get.md';

import { [CLASSNAME]Factory } from '../../../src';
import { modelPropsGen } from '../../helper';

const {
  [CLASSNAME]WithStore: [CLASSNAME]WithStore1,
  client: client1
} = [CLASSNAME]Factory();

// const {
//   [CLASSNAME]WithStore: [CLASSNAME]WithStore2,
//   client: client2
// } = [CLASSNAME]Factory();

const styles = {
  demoWrap: {
    display: 'flex',
    width: '100%'
  }
};

let config = {};

const getInfo = (client, filter) => () => {
  const query = filter && filter.length ? `filter=${filter.join(',')}` : '';
  client.get(`/model?${query}`).then(res => {
    const { status, body } = res;
    if (status === 200) {
      config = body.config;
    }

    document.getElementById('info').innerText = JSON.stringify(config, null, 4);
  });
};

const createNew = client => () => {
  const model = modelPropsGen();
  client.post('/model', { model: model });
};

function onClick(value) {
  console.log('当前值：', value);
}
storiesOf('API - get', module)
  .addParameters(wInfo(mdGet))
  .addWithJSX('/model 获取属性信息', () => {
    return (
      <Row style={styles.demoWrap}>
        <Col span={10} offset={2}>
          <Button onClick={getInfo(client1)}>获取信息</Button>
          <Button onClick={getInfo(client1, ['width', 'value'])}>
            获取指定信息(width, value)
          </Button>
          <Button onClick={createNew(client1)}>随机创建</Button>

          <[CLASSNAME]WithStore1 onClick={onClick} />
        </Col>
        <Col span={12}>
          <div id="info" />
        </Col>
      </Row>
    );
  });
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Input, Button, Select } from 'antd';
import { wInfo } from '../../../.storybook/utils';
import mdPut from './put.md';

import { [CLASSNAME]Factory } from '../../../src';
import { modelPropsGen } from '../../helper';

const { [CLASSNAME]WithStore, client } = [CLASSNAME]Factory();

const { Option } = Select;
const styles = {
  demoWrap: {
    display: 'flex',
    width: '100%'
  }
};

let selectedAttrName = '';

const createNew = client => () => {
  const model = modelPropsGen();
  client.post('/model', { model: model });
};

function onClick(value) {
  console.log('当前点击值：', value);
}

function handleChange(value) {
  console.log(`selected ${value}`);
  selectedAttrName = value;
}


function updateAttr() {
  if (!selectedAttrName) {
    document.getElementById('info').innerText = '请选择要更改的属性';
    return;
  }

  const value = document.getElementById('targeValue').value;

  // 更新节点属性，返回更新后的数值
  client
    .put(`/model`, { name: selectedAttrName, value: value })
    .then(res => {
      const { status, body } = res;
      if (status === 200) {
        client.get(`/model`).then(res => {
          const { status, body } = res;
          if (status === 200) {
            const attributes = body.attributes || {};
            document.getElementById('info').innerText =
              `更新操作：; \n` + JSON.stringify(attributes, null, 4);
          }
        });
      }
    })
    .catch(err => {
      document.getElementById('info').innerText =
        `更新失败： \n` + JSON.stringify(err, null, 4);
    });
}


let selectedTarget = '';

function handleChangeCss(value) {
  console.log(`selected target ${value}`);
  selectedTarget = value;
}

function updateCss() {
  if (!selectedTarget) {
    document.getElementById('info').innerText = '请选择更改对象';
    return;
  }

  const cssKey = document.getElementById('cssKey').value;
  const cssValue = document.getElementById('cssValue').value;
  const style = {};
  style[cssKey] = cssValue;
  // 更新节点属性，返回更新后的数值
  client
    .put(`/model/styles/${selectedTarget}`, { style: style })
    .then(res => {
      const { status, body } = res;
      if (status === 200) {
        const result = body;
        client.get(`/model?filter=styles`).then(res => {
          const { status, body } = res;
          if (status === 200) {
            const attributes = body.attributes || {};
            document.getElementById('info').innerText =
              `更新操作：${result.success} - ${result.message}; \n` + JSON.stringify(attributes, null, 4);
          }
        });
      }
    })
    .catch(err => {
      document.getElementById('info').innerText =
        `更新失败： \n` + JSON.stringify(err, null, 4);
    });
}

storiesOf('API - put', module)
  .addParameters(wInfo(mdPut))
  .addWithJSX('/model 更改属性', () => {
    return (
      <Row style={styles.demoWrap}>
        <Col span={10} offset={2}>

          <Row>
            <Col span={6}>
              <Select
                style={{ width: 200 }}
                onChange={handleChange}
                placeholder="要更改的属性"
              >
                <Option value="visible">visible</Option>
                <Option value="text">text</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Input placeholder="新属性值" id="targeValue" />
            </Col>
            <Col span={10}>
              <Button onClick={updateAttr}>更改信息</Button>
              <Button onClick={createNew(client)}>随机创建</Button>
            </Col>
          </Row>

          <[CLASSNAME]WithStore onClick={onClick} />
        </Col>
        <Col span={12}>
          <div id="info" />
        </Col>
      </Row>
    );
  }).addWithJSX('/model/styles 更改样式', () => {
    return (
      <Row style={styles.demoWrap}>
        <Col span={10} offset={2}>
          <Row>
            <Col span={6}>
              <Select
                style={{ width: 200 }}
                onChange={handleChangeCss}
                placeholder="选择更改的对象"
              >
                <Option value="container">container</Option>
              </Select>
            </Col>
            <Col span={10}>
              <Input placeholder="css key" id="cssKey" />
              <Input placeholder="css value" id="cssValue" />
            </Col>
            <Col span={6}>
              <Button onClick={updateCss}>更改样式</Button>
              <Button onClick={createNew(client)}>随机创建</Button>
            </Col>
          </Row>

          <[CLASSNAME]WithStore onClick={onClick} />
        </Col>
        <Col span={12}>
          <div id="info" />
        </Col>
      </Row>
    );
  });
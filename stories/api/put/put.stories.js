import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Input, Button, Select } from 'antd';
import { wInfo } from '../../../.storybook/utils';
import mdPut from './put.md';

// import { ComponentTreeFactory } from '../../../src';
// import { treegen } from '../../helper';

// const {ComponentTreeWithStore, client} = ComponentTreeFactory();

const { Option } = Select;
const styles = {
  demoWrap: {
    display: 'flex',
    width: '100%'
  }
};

let selectedAttrName = '';

function createNew() {
  const schema = treegen({});
  client.post('/nodes', { schema: schema });
}

function updateRootName() {
  client.put('/nodes/root', { name: 'name', value: 'ggggod' });
}

function handleChange(value) {
  console.log(`selected ${value}`);
  selectedAttrName = value;
}

function updateById() {
  const id = document.getElementById('nodeId').value;
  if (!id) {
    document.getElementById('info').innerText = '请输入节点 id';
    return;
  }
  if (!selectedAttrName) {
    document.getElementById('info').innerText = '请选择要更改的属性';
    return;
  }

  const value = document.getElementById('targeValue').value;

  // 更新节点属性，返回更新后的数值
  client
    .put(`/nodes/${id}`, { name: selectedAttrName, value: value })
    .then(res => {
      const { status, body } = res;
      if (status === 200) {
        const isSuccess = body.success;
        client.get(`/nodes/${id}`).then(res => {
          const { status, body } = res;
          if (status === 200) {
            const node = body.node || {};
            document.getElementById('info').innerText =
              `更新操作：${isSuccess}; \n` +
              JSON.stringify(node.toJSON ? node.toJSON() : node, null, 4);
          }
        });

        // 同时选中那个节点
        client.put(`/selection/${id}`);
      }
    })
    .catch(err => {
      document.getElementById('info').innerText =
        `更新失败： \n` + JSON.stringify(err, null, 4);
    });
}
storiesOf('API - put', module)
  .addParameters(wInfo(mdPut))
  .addWithJSX('/nodes/:id 更改节点信息', () => {
    return (
      <Row style={styles.demoWrap}>
        <Col span={10} offset={2}>
          <Row>
            <Col span={4}>
              <Input placeholder="节点 ID" id="nodeId" />
            </Col>
            <Col span={4}>
              <Select
                style={{ width: 200 }}
                onChange={handleChange}
                placeholder="要更改的属性"
              >
                <Option value="name">name</Option>
                <Option value="screenId">screenId</Option>
                <Option value="attrs">attrs</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Input placeholder="新属性值" id="targeValue" />
            </Col>
            <Col span={10}>
              <Button onClick={updateById}>更改节点信息</Button>
              <Button onClick={updateRootName}>更新根节点名字</Button>
              <Button onClick={createNew}>创建随机树</Button>
            </Col>
          </Row>

          {/* <ComponentTreeWithStore /> */}
        </Col>
        <Col span={12}>
          <div id="info" />
        </Col>
      </Row>
    );
  });

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Input, Button } from 'antd';
import { wInfo } from '../../../.storybook/utils';
import mdDel from './del.md';

// import { ComponentTreeFactory } from '../../../src';
// import { treegen } from '../../helper';

// const {ComponentTreeWithStore, client} = ComponentTreeFactory();

const styles = {
  demoWrap: {
    display: 'flex',
    width: '100%'
  }
};

function createNew() {
  const schema = treegen({});
  client.post('/nodes', { schema: schema });
}

function resetSchema() {
  client.del('/nodes');
}

function removeNodeById() {
  const id = document.getElementById('nodeId').value;
  if (!id) {
    document.getElementById('info').innerText = '请输入节点 id';
    return;
  }

  // 移除指定节点
  client.del(`/nodes/${id}`).then(res => {
    const { status, body } = res;
    if (status === 200) {
      const node = body.node || {};
      document.getElementById('info').innerText =
        `被删除节点信息：\n` + JSON.stringify(node, null, 4);
      // 同时选中父节点
      client.put(`/selection/${id}`);
    }
  });
}
storiesOf('API - del', module)
  .addParameters(wInfo(mdDel))
  .addWithJSX('/nodes/:id 移除指定节点', () => {
    return (
      <Row style={styles.demoWrap}>
        <Col span={10} offset={2}>
          <Row>
            <Col span={4}>
              <Input placeholder="节点 ID" id="nodeId" />
            </Col>
            <Col span={20}>
              <Button onClick={removeNodeById}>移除节点</Button>
              <Button onClick={resetSchema}>重置成空树</Button>
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

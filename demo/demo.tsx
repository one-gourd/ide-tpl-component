import * as React from 'react';
import { render } from 'react-dom';
import { [CLASSNAME], [CLASSNAME]Factory, I[CLASSNAME]Props } from '../src/';
import { Collapse } from 'antd';
const Panel = Collapse.Panel;

const { [CLASSNAME]WithStore, client } = [CLASSNAME]Factory();

function onClick(value) {
  console.log('当前点击：', value);
}
function onClickWithStore(value) {
  client.put(`/model`, {
    name: 'text',
    value: `gggg${Math.random()}`.slice(0, 8)
  });
}

const props: I[CLASSNAME]Props = {
  visible: true
};

render(
  <Collapse defaultActiveKey={['1']}>
    <Panel header="普通组件" key="0">
      <[CLASSNAME] {...props} onClick={onClick} />
    </Panel>
    <Panel header="包含 store 功能" key="1">
      <[CLASSNAME]WithStore onClick={onClickWithStore} />
    </Panel>
  </Collapse>,
  document.getElementById('example') as HTMLElement
);

client.post('/model', {
  model: {
    visible: true,
    text: `text${Math.random()}`.slice(0, 8)
  }
});

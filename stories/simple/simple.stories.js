import React from 'react';
import { storiesOf } from '@storybook/react';
import { wInfo } from '../../.storybook/utils';

import { ContextMenu, createModel } from '../../src/';
import { menuNormalGen } from '../helper';

import mdMobx from './simple-mobx.md';
import mdPlain from './simple-plain.md';

const menuNormal = menuNormalGen();
const menuNormalModel = createModel(menuNormal);

function onClickItem(key, keyPath, item) {
  console.log(`当前点击项的 id: ${key}`);
}

const clickBtn = menu => () => {
  const firstItem = menu.children[0];
  if (firstItem.setName) {
    firstItem.setName('hello2');
  } else {
    firstItem.name = 'hello';
  }
};

storiesOf('基础使用', module)
  .addParameters(wInfo(mdMobx))
  .addWithJSX('使用 mobx 对象', () => (
    <div>
      <ContextMenu
        visible={true}
        menu={menuNormalModel}
        width={200}
        left={400}
        top={100}
        onClickItem={onClickItem}
      />
      <button onClick={clickBtn(menuNormalModel)}>
        更换首个 item 的 name （会响应）
      </button>
    </div>
  ))
  .addParameters(wInfo(mdPlain))
  .addWithJSX('普通 menu 对象', () => (
    <div>
      <ContextMenu
        visible={true}
        menu={menuNormal}
        width={200}
        left={400}
        top={100}
        onClickItem={onClickItem}
      />
      <button onClick={clickBtn(menuNormal)}>
        更换首个 item 的 name （不会响应）
      </button>
    </div>
  ));

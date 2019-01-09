import React from 'react';
import { storiesOf } from '@storybook/react';
import { wInfo } from '../../.storybook/utils';

import { [CLASSNAME], createModel } from '../../src/';

import mdMobx from './simple-mobx.md';
import mdPlain from './simple-plain.md';

const propsNormal = {
  visible: true
};
const propsModel = createModel(propsNormal);

function onClick(value) {
  console.log('当前编辑器的值：', value);
}

const clickBtn = target => () => {
  if (target && target.setWidth) {
    target.setWidth(1000);
  } else {
    target.width = 1000;
  }
};

storiesOf('基础使用', module)
  .addParameters(wInfo(mdMobx))
  .addWithJSX('使用 mobx 化的 props', () => (
    <div>
      <button onClick={clickBtn(propsModel)}>调整宽度（会响应）</button>
      <[CLASSNAME] width={propsModel.visible} onClick={onClick} />
    </div>
  ))
  .addParameters(wInfo(mdPlain))
  .addWithJSX('普通 props 对象', () => (
    <div>
      <button onClick={clickBtn(propsNormal)}>调整宽度（不会响应）</button>
      <[CLASSNAME] {...propsNormal} onClick={onClick} />
    </div>
  ));
import * as React from 'react';
import { render } from 'react-dom';
import { [CLASSNAME],  } from '../src/';

function onClick(value) {
  console.log('当前点击：', value);
}

const props: I[CLASSNAME]Props = {
  visible: true
}

render(<[CLASSNAME] {...editor} onClick={onClick} />, document.getElementById(
  'example'
) as HTMLElement);
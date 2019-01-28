import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { ThemeProvider } from 'styled-components';


import { debugInteract, debugRender } from '../lib/debug';
import { StyledContainer } from './styles';
import { AppFactory } from './controller/index';
import { StoresFactory, IStoresModel } from './schema/stores';
import { T[CLASSNAME]ControlledKeys, CONTROLLED_KEYS } from './schema/index';


export interface I[CLASSNAME]Event {
  /**
   * 点击回调函数
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface IStyles {
  [propName: string]: React.CSSProperties;
}

export interface I[CLASSNAME]Styles extends IStyles {
  container?: React.CSSProperties;
}

export interface I[CLASSNAME]Theme {
  main: string;
  [prop: string]: any;
}

export interface I[CLASSNAME]Props extends I[CLASSNAME]Event{
  /**
   * 是否展现
   */
  visible?: boolean;

  /**
   * 文案
   */
  text?: string;

  /**
   * 样式集合，方便外部控制
   */
  styles?: I[CLASSNAME]Styles;

  /**
   * 设置主题
   */
  theme?: I[CLASSNAME]Theme;

};


export const DEFAULT_PROPS: I[CLASSNAME]Props = {
  visible: true,
  theme: {
    main: '#25ab68'
  },
  styles: {
    container: {}
  }
};

// 推荐使用 decorator 的方式，否则 stories 的导出会缺少 **Prop Types** 的说明
// 因为 react-docgen-typescript-loader 需要  named export 导出方式
@observer
export class [CLASSNAME] extends Component<I[CLASSNAME]Props> {
  public static defaultProps = DEFAULT_PROPS;
  // private root: React.RefObject<HTMLDivElement>;
  constructor(props: I[CLASSNAME]Props) {
    super(props);
    // this.state = {};
    // this.root = React.createRef();
  }
  onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onClick } = this.props;
    onClick && onClick(e);
  };
  render() {
    const { visible, text, styles, theme } = this.props;
    return (
      <ThemeProvider theme={theme}>      
        <StyledContainer
          style={styles.container}
          visible={visible}
          // ref={this.root}
          className="[NAME]-container"
        >
          <Button onClick={this.onClick}>
            {text || '点我试试'}
          </Button>
        </StyledContainer>
      </ThemeProvider>
    );
  }
}

/* ----------------------------------------------------
    以下是专门配合 store 时的组件版本
----------------------------------------------------- */
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

const onClickWithStore = (
  stores: IStoresModel,
  onClick: React.MouseEventHandler<HTMLButtonElement>
) => (e: React.MouseEvent<HTMLButtonElement>) => {
  // stores.setValue(newValue);
  onClick && onClick(e);
};

/**
 * 科里化创建 [CLASSNAME]WithStore 组件
 * @param stores - store 模型实例
 */
export const [CLASSNAME]AddStore = (stores: IStoresModel) => {
  return observer(function [CLASSNAME]WithStore(props: Omit<I[CLASSNAME]Props, T[CLASSNAME]ControlledKeys>) {
    const {onClick, ...otherProps} = props;
    const { model } = stores;
    const controlledProps: any = {};
    CONTROLLED_KEYS.forEach((storeKey: string) => {
      controlledProps[storeKey] = (model as any)[storeKey];
    });
    debugRender(`[${stores.id}] rendering`);
    return (
      <[CLASSNAME]
        {...controlledProps}
        {...otherProps}
      />
    );
  });
}
/**
 * 工厂函数，每调用一次就获取一副 MVC
 * 用于隔离不同的 [CLASSNAME]WithStore 的上下文
 */
export const [CLASSNAME]Factory = () => {
  const stores = StoresFactory(); // 创建 model
  const app = AppFactory(stores); // 创建 controller，并挂载 model
  return {
    stores,
    app,
    client: app.client,
    [CLASSNAME]WithStore: [CLASSNAME]AddStore(stores)
  };
};
import React, { Component } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { pick } from 'ide-lib-utils';
import { based, Omit, IBaseTheme, IBaseStyles, IBaseComponentProps } from 'ide-lib-base-component';


// import {
//   ISchemaTreeProps,
//   SchemaTree,
//   SchemaTreeAddStore,
//   TSchemaTreeControlledKeys
// } from 'ide-tree';

import { debugInteract, debugRender } from '../lib/debug';
import { StyledContainer } from './styles';
import { AppFactory } from './controller/index';
import { StoresFactory, IStoresModel } from './schema/stores';
import { T[CLASSNAME]ControlledKeys, CONTROLLED_KEYS } from './schema/index';

// type OptionalSchemaTreeProps = OptionalProps<
//   ISchemaTreeProps,
//   TSchemaTreeControlledKeys
// >;
interface ISubComponents {
  // SchemaTreeComponent: React.ComponentType<OptionalSchemaTreeProps>;
}

export interface I[CLASSNAME]Event {
  /**
   * 点击回调函数
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface I[CLASSNAME]Styles extends IBaseStyles {
  container?: React.CSSProperties;
}

export interface I[CLASSNAME]Theme extends IBaseTheme{
  main: string;
}

export interface I[CLASSNAME]Props extends I[CLASSNAME]Event, IBaseComponentProps{
  // /**
  // * 子组件 schemaTree
  // */
  // schemaTree: OptionalSchemaTreeProps;

  /**
   * 是否展现
   */
  visible?: boolean;

  /**
   * 文案
   */
  text?: string;

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

/**
 * 使用高阶组件打造的组件生成器
 * @param subComponents - 子组件列表
 */
export const [CLASSNAME]HOC = (subComponents: ISubComponents) => {
  const [CLASSNAME]HOC = (props: I[CLASSNAME]Props = DEFAULT_PROPS) => {
    // const { SchemaTreeComponent } = subComponents;
    const mergedProps = Object.assign({}, DEFAULT_PROPS, props);
    const { /* schemaTree, */ visible, text, styles } = mergedProps;

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const { onClick } = props;
      onClick && onClick(e);
    };

    return (
        <StyledContainer
          style={styles.container}
          visible={visible}
          // ref={this.root}
          className="[NAME]-container"
        >
          {/* <SchemaTreeComponent {...schemaTree} /> */}
          <Button onClick={onClick}>
            {text || '点我试试'}
          </Button>
        </StyledContainer>
    );
  };
  [CLASSNAME]HOC.displayName = '[CLASSNAME]HOC';
  return observer(based([CLASSNAME]HOC));
};

// 采用高阶组件方式生成普通的 [CLASSNAME] 组件
export const [CLASSNAME] = [CLASSNAME]HOC({
  // SchemaTreeComponent: SchemaTree,
});

/* ----------------------------------------------------
    以下是专门配合 store 时的组件版本
----------------------------------------------------- */

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
  const [CLASSNAME]HasSubStore = [CLASSNAME]HOC({
    // SchemaTreeComponent: SchemaTreeAddStore(stores.schemaTree)
  });

  const [CLASSNAME]WithStore = (props: Omit<I[CLASSNAME]Props, T[CLASSNAME]ControlledKeys>) => {
    const {/* schemaTree, */ onClick, ...otherProps} = props;
    const {/* schemaTree, */ model } = stores;
    const controlledProps = pick(model, CONTROLLED_KEYS);
    debugRender(`[${stores.id}] rendering`);
    return (
      <[CLASSNAME]HasSubStore
        // schemaTree={ schemaTree }
        {...controlledProps}
        {...otherProps}
      />
    );
  };

  [CLASSNAME]WithStore.displayName = '[CLASSNAME]WithStore';
  return observer([CLASSNAME]WithStore);
}
/**
 * 工厂函数，每调用一次就获取一副 MVC
 * 用于隔离不同的 [CLASSNAME]WithStore 的上下文
 */
export const [CLASSNAME]Factory = () => {
  const {stores, innerApps} = StoresFactory(); // 创建 model
  const app = AppFactory(stores, innerApps); // 创建 controller，并挂载 model
  return {
    stores,
    app,
    client: app.client,
    [CLASSNAME]WithStore: [CLASSNAME]AddStore(stores)
  };
};
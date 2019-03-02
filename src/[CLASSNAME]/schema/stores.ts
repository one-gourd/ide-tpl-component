import { cast, types, Instance, SnapshotOrInstance } from 'mobx-state-tree';
import {
  [SUBCOMP_START]
  TAnyMSTModel, getSubStoresAssigner, IStoresEnv,
  [SUBCOMP_END]
  getSubAppsFromFactoryMap } from 'ide-lib-base-component';

[SUBCOMP_START]
import {
  Stores as SchemaTreeStores,
  SchemaTreeFactory
} from 'ide-tree';
[SUBCOMP_END]

import { createEmptyModel } from './util';
import { [CLASSNAME]Model } from './index';

export const STORE_ID_PREIX = '[IDPREFIX]_';

// 获取被 store 控制的 key 的列表
export type TStoresControlledKeys =
  Exclude<keyof SnapshotOrInstance<typeof Stores>, 'id'>;

export const STORES_CONTROLLED_KEYS: string[] = [
  'model'
];


[SUBCOMP_START]
export enum ESubApps {
  schemaTree = 'schemaTree'
};

export const NAMES_SUBAPP = Object.values(ESubApps);

// 定义子 stores 映射关系
export const STORES_SUBAPP: Record<ESubApps, TAnyMSTModel> = {
  schemaTree: SchemaTreeStores,
};
[SUBCOMP_END]


// 定义子 facotry 映射关系
export const FACTORY_SUBAPP: Record<ESubApps, (...args: any[]) => Partial<IStoresEnv<TAnyMSTModel>>> = {
[SUBCOMP_START]
  schemaTree: SchemaTreeFactory,
[SUBCOMP_END]
}

export const Stores = types
  .model('StoresModel', {
    id: types.refinement(
      types.identifier,
      identifier => identifier.indexOf(STORE_ID_PREIX) === 0
    ),
    model: [CLASSNAME]Model,
[SUBCOMP_START]
    ...STORES_SUBAPP
[SUBCOMP_END]
  })
  .actions(self => {
[SUBCOMP_START]
    const assignerInjected = getSubStoresAssigner(self, NAMES_SUBAPP);
[SUBCOMP_END]
    return {
      setModel(model: SnapshotOrInstance<typeof self.model>) {
        self.model = cast(model);
      },
      [SUBCOMP_START]
      // 注入诸如 setSchemaTree 这样的方法
      ...assignerInjected,
      [SUBCOMP_END]
      resetToEmpty() {
        self.model = createEmptyModel();
      }
    };
  });

export interface IStoresModel extends Instance<typeof Stores> {}

let autoId = 1;

/**
 * 工厂方法，用于创建 stores，同时注入对应子元素的 client 和 app
 */
export function StoresFactory() {
  const { subStores, subApps, subClients } = getSubAppsFromFactoryMap(FACTORY_SUBAPP);

  // see: https://github.com/mobxjs/mobx-state-tree#dependency-injection
  // 依赖注入，方便在 controller 中可以直接调用子组件的 controller
  const stores = Stores.create(
    {
      id: `${STORE_ID_PREIX}${autoId++}`,
      ...subStores
    }, {
      clients: subClients
    }
  );

  return {
    stores,
    innerApps: subApps
  };
}
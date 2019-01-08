import { types, Instance } from 'mobx-state-tree';
import { MenuModel, IMenuModel } from './index';
import { createEmptyModel } from './util';

export const STORE_ID_PREIX = 'scm_';

export const Stores = types
  .model('StoresModel', {
    id: types.refinement(
      types.identifier,
      identifier => identifier.indexOf(STORE_ID_PREIX) === 0
    ),
    menu: MenuModel
  })
  .actions(self => {
    return {
      setMenu(menu: IMenuModel) {
        self.menu = menu;
      }
    };
  });

export interface IStoresModel extends Instance<typeof Stores> {}

let autoId = 1;
/**
 * 工厂方法，用于创建 stores
 */
export function StoresFactory(): IStoresModel {
  return Stores.create({
    id: `${STORE_ID_PREIX}${autoId++}`,
    menu: createEmptyModel()
  });
}

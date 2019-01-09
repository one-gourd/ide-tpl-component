import { types, Instance } from 'mobx-state-tree';
import { [CLASSNAME]Model, I[CLASSNAME]Model } from './index';
import { createEmptyModel } from './util';

export const STORE_ID_PREIX = '[IDPREFIX]_';

export const Stores = types
  .model('StoresModel', {
    id: types.refinement(
      types.identifier,
      identifier => identifier.indexOf(STORE_ID_PREIX) === 0
    ),
    model: [CLASSNAME]Model
  })
  .actions(self => {
    return {
      setModel(model: I[CLASSNAME]Model) {
        self.model = model;
      },
      resetToEmpty(){
        self.model = createEmptyModel();
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
    model: createEmptyModel()
  });
}

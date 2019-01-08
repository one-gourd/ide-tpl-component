import { types, destroy, IAnyModelType, Instance } from 'mobx-state-tree';
import { debugModel } from '../../lib/debug';

export enum EMenuItemType {
  NORMAL = 'normal',
  SEPARATOR = 'separator'
}

export const MENU_TYPES = Object.values(EMenuItemType);

/**
 * 菜单项模型
 */
export const MenuItemModel = types
  .model('MenuItemModel', {
    id: types.optional(types.string, ''),
    name: types.optional(types.string, ''),
    // sep 表示分割线
    type: types.optional(
      types.enumeration('Type', MENU_TYPES),
      EMenuItemType.NORMAL
    ),

    disabled: types.optional(types.boolean, false), // 是否可点击

    // 图标名，参考https://ant.design/components/icon-cn/
    icon: types.optional(types.string, ''),

    // 快捷键设置
    shortcut: types.optional(types.string, '') // 快捷键
  })
  .views(self => {
    return {
      get isDivider() {
        return this.type === EMenuItemType.SEPARATOR;
      }
    };
  })
  .actions(self => {
    return {
      setId(id: string) {
        self.id = id;
      },
      setName(name: string) {
        self.name = name;
      },
      setDisabled(state: boolean) {
        self.disabled = !!state;
      }
    };
  });
export interface IMenuItemObject {
  id: string;
  name: string;
  icon: string;
  type?: string;
  disabled?: boolean;
  shortcut?: string;
}
export interface IMenuItemModel extends Instance<typeof MenuItemModel> {}

/**
 * 菜单项的模型，包含普通的菜单和右键菜单
 */
export const MenuModel = types
  .model('MenuModel', {
    id: types.optional(types.string, ''),
    name: types.optional(types.string, ''),
    children: types.array(types.late((): IAnyModelType => MenuItemModel)) // 在 mst v3 中， `types.array` 默认值就是 `[]`
  })
  .actions(self => {
    return {
      /**
       * 批量更新指定 ids 的 disabled 状态值
       * 影响属性：菜单项中的 disabled 属性
       * @param ids  - 想要批量更新的 id 列表
       * @param isDisabled - 期望更新的值
       */
      setDisabledByIds(ids: string[], isDisabled: boolean) {
        if (ids && ids.length) {
          self.children.forEach((item: IMenuItemModel) => {
            if (!!~ids.indexOf(item.id)) {
              item.setDisabled(isDisabled);
            }
          });
        }
      },

      addMenuItems(items: IMenuItemModel | IMenuItemModel[]) {
        [].concat(items).forEach((item: IMenuItemModel) => {
          self.children.push(item);
        });
      }
    };
  });

export interface IMenuObject {
  id: string;
  name: string;
  children?: IMenuItemObject[];
}
export interface IMenuModel extends Instance<typeof MenuModel> {}

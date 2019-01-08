import {
  MenuItemModel,
  MenuModel,
  IMenuObject,
  IMenuItemObject,
  IMenuModel,
  IMenuItemModel
} from './index';
import { invariant } from '../../lib/util';

/**
 * 将普通对象转换成 menu Model
 * @param menu - 普通的 menu 对象
 */
export function createModel(menu: IMenuObject): IMenuModel {
  invariant(!!menu, 'menu 对象不能为空');
  invariant(!!menu.name, 'menu 对象缺少 `name` 属性');

  const menuModel = MenuModel.create({
    id: menu.id,
    name: menu.name,
    children: []
  });

  // 遍历添加 menu item
  [].concat(menu.children || []).forEach((item: IMenuItemObject) => {
    const { id, name, icon, type, disabled, shortcut } = item;
      menuModel.addMenuItems(MenuItemModel.create({ id, name, icon, type, disabled, shortcut}));
  });

//   menuModel.addMenuItems(items);

  return menuModel;
}


const MENU_EMPTY_NAME = 'EMPTY_EMNU';

/**
 * 创建新的空白
 */
export function createEmptyModel() {
    return createModel({id: MENU_EMPTY_NAME, name: MENU_EMPTY_NAME})
}
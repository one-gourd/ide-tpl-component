import { IContext as IEtteContext } from 'ette';
[SUBCOMP_START]
import { getSubRouterPrefix } from 'ide-lib-base-component';
[SUBCOMP_END]

import { IStoresModel [SUBCOMP_START], ESubApps[SUBCOMP_END] } from '../schema/stores';
export interface IContext extends IEtteContext{
  stores: IStoresModel;
  [propName: string]: any;
}

[SUBCOMP_START]
// 子组件路径前缀
export const RPATH = getSubRouterPrefix(ESubApps); // 获取路由路径
[SUBCOMP_END]

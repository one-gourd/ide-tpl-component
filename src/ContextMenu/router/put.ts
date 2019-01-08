import Router from 'ette-router';
import { IContext } from './helper';
export const router = new Router();
// 更新菜单项属性
(router as any).put('menu', '/menu', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { name, value } = request.data;

  //   stores.setSchema(createSchemaModel(schema));
  const isSuccess = stores.updateAttribute(name, value);
  ctx.response.body = {
    success: isSuccess
  };

  ctx.response.status = 200;
});

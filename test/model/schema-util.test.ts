import {
  createSchemaModel,
  createEmptyModel,
  getAllNodes
  // getAllIds
} from '../../src/ComponentTree/schema/util';
import { strMapToObj } from '../../src/lib/util';
describe('[SchemaUtil] createSchemaModel - 根据 json 创建 schema ', () => {
  test('单层级创建，自动创建 id', () => {
    const schema = createSchemaModel({
      name: 'root'
    });
    expect(schema.id).not.toBe('');
    expect(schema.name).toBe('root');
    expect(schema.attrs).toBe('{}');
    expect(schema.parentId).toBe('');
    expect(strMapToObj(schema.functions as any)).toEqual({});
    expect(schema.children).toEqual([]);
  });

  test('attrs 只保存非可计算信息', () => {
    const schema = createSchemaModel({
      id: 'son',
      name: 'root',
      props: { label: '文案' },
      functions: {},
      children: []
    });
    expect(schema.id).toBe('son');
    expect(schema.name).toBe('root');
    expect(schema.attrs).toBe('{"props":{"label":"文案"}}');
    expect(schema.parentId).toBe('');
    expect(strMapToObj(schema.functions as any)).toEqual({});
    expect(schema.children).toEqual([]);
  });

  test('多层级创建', () => {
    const schema = createSchemaModel({
      id: 'father',
      name: 'root',
      props: { label: '文案1' },
      functions: {},
      children: [
        {
          id: 'son',
          name: 'first',
          props: { label: '文案' },
          functions: {}
        }
      ]
    });
    expect(schema.id).toBe('father');
    expect(schema.name).toBe('root');
    expect(schema.attrs).toBe('{"props":{"label":"文案1"}}');
    expect(schema.parentId).toBe('');
    expect(strMapToObj(schema.functions as any)).toEqual({});

    const child = schema.children[0];
    expect(child.id).toBe('son');
    expect(child.name).toBe('first');
    expect(child.attrs).toBe('{"props":{"label":"文案"}}');
    expect(child.parentId).toBe('father');
    expect(strMapToObj(child.functions)).toEqual({});
    expect(child.children).toEqual([]);
  });
});

describe('[SchemaUtil] createSchemaModel - 边界情况测试', () => {
  test('入参不能为空', () => {
    expect(() => {
      const obj: any = null;
      createSchemaModel(obj);
    }).toThrowError('不能为空');
  });
  test('至少需要 name 属性', () => {
    expect(() => {
      const obj: any = {};
      createSchemaModel(obj);
    }).toThrowError('缺少 `name` 属性');
  });
});

describe('[SchemaUtil] getAllNodes - 获取 schema 中指定属性', () => {
  test('空模型返回 -1 节点的信息', () => {
    const schema = createEmptyModel();
    expect(getAllNodes(schema).map((o: any)=>o.toJSON())).toEqual([
      {
        attrs: '{}',
        children: [],
        functions: {},
        id: '-1',
        name: '[init comp]',
        parentId: '',
        screenId: '-1'
      }
    ]);
  });
  test('空模型返回 -1，指定 id 后将只返回 id 属性', () => {
    const schema = createEmptyModel();
    expect(getAllNodes(schema, 'id')).toEqual([{ id: '-1' }]);
  });
});

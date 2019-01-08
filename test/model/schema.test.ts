import { Schema, ISchemaModel } from '../../src/ComponentTree/schema/';
import { createSchemaModel } from '../../src/ComponentTree/schema/util';
import { strMapToObj } from '../../src/lib/util';
import Chance from 'chance';
const chance = new Chance();

const schemaData = {
  id: 'father',
  name: 'root',
  screenId: '$root_1',
  props: { label: '文案1' },
  functions: {
    __$father_onChange: function() {}
  },
  ids: ['father', 'son', 'grandson'],
  events: {
    onChange: '__$father_onChange'
  },
  children: [
    {
      id: 'son',
      name: 'first',
      screenId: '$first_1',
      props: { label: '文案2' },
      functions: {
        __$son_onClick: function() {}
      },
      ids: ['son', 'grandson'],
      events: {
        onChange: '__$son_onClick'
      },
      children: [
        {
          id: 'grandson',
          name: 'second',
          screenId: '$second_1',
          functions: {
            __$grandson_onClick: function() {}
          },
          ids: ['grandson'],
          props: { label: '文案3' },
          events: {
            onChange: '__$grandson_onClick'
          }
        }
      ]
    }
  ]
};
describe('[Schema] schema 模型  - 创建模型', () => {
  test('默认创建的对象', () => {
    const schema = Schema.create();
    expect(schema.id).toBe('');
    expect(schema.name).toBe('');
    expect(schema.attrs).toBe('{}');
    expect(schema.parentId).toBe('');
    expect(strMapToObj(schema.functions as any)).toEqual({});
    expect(schema.children).toEqual([]);
  });
});

describe('[Schema] 属性 - functionsMap 属性', () => {
  test('获取函数列表', () => {
    const schema = createSchemaModel(schemaData);

    expect(Array.from(schema.functionsMap.keys())).toEqual([
      '__$father_onChange',
      '__$son_onClick',
      '__$grandson_onClick'
    ]);
  });

  test('更改之后，再次获取新的属性', () => {
    const schema = createSchemaModel({
      id: 'father',
      screenId: '$root_1',
      name: 'root',
      props: { label: '文案1' },
      events: {
        onChange: '__$father_onChange'
      },
      children: [
        {
          id: 'son',
          name: 'first',
          screenId: '$first_1',
          props: { label: '文案2' },
          events: {
            onChange: '__$son_onClick'
          }
        }
      ]
    });

    // 更新 attrs
    schema.setAttrs({
      events: {
        onChange: '__$father2_onChange'
      }
    });

    expect(Array.from(schema.functionsMap.keys())).toEqual([
      '__$father2_onChange',
      '__$son_onClick'
    ]);
  });
});

describe('[Schema] 属性 - schemaJSON 属性', () => {
  test(' schema 属性中不存在 functions 和 ids 等属性', () => {
    const schema = createSchemaModel(schemaData);

    expect(schema.schemaJSON).toEqual({
      id: 'father',
      name: 'root',
      screenId: '$root_1',
      props: { label: '文案1' },
      events: {
        onChange: '__$father_onChange'
      },
      children: [
        {
          id: 'son',
          name: 'first',
          screenId: '$first_1',
          props: { label: '文案2' },
          events: {
            onChange: '__$son_onClick'
          },
          children: [
            {
              id: 'grandson',
              name: 'second',
              screenId: '$second_1',
              props: { label: '文案3' },
              events: {
                onChange: '__$grandson_onClick'
              },
              children: []
            }
          ]
        }
      ]
    });
  });
});

describe('[Schema] 属性 - functionDefinitions 属性', () => {
  test('设置 function 属性', () => {
    const schema = createSchemaModel({
      id: 'father',
      name: 'root',
      screenId: '$root_1',
      props: { label: '文案1' },
      events: {
        onChange: '__$father_onChange'
      }
    });

    expect(schema.functionDefinitions).toBe('');

    schema.setFunction(
      '__$father_onChange',
      `function handle(ev){$store.$Iterator_list.fetch({page:1});}`
    );

    expect(schema.functionDefinitions).toBe(
      `window['__$father_onChange'] = function handle(ev){$store.$Iterator_list.fetch({page:1});}\n`
    );
  });
});

describe('[Schema] 方法 - findNode 方法', () => {
  const schema = createSchemaModel(schemaData);
  const node = schema.findNode('grandson') as ISchemaModel;

  expect(node.schemaJSON).toEqual({
    id: 'grandson',
    name: 'second',
    screenId: '$second_1',
    props: { label: '文案3' },
    events: {
      onChange: '__$grandson_onClick'
    },
    children: []
  });
});

describe('[Schema] 方法 - removeChildren 方法', () => {
  let schema: ISchemaModel;

  beforeEach(() => {
    schema = createSchemaModel({
      id: 'father',
      name: 'root',
      children: [
        {
          id: 'son1',
          name: 'first'
        },
        {
          id: 'son2',
          name: 'second'
        },
        {
          id: 'son3',
          name: 'third'
        }
      ]
    });
  });

  test('删除不存在的节点', () => {
    expect(schema.childrenIds).toEqual(['son1', 'son2', 'son3']);
    schema.removeChildren('son4');
    expect(schema.childrenIds).toEqual(['son1', 'son2', 'son3']);
  });

  test('删除 1 个节点', () => {
    const arr = ['son1', 'son2', 'son3'];
    expect(schema.childrenIds).toEqual(arr);

    const num = chance.pickone([1, 2, 3]);
    schema.removeChildren(`son${num}`);
    arr.splice(num - 1, 1);
    expect(schema.childrenIds).toEqual(arr);
  });

  test('删除 2 个节点', () => {
    const arr = ['son1', 'son2', 'son3'];
    expect(schema.childrenIds).toEqual(arr);

    const subSet = chance.pickset(arr, 2);

    let leftSet = '';
    arr.forEach(name => {
      if (!~subSet.indexOf(name)) {
        leftSet = name;
      }
    });

    schema.removeChildren(subSet);
    expect(schema.childrenIds).toEqual([leftSet]);
  });

  test('删除所有节点', () => {
    expect(schema.childrenIds).toEqual(['son1', 'son2', 'son3']);
    schema.removeChildren(['son2', 'son1', 'son3']);
    expect(schema.childrenIds).toEqual([]);
  });
});

import { types, Instance } from 'mobx-state-tree';

import { pick } from '../../lib/util';
import { debugModel } from '../../lib/debug';
import { updateModelAttribute } from './util';

// export enum ECodeLanguage {
//   JSON = 'json',
//   JS = 'javascript',
//   TS = 'typescript'
// }
// export const CODE_LANGUAGES = Object.values(ECodeLanguage);

/**
 * [CLASSNAME] 对应的模型
 */
export const [CLASSNAME]Model = types
  .model('[CLASSNAME]Model', {
    visible: types.optional(types.boolean, true),
    text: types.optional(types.string, ''),
    // language: types.optional(
    //   types.enumeration('Type', CODE_LANGUAGES),
    //   ECodeLanguage.JS
    // ),
    // children: types.array(types.late((): IAnyModelType => SchemaModel)) // 在 mst v3 中， `types.array` 默认值就是 `[]`
    // options: types.map(types.union(types.boolean, types.string))
    // 在 mst v3 中， `types.map` 默认值就是 `{}`
    //  ide 的 Options 可选值参考： https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
  })
  .views(self => {
    return {
      /**
       * 只返回当前模型的属性，可以通过 filter 字符串进行属性项过滤
       */
      allAttibuteWithFilter(filterArray?: string | string[]) {
        if (!filterArray) return self;
        const filters = [].concat(filterArray || []);
        return pick(self, filters);
      }
    };
  })
  .actions(self => {
    return {
      setText(text: string) {
        self.text = text;
      },
      setVisible(v: boolean | string) {
        self.visible = v === true || v === 'true'
      }
    };
  })
  .actions(self => {
    return {
      updateAttribute(name: string, value: any) {
        updateModelAttribute(self as I[CLASSNAME]Model, name, value);
      }
    };
  });

export interface I[CLASSNAME]Model extends Instance<typeof [CLASSNAME]Model> { }

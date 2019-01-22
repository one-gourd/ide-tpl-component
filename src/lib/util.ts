
export function invariant(check: boolean, message: string, thing?: string) {
  if (!check) {
    throw new Error(
      '[[DEBUGNAME]] Invariant failed: ' +
        message +
        (thing ? " in '" + thing + "'" : '')
    );
  }
}

export function isExist(val: any): boolean {
  return typeof val !== 'undefined' && val !== null;
}

// from mobx
export function uniq(arr: any[]) {
  var res: any[] = [];
  arr.forEach(function(item) {
    if (res.indexOf(item) === -1) res.push(item);
  });
  return res;
}

/**
 * convert string map to object
 *
 * @export
 * @param {Map<string, any>} strMap
 * @returns
 */
export function strMapToObj(strMap: Map<string, any>) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    // We don’t escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}


export function pick(object: any, paths: string[]) {
  const obj: any = {};
  for (const path of paths) {
    if (object[path]) {
      obj[path] = object[path]
    }
  }
  return obj;
} 

export function capitalize(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

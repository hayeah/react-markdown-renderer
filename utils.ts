// let {kebabCase} = require("lodash");
import {kebabCase} from "lodash";

export function makeEnsureUnique() {
  let ids: { [key: string]: boolean } = {};
  return function ensureUnique(str: string): string {
    let id = kebabCase(str);
    let i = 1;
    while (true) {
      let tryId = id;
      if (i != 1) {
        tryId = `${tryId}_${i}`
      }

      if (ids[tryId] == null) {
        id = tryId;
        ids[id] = true;
        break;
      }

      i++;
    }

    return id;
  };
}

export function pp<T>(obj: T): T {
  console.log(JSON.stringify(obj, undefined, 2));
  return obj;
}

export function hashCode(str: string): number {
  if (str == null || str.charCodeAt == null) {
    return 0;
  }
  var hash = 0, i, chr, len;
  if (str.length == 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
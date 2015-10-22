// let {kebabCase} = require("lodash");
import {kebabCase} from "lodash";

export function makeEnsureUnique() {
  let ids: {[key: string]: boolean} = {};
  return function ensureUnique(str: string): string {
    let id = kebabCase(str);
    let i = 1;
    while(true) {
      let tryId = id;
      if(i != 1) {
        tryId = `${tryId}_${i}`
      }

      if(ids[tryId] == true) {
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
  console.log(JSON.stringify(obj,undefined,2));
  return obj;
}

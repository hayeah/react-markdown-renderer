let {kebabCase} = require("lodash");

function makeEnsureUnique() {
  let ids = {};
  return function ensureUnique(str) {
    let id = kebabCase(str);
    let i = 1;
    while(true) {
      let tryId = id;
      if(i != 1) {
        tryId = `${tryId}_${i}`
      }

      if(ids[tryId] == null) {
        id = tryId;
        ids[id] = id;
        break;
      }

      i++;
    }

    return id;
  };
}

function pp(obj) {
  console.log(JSON.stringify(obj,{},2));
  return obj;
}

module.exports = {
  makeEnsureUnique,
  pp,
};

/*
  [{heading, content: [token,...]},...]

  Group content under a heading together. Assign a unique permalink id to each section.
*/

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

      if(permalinks[tryId] == null) {
        id = tryId;
        ids[id] = id;
        break;
      }

      i++;
    }

    return id;
  };
}

module.exports = function sectionize(tokens) {
  let sections = [];

  let permalinks = {};
  function ensureUniquePermalink(title) {
    if(title == null) {
      return undefined;
    }

    let id = kebabCase(title);
    let i = 1;
    while(true) {
      let tryId = id;
      if(i != 1) {
        tryId = `${tryId}_${i}`
      }

      if(permalinks[tryId] == null) {
        id = tryId;
        permalinks[id] = id;
        break;
      }

      i++;
    }

    return id;
  }

  // dup
  tokens = tokens.reverse();

  let content = [];
  let heading;



  function createSection() {
    if(heading == null && content.length == 0) {
      // do nothing
    } else {
      // create a new seciton
      let key = heading && ensureUniquePermalink(heading.text);
      sections.push({heading,content,key});
    }


  }

  while(tokens.length > 0) {

    let token = tokens.pop();

    if(token.type === "heading") {
      // push the current section
      createSection();

      content = [];
      heading = token;
    } else {
      content.push(token)
    }
  }

  createSection();

  return sections;
}

/*
  [{heading, content: [token,...]},...]

  Group content under a heading together. Assign a unique permalink id to each section.
*/

let {makeEnsureUnique} = require("./utils");

module.exports = function parse(tokens) {
  let sections = [];

  let ensureUnique = makeEnsureUnique();
  // dup
  tokens = tokens.reverse();

  let content = [];
  let heading;

  function createSection() {
    if(heading == null && content.length == 0) {
      // do nothing
    } else {
      // create a new seciton
      let key = heading && ensureUnique(heading.text);
      sections.push({heading,content,key});
    }
  }

  function parseListItem() {
    let body = [];
    while(tokens.length > 0) {
      let token = tokens.pop();
      let {type} = token;
      if(type === "list_item_end") {
        break;
      }
      body.push(token);
    }

    return {type: "list-item", body: body};
  }


  function parseList(ordered) {
    // {
    //   "type": "list_start",
    //   "ordered": false
    // }

    let items = [];
    while(tokens.length > 0) {
      let token = tokens.pop();
      let {type} = token;
      if(type === "list_end") {
        break;
      } else if(type === "list_item_start" || type === "loose_item_start") {
        items.push(parseListItem());
      }
    }

    return {type: "list", ordered, items};


  }

  while(tokens.length > 0) {

    let token = tokens.pop();

    if(token.type === "heading") {
      // push the current section
      createSection();

      content = [];
      heading = token;
    } else if(token.type === "list_start") {
      content.push(parseList(token.ordered))
    } else {
      content.push(token)
    }
  }

  createSection();

  return sections;
}
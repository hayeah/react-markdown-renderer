
/*
  [{heading, content: [token,...]},...]

  Group content under a heading together. Assign a unique permalink id to each section.
*/

let {makeEnsureUnique} = require("./utils");

module.exports = function sectionize(tokens) {
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
let tokenize = require("./tokenize");
let sectionize = require("./sectionize");

module.exports = function compile(md,lang) {
  let tokens = tokenize(md,lang);
  return sectionize(tokens);
}
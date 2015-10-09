let {lexer} = require("marked");

const startTag = '<cn>';
const endTag = '</cn>';

module.exports = function tokenize(md,lang) {
  let tokens = lexer(md);

  if(lang == "cn") {
    tokens = selectcn(tokens);
  } else {
    tokens = tokens.filter(token => {
      return !isCNBlock(token)
    });
  }

  return tokens;
}

function isCNBlock(token) {
  let {type,text} = token;
  if(type != "html") {
    return false;
  }

  if(text.substr(0,startTag.length) == startTag) {
    return true;
    // parts.push(text.substr(4));
  }

  return false;
}

function extractCnContent(token) {
  let {text} = token;
  let end = text.indexOf(endTag);
  if(end == -1) {
    end = undefined;
  }
  return text.substring(startTag.length,end);
}

function selectcn(tokens) {
  let parts = [];

  tokens.forEach((token) => {
    if(isCNBlock(token)) {
      parts.push(extractCnContent(token));
    }
  });

  let md = parts.join("");

  return lexer(md);
}

// console.log("raw",lexer(src));
// console.log("cn-raw",lexer(src).filter(isCNBlock));
// console.log("cn",tokenize(src,"cn"));
// console.log("default",tokenize(src));



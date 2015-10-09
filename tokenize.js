let {lexer} = require("marked");

const startTag = '<cn>';
const endTag = '</cn>';

module.exports = function tokenize(md) {
  let tokens = lexer(md);

  let allTokens = [];
  tokens.forEach(token => {
    if(isCNBlock(token)) {
      let cnTokens = tokenize(extractCnContent(token));
      allTokens.push({
        type: "I18n",
        lang: "zh-cn",
        body: cnTokens,
      });
    } else {
      allTokens.push(token);
    }
  });

  return allTokens;
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

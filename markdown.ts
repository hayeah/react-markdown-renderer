// let sectionize = require("./sectionize");

let {lexer} = require("marked");
let {makeEnsureUnique} = require("./utils");

import * as ast from "./ast";
import {Node, Token} from "./ast";
const {NodeTypes, TokenTypes} = ast;

const startTag = '<cn>';
const endTag = '</cn>';

export function compile(src: string): ast.Document {
  let tokens = tokenize(src);
  let sections = parse(tokens);
  return { sections };
}

export function tokenize(md: string): ast.Token[] {
  return lexer(md);
  
  // let tokens = lexer(md);

  // let allTokens = [];
  // tokens.forEach(token => {
  //   if(isCNBlock(token)) {
  //     let cnTokens = tokenize(extractCnContent(token));
  //     allTokens.push({
  //       type: "I18n",
  //       lang: "zh-cn",
  //       body: cnTokens,
  //     });
  //   } else {
  //     allTokens.push(token);
  //   }
  // });

  // return allTokens;
}

export function parse(tokens: ast.Token[]): ast.Section[] {
  let sections: ast.Section[] = [];

  let ensureUnique = makeEnsureUnique();
  // dup
  tokens = tokens.reverse();

  let content: ast.Node[] = [];
  let heading: ast.HeadingToken;

  function createSection() {
    if (heading == null && content.length == 0) {
      // do nothing
    } else {
      // create a new seciton
      let key = heading && ensureUnique(heading.text);

      let headerNode: ast.Heading = {
        type: NodeTypes.heading,
        depth: heading.depth,
        text: heading.text,
        key,
      };

      sections.push({
        type: NodeTypes.section,
        heading: headerNode,
        content,
        key
      });
    }
  }

  function parseListItem(): ast.ListItem {
    let body: Node[] = [];
    while (tokens.length > 0) {
      let token = tokens.pop();
      let {type} = token;
      if (type === TokenTypes.list_item_end) {
        break;
      }
      body.push(token);
    }

    return { type: NodeTypes.list_item, body: body };
  }


  function parseList({ordered}: ast.ListStartToken): ast.List {
    // {
    //   "type": "list_start",
    //   "ordered": false
    // }

    let items = [];
    while (tokens.length > 0) {
      let token = tokens.pop();
      let {type} = token;
      if (type === TokenTypes.list_end) {
        break;
      } else if (ast.isListItemStartToken(token)) {
        items.push(parseListItem());
      }
    }

    return { type: NodeTypes.list, ordered, items };


  }

  while (tokens.length > 0) {

    let token = tokens.pop();

    if (token.type === TokenTypes.heading) {
      // push the current section
      createSection();

      content = [];
      heading = <ast.HeadingToken>token;
    } else if (ast.isListStartToken(token)) {
      content.push(parseList(token));
    } else {
      content.push(token)
    }
  }

  createSection();

  return sections;
}

// function isCNBlock(token) {
//   let {type,text} = token;
//   if(type != "html") {
//     return false;
//   }

//   if(text.substr(0,startTag.length) == startTag) {
//     return true;
//     // parts.push(text.substr(4));
//   }

//   return false;
// }

// function extractCnContent(token) {
//   let {text} = token;
//   let end = text.indexOf(endTag);
//   if(end == -1) {
//     end = undefined;
//   }
//   return text.substring(startTag.length,end);
// }


// export function compile(md,lang) {
//   let tokens = tokenize(md,lang);
//   return sectionize(tokens);
// }
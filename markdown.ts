// let sectionize = require("./sectionize");

let {lexer} = require("marked");
let {makeEnsureUnique} = require("./utils");
 

const startTag = '<cn>';
const endTag = '</cn>';

const TokenTypes = {
  heading: "heading",
  list_start: "list_start",
  list_end: "list_end",
  
  list_item_start: "list_item_start",
  loose_item_start: "loose_item_start",
  list_item_end: "list_item_end",
};

interface Token {
  type: string,
}

interface HeadingToken extends Token {
  depth: number,
  text: string,
}

interface ListStartToken extends Token {
  ordered: boolean,
}

function isListStartToken(token: Token): token is ListStartToken {
  return token.type == TokenTypes.list_start;
}

interface ListItemStartToken extends Token {}

function isListItemStartToken(token: Token): token is ListItemStartToken {
  return token.type == TokenTypes.list_item_start || token.type == TokenTypes.loose_item_start;
}


interface Node {
  type: string,
}

const NodeTypes = {
  section: "section",
  list: "list",
  list_item: "list-item",
}

interface List extends Node {
  ordered: boolean,
  items: Node[],
}

interface ListItem extends Node {
  body: Node[],
}

function isListItem(o: Node): o is ListItem {
  return o.type == NodeTypes.list_item;
}

function isList(o: Node): o is List {
  return o.type == NodeTypes.list;
}

interface Section extends Node {
  heading?: HeadingToken,
  content: Node[],
  key: string,
}

export function tokenize(md: string): Token[] {
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

export function parse(tokens: Token[]): Section[] {
  let sections: Section[] = [];

  let ensureUnique = makeEnsureUnique();
  // dup
  tokens = tokens.reverse();

  let content: Node[] = [];
  let heading: HeadingToken;

  function createSection() {
    if(heading == null && content.length == 0) {
      // do nothing
    } else {
      // create a new seciton
      let key = heading && ensureUnique(heading.text);
      
      sections.push({
        type: NodeTypes.section,
        heading,content,key
      });
    }
  }

  function parseListItem(): ListItem {
    let body: Node[] = [];
    while(tokens.length > 0) {
      let token = tokens.pop();
      let {type} = token;
      if(type === TokenTypes.list_item_end) {
        break;
      }
      body.push(token);
    }

    return {type: NodeTypes.list_item, body: body};
  }


  function parseList({ordered}:ListStartToken): List {
    // {
    //   "type": "list_start",
    //   "ordered": false
    // }

    let items = [];
    while(tokens.length > 0) {
      let token = tokens.pop();
      let {type} = token;
      if(type === TokenTypes.list_end) {
        break;
      } else if(isListItemStartToken(token)) {
        items.push(parseListItem());
      }
    }

    return {type: NodeTypes.list, ordered, items};


  }

  while(tokens.length > 0) {

    let token = tokens.pop();

    if(token.type === TokenTypes.heading) {
      // push the current section
      createSection();

      content = [];
      heading = <HeadingToken> token;
    } else if(isListStartToken(token)) {
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
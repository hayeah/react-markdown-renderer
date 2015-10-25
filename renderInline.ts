import * as React from "react";

let marked = require("marked");
let babel = require("babel-core/browser");

let options = Object.assign(marked.defaults,{xhtml: true});
let inlineLexer = new marked.InlineLexer([],options);

function outputInlineHTML(md: string): string {
  return inlineLexer.output(md);
}

export default function renderInline(md: string): React.ReactElement<any> {
  // let inlineHTML = InlineLexer.output(md,[]);
  let inlineHTML = outputInlineHTML(md);

  let jsx = `let dom = <span>${inlineHTML}</span>`;

  // console.log("jsx",jsx);

  let code: string = babel.transform(jsx).code;

  // console.log("code",jsx);

  let render = new Function("React",`${code}; return dom;`);
//
  let dom = render(React);

  return dom;
}

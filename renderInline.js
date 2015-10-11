let marked = require("marked");
let babel = require("babel-core/browser");
let React = require("react");

let options = {
  ...marked.defaults,
  xhtml: true,
};

let inlineLexer = new marked.InlineLexer([],options);

module.exports = function renderInline(md) {
  // let inlineHTML = InlineLexer.output(md,[]);
  let inlineHTML = inlineLexer.output(md);

  let jsx = `let dom = <span>${inlineHTML}</span>`;

  // console.log("jsx",jsx);

  let code = babel.transform(jsx).code;

  // console.log("code",jsx);

  let render = new Function("React",`${code}; return dom;`);
//
  let dom = render(React);

  return dom;
}

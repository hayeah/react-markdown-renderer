let {InlineLexer} = require("marked");
let babel = require("babel");
let React = require("react");

let inlineLexer = new InlineLexer([]);

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

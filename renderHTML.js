let babel = require("babel-core/browser");
let React = require("react");

module.exports = function renderHTML(html,widgets={}) {
  let jsx = `let dom = ${html}`;

  // console.log("jsx",jsx);

  let code = babel.transform(jsx).code;

  // console.log("code",jsx);

  let widgetNames = Object.keys(widgets);
  let body = `${code}; return dom;`;
  let args = ["React",...widgetNames];
  let widgetValues = widgetNames.map(name => widgets[name]);

  // console.log("args",widgets);
  // console.log("args",args);
  // console.log("values",widgetValues);

  let render = new Function(...args,body);

  let dom = render(React,...widgetValues);

  return dom;
}

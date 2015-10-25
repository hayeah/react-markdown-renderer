let babel = require("babel-core/browser");

import * as React from "react";

function renderHTML(html:string,widgets={}): React.HTMLElement {
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

export default renderHTML;
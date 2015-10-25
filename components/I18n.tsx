import * as React from "react";
import * as ast from "../ast";
import {renderNodes} from "../render";

let I18n = (node: ast.i18n) => {
	let {sections,lang} = node;

  return (
    <div className="i18n">
      <h3>{lang}</h3>
      {renderNodes(sections)}
    </div>
  );
};

export default I18n;

// export function i18n(sections: ast.Section[]) {

// }
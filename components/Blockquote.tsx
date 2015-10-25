import * as React from "react";
import * as ast from "../ast";
import {renderNodes} from "../render";

let BlockQuote = (node: ast.BlockQuote) => {
	let {content} = node;

  return (
    <blockquote>
      {renderNodes(content)}
    </blockquote>
  );
};

export default BlockQuote;
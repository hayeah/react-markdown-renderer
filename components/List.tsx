import * as React from "react";
import * as ast from "../ast";
import {renderNodes} from "../render";

export let ListItem = (node:ast.ListItem) => {
	let {body} = node;
  return <li>{renderNodes(body)}</li>;
};

export let List = (node: ast.List) => {
	let {items, ordered} = node;
  let tag = ordered ? "ol" : "ul";
  let renderedItems = renderNodes(items);
  return React.createElement(tag, null, renderedItems);
};

// export default List;
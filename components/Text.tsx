import * as React from "react";
import * as ast from "../ast";
import renderInline from "../renderInline";

let Text = ({text}:ast.TextNode) => {
  return <p>{renderInline(text)}</p>;
};

export default Text;
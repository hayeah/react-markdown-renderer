import * as React from "react";

import * as ast from "../ast";
import renderInline from "../renderInline";


let Paragraph = (node: ast.Paragraph) => {
	return <p>{renderInline(node.text)}</p>
};

export default Paragraph;
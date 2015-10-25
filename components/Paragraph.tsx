import * as ast from "../ast";
import * as React from "react";

let Paragraph = (node: ast.Paragraph) => {
	return <p>{node.text}</p>
};

export default Paragraph;
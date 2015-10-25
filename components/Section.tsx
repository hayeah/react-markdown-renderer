import * as React from "react";
import Heading from "./Heading";
import * as ast from "../ast";
import {renderNode,renderNodes} from "../render";


export default (props: ast.Section) => {
	let {content,heading} = props;

	return (
		<section>
			{renderNode(heading)}

			{renderNodes(content)}
		</section>
	);
};

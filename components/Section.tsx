import * as React from "react";
import {Section} from "../ast";
import {renderNode,renderNodes} from "../render2";

export default (props: Section) => {
	let {content} = props;

	return (
		<section>
			{props.heading.text}

			{renderNodes(content)}
		</section>
	);
};

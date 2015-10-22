import * as React from "react";
import {Section} from "../ast";

export default (props: Section) => {
	let {id} = props;
	return (
		<section key={id}>
			{props.heading.text}
		</section>
	);
};

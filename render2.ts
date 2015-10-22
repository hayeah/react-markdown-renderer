import * as React from "react";
import * as ast from "./ast";
import {compile} from "./markdown";

// const {NodeTypes} = ast;

type Element = React.ReactElement<any>;

import Heading from "./components/Heading";
import Document from "./components/Document";
import Section from "./components/Section";

type Component = (props: any) => Element;

// interface Components {
// 	heading: Component,
// }

let components = {
	document: Document,
	heading: Heading,
	section: Section,
};

components.heading

// class Renderer {
// 	// section(section: ast.Section): React.ReactElement<any>;
// 	document(doc: ast.Document) {
// 	}
// }

export default function render(node: ast.Node): Element {
	let component = components[node.type];

	if (component == null) {
		throw `unrecognized node type: ${node.type}`
	}

	return React.createElement(component, node);
}

/* 
hmmm.

<Component {...props}>
*/
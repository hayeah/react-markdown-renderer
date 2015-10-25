import * as React from "react";
import * as ast from "./ast";
import {compile} from "./markdown";

import {makeEnsureUnique,hashCode} from "./utils"

type Element = React.ReactElement<any>;

import Heading from "./components/Heading";
import Document from "./components/Document";
import Section from "./components/Section";
import Paragraph from "./components/Paragraph";

type Component = (props: any) => Element;

// interface Components {
// 	heading: Component,
// }

let components = {
	document: Document,
	heading: Heading,
	section: Section,
	paragraph: Paragraph,
};

export function renderNodes(nodes: ast.Node[]): Element[] {
	return nodes.map(node => {
		let unique = makeEnsureUnique()
		let key: string;
		if(ast.isTextNode(node)) {
			key = unique(hashCode(node.text).toString());
		}
		return renderNode(node,key);
	});
}

export function renderNode(node: ast.Node, key? : string): Element {
	let component = components[node.type];

	if (component == null) {
		throw `unrecognized node type: ${node.type}`
	}

	let props: any = node;
	if(key != null) {
		props = Object.assign(props,{key: key});
	}

	return React.createElement(component, props);
}

export default renderNode;
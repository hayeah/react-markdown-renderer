import * as React from "react";
import * as ast from "./ast";
import {compile} from "./markdown";

import {makeEnsureUnique,hashCode} from "./utils"

type Element = React.ReactElement<any>;

import Heading from "./components/Heading";
import Document from "./components/Document";
import Section from "./components/Section";
import Paragraph from "./components/Paragraph";
import Code from "./components/Code";
import I18n from "./components/I18n";
import {List,ListItem} from "./components/List";
import Text from "./components/Text";
import BlockQuote from "./components/BlockQuote";
import HTML from "./components/HTML";

type Component = (props: any) => Element;

// interface Components {
// 	heading: Component,
// }

let Space = () => {
	return React.createElement("span");
}



let components = {
	document: Document,
	heading: Heading,
	section: Section,
	paragraph: Paragraph,
	code: Code,
	i18n: I18n,
	list: List,
	"list-item": ListItem,
	text: Text,
	space: Space,
	blockquote: BlockQuote,
	html: HTML,
};

export function renderNodes(nodes: ast.Node[]): Element[] {
	let i = 0;
	return nodes.map(node => {
		let unique = makeEnsureUnique()
		let key: string;
		if(ast.isTextNode(node)) {
			key = unique(hashCode(node.text).toString());
		} else if(ast.isIdNode(node)) {
			key = unique(node.id);
		} else {
			i++;
			key = unique(i.toString());
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
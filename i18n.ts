import * as ast from "./ast";
import {compile} from "./markdown";
import {hashCode} from "./utils"

const startCN = "<cn>";
const endCN = "</cn>";

interface CNNode extends ast.HTML {

}

function isCNNode(node: any): node is CNNode {
	return node.type === "html" && node.text.indexOf(startCN) == 0;
}

function stripCNText(node: CNNode): string {
	let text = node.text;
	let end = text.indexOf(endCN);
	return text.substring(startCN.length,end);
}

function convertToI18n(node: CNNode): ast.i18n {
	let md = stripCNText(node);
	let sections = compile(md);
	let i18nNode: ast.i18n = {
		type: ast.NodeTypes.i18n,
		id: hashCode(md).toString(),
		lang: "zh-cn",
		sections: sections,
	};
	return i18nNode;
}


export function i18nTransform(sections: ast.Section[]) {
	return sections.map(section => {
		let nodes = section.content

		let newNodes = nodes.map(node => {
			if(isCNNode(node)) {
				return convertToI18n(node);
			} else {
				return node;
			}
		});

		return Object.assign(section,{content: newNodes});
	});
}
import * as ast from "../ast";
import renderHTML from "../renderHTML";

let HTML = (node: ast.HTML) => {
	let html = node.text;
	return renderHTML(html);
}

export default HTML;
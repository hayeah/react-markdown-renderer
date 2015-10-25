// Abstract Sytnax Tree for Markdown Document

export const TokenTypes = {
  heading: "heading",
  list_start: "list_start",
  list_end: "list_end",
  
  list_item_start: "list_item_start",
  loose_item_start: "loose_item_start",
  list_item_end: "list_item_end",
};

export interface Token {
  type: string,
}

export interface HeadingToken extends Token {
  depth: number,
  text: string,
}

export interface ListStartToken extends Token {
  ordered: boolean,
}

export function isListStartToken(token: Token): token is ListStartToken {
  return token.type == TokenTypes.list_start;
}

export interface ListItemStartToken extends Token {}

export function isListItemStartToken(token: Token): token is ListItemStartToken {
  return token.type == TokenTypes.list_item_start || token.type == TokenTypes.loose_item_start;
}

export interface Node {
  type: string,
}

export const NodeTypes = {
  document: "document",
  heading: "heading",
  section: "section",
  list: "list",
  list_item: "list-item",
  paragraph: "paragraph",
  code: "code",
  html: "html",
}

export interface TextNode extends Node {
  text: string,
}

export function isTextNode(o: any): o is TextNode {
  return o.text != null;
}

export type Paragraph = TextNode;

export interface Heading extends TextNode {
  // a unique ID for the whole markdown document
  id: string,
  depth: number,
}

export interface Code extends TextNode {
  lang: string,
}

export interface HTML extends TextNode {
  pre: boolean,
}

export interface List extends Node {
  ordered: boolean,
  items: Node[],
}

export interface ListItem extends Node {
  body: Node[],
}

export function isListItem(o: Node): o is ListItem {
  return o.type == NodeTypes.list_item;
}

export function isList(o: Node): o is List {
  return o.type == NodeTypes.list;
}

export interface Section extends Node {
  heading?: Heading,
  content: Node[],
  key: string,
}

export interface Document extends Node {
  sections: Section[];
}